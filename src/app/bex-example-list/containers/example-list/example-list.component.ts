import { Component, OnInit, ViewChildren, QueryList, ViewChild, ElementRef,
         ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { DateFilterRange, SortOrder } from 'src/app/+state/app.enum';
import { NumberOfVisiblePaginators, DefaultTablePageSize, MaxCalendarRangePeriod,
         MomentShortDateFormat, TablePageSizeOptions } from 'src/app/+state/app.const';
import { MDBModalService, MDBModalRef, MdbTableDirective } from 'ng-uikit-pro-standard';
import { ModalCalendarComponent } from 'src/app/shared/containers/modal-calendar/modal-calendar.component';
import { ShowHideColumnsComponent } from '../show-hide-columns/show-hide-columns.component';
import { MessageFilter } from '../../models/message-filter.model';
import { MessageList } from '../../models/message-list.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/+state/reducers';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import * as MessageActions from '../../+state/actions/message.actions';
import * as messageSelectors from '../../+state/selectors/message.selectors';
import * as RouterActions from '../../../+state/actions/router.actions';
import { DataListView } from 'src/app/shared/models/data-list-view.model';
import { DataListColumn } from 'src/app/shared/models/data-list-column.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-example-list',
  templateUrl: './example-list.component.html',
  styleUrls: ['./example-list.component.scss']
})
export class ExampleListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChildren('pages') pages: QueryList<any>;
  @ViewChild('rangePopover') public rangePopover;
  @ViewChild('textSearch') textSearchInput: ElementRef;

  destroyed$ = new Subject<boolean>();
  messageFilter: MessageFilter;
  messageList: MessageList;

  paginators: Array<any> = [];

  firstVisibleIndex: number;
  lastVisibleIndex: number;
  firstVisiblePaginator: number;
  lastVisiblePaginator: number;

  tablePageSizeOptions: any;

  filterStatusLabel: string;
  dateRangeStatusLabel: string;
  showClearSearch: boolean;
  listFiltersVisible: boolean;
  listLoading: boolean;
  activeView: DataListView;
  sortOrder = SortOrder;
  views: DataListView[];
  selectedDateRange = {
    startDate: null,
    endDate: null
  };

  backToListLink = '';
  selectedMessages: any;
  ids: any[];
  firstNames: any[];
  lastNames: any[];
  messages: any[];

  constructor(
    private store$: Store<AppState>,
    private cdRef: ChangeDetectorRef,
    private modalService: MDBModalService,
    private uiLoaderService: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.uiLoaderService.stopAll();
    this.listLoading = false;
    this.showClearSearch = false;
    this.activeView = {
      columns: []
    };

    this.views = [];

    this.messageFilter = {
      pageNumber: 1,
      pageSize: DefaultTablePageSize,
      keyword: '',
      createdDateStartRange: new Date(),
      createdDateEndRange: new Date(),
      ids: [],
      firstNames: [],
      LastNames: [],
      messages: []
    };
    this.messageList = {
      messages: [],
      pageNumber: 1,
      pageSize: DefaultTablePageSize,
      totalRecords: 0,
      totalPages: 0
    };


    this.tablePageSizeOptions = TablePageSizeOptions;
    this.firstVisibleIndex = 1;
    this.lastVisibleIndex = this.messageList.pageSize;
    this.firstVisiblePaginator = 0;
    this.lastVisiblePaginator = NumberOfVisiblePaginators;
    this.addPaginators();
    this.filterStatusLabel = 'ALL';
    this.dateRangeStatusLabel = '';
    this.dateRangeStatusLabel =
          moment(this.messageFilter.createdDateStartRange).format(MomentShortDateFormat)
          + ' - '
          +  moment(this.messageFilter.createdDateEndRange).format(MomentShortDateFormat);
    this.listFiltersVisible = false;

    this.selectedMessages = [];

    this.ids = [1, 2, 3, 4, 5];
    this.firstNames = ['user 1', 'user 2', 'user 3'];
    this.lastNames = ['name 1', 'name 2', 'name 3'];
    this.messages = ['message 1', 'message 2', 'message 3'];
    this.store$.dispatch(MessageActions.FetchViews());
    this.subscribeToViews();
    this.subscribeToDefaultView();
    this.subscribeToMessageFilter();
    this.subscribeToMessageList();
    this.subscribeToMessageListLoading();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  /**
   * Subscribe to message filter changes
   */
  private subscribeToMessageFilter() {
    this.store$.pipe(
        takeUntil(this.destroyed$),
        select(messageSelectors.selectMessageFilter),
        filter(messageFilter => typeof messageFilter !== 'undefined' && messageFilter != null))
        .subscribe(messageFilter => {
          this.messageFilter = {...messageFilter};
          this.store$.dispatch(MessageActions.FetchMessages({messageFilter}));
        });
  }

  /**
   * Subscribe to message service to retrieve message list
   */
  private subscribeToMessageList() {
    this.store$.pipe(
        takeUntil(this.destroyed$),
        select(messageSelectors.selectMessageList),
        filter(messageList => typeof messageList !== 'undefined' && messageList != null))
        .subscribe(messageList => {
          this.messageList = messageList;
          this.mdbTable.setDataSource(this.messageList.messages);
          this.mdbTableCalculateVisibleIndexes();
          this.addPaginators();
        });
  }

  /**
   * Subscribe to message list loading
   */
  private subscribeToMessageListLoading() {
    this.store$.pipe(
        takeUntil(this.destroyed$),
        select(messageSelectors.selectMessageListLoading),
        filter(loading => typeof loading !== 'undefined' && loading !== null && this.listLoading !== loading))
        .subscribe(loading => {
          this.listLoading = loading;
          if (loading) {
            this.uiLoaderService.startLoader('list-table');
          } else {
            this.uiLoaderService.stopLoader('list-table');
          }
        });
  }

  /**
   * Subscribe to views
   */
  private subscribeToViews() {
    this.store$.pipe(
        takeUntil(this.destroyed$),
        select(messageSelectors.selectViews),
        filter(views => typeof views !== 'undefined' && views != null))
        .subscribe(views => {
          this.views = views;
        });
  }

  /**
   * Subscribe to default table list view
   */
  private subscribeToDefaultView() {
    this.store$.pipe(
        takeUntil(this.destroyed$),
        select(messageSelectors.selectDefaultView),
        filter(listView => typeof listView !== 'undefined' && listView != null))
        .subscribe(listView => {
          this.activeView = {...listView};
        });
  }

  /**
   * Change page size event
   */
  changePageSize() {
    this.firstVisiblePaginator = 0;
    this.lastVisiblePaginator = NumberOfVisiblePaginators;
    this.messageFilter.pageNumber = 1;
    this.store$.dispatch(MessageActions.SetFilter({messageFilter: this.messageFilter}));
  }

  /**
   * Calculate first and last visible indexes
   */
  private mdbTableCalculateVisibleIndexes() {
    if (this.messageList.totalRecords === 0) {
      this.firstVisibleIndex = 0;
      this.lastVisibleIndex = 0;
    } else {
      this.firstVisibleIndex = this.messageList.totalRecords >= this.messageList.pageNumber * this.messageList.pageSize - this.messageList.pageSize + 1
                                ? this.messageList.pageNumber * this.messageList.pageSize - this.messageList.pageSize + 1 : 1;
      this.lastVisibleIndex = this.messageList.totalRecords > this.messageList.pageNumber * this.messageList.pageSize
                                ? this.messageList.pageNumber * this.messageList.pageSize : this.messageList.totalRecords;
    }
  }

  /**
   * Change page
   */
  changePage(event: any) {
    if (event.target.text >= 1 && event.target.text <= this.messageList.totalPages) {
      this.messageFilter.pageNumber = +event.target.text;
      this.store$.dispatch(MessageActions.SetFilter({messageFilter: this.messageFilter}));
    }
  }

  /**
   * Next page
   */
  nextPage() {
    if (this.pages.last.nativeElement.classList.contains('active')) {
      if ((this.messageList.totalPages - NumberOfVisiblePaginators) >= this.lastVisiblePaginator) {
        this.firstVisiblePaginator += NumberOfVisiblePaginators;
        this.lastVisiblePaginator += NumberOfVisiblePaginators;
      } else {
        this.firstVisiblePaginator += NumberOfVisiblePaginators;
        this.lastVisiblePaginator = this.messageList.totalPages;
      }
    }
    this.messageFilter.pageNumber += 1;
    this.store$.dispatch(MessageActions.SetFilter({messageFilter: this.messageFilter}));
  }

  /**
   * Previous page
   */
  previousPage() {
    if (this.pages.first.nativeElement.classList.contains('active')) {
      if ((this.lastVisiblePaginator - this.firstVisiblePaginator) === NumberOfVisiblePaginators)  {
        this.firstVisiblePaginator -= NumberOfVisiblePaginators;
        this.lastVisiblePaginator -= NumberOfVisiblePaginators;
      } else {
        this.firstVisiblePaginator -= NumberOfVisiblePaginators;
        this.lastVisiblePaginator -= (this.messageList.totalPages % NumberOfVisiblePaginators);
      }
    }
    this.messageFilter.pageNumber -= 1;
    this.store$.dispatch(MessageActions.SetFilter({messageFilter: this.messageFilter}));
  }

  /**
   * First page
   */
  firstPage() {
    this.firstVisiblePaginator = 0;
    this.lastVisiblePaginator = NumberOfVisiblePaginators;
    this.messageFilter.pageNumber = 1;
    this.store$.dispatch(MessageActions.SetFilter({messageFilter: this.messageFilter}));
  }

  /**
   * Last page
   */
  lastPage() {
    if (this.messageList.totalPages % NumberOfVisiblePaginators === 0) {
      this.firstVisiblePaginator = this.messageList.totalPages - NumberOfVisiblePaginators;
      this.lastVisiblePaginator = this.messageList.totalPages;
    } else {
      this.lastVisiblePaginator = this.messageList.totalPages;
      this.firstVisiblePaginator = this.lastVisiblePaginator - (this.messageList.totalPages % NumberOfVisiblePaginators);
    }
    this.messageFilter.pageNumber = this.messageList.totalPages;
    this.store$.dispatch(MessageActions.SetFilter({messageFilter: this.messageFilter}));
  }

  /**
   * Add page numbers
   */
  addPaginators() {
    this.paginators = [];
    for (let i = 1; i <= this.messageList.totalPages; i++) {
      this.paginators.push(i);
    }
    while (this.messageList.pageNumber >= this.lastVisiblePaginator) {
      this.firstVisiblePaginator += NumberOfVisiblePaginators;
      this.lastVisiblePaginator = this.firstVisiblePaginator + NumberOfVisiblePaginators;
    }
    while (this.messageList.pageNumber <= this.firstVisiblePaginator) {
      this.firstVisiblePaginator -= NumberOfVisiblePaginators;
      this.lastVisiblePaginator = this.firstVisiblePaginator + NumberOfVisiblePaginators;
    }
  }

  /**
   * Show range picking dialog
   */
  showRangePicker() {
    this.rangePopover.show();
  }

  /**
   * set selected filter date range
   */
  rangeSelected(selectedRange: string) {
    let selectedStartDate: moment.Moment;
    let selectedEndDate: moment.Moment;
    if (selectedRange === DateFilterRange.Today) {
       selectedStartDate = moment(new Date());
       selectedEndDate = moment(new Date());
    }
    if (selectedRange === DateFilterRange.Yesterday) {
      selectedStartDate = moment(new Date()).subtract(1, 'days');
      selectedEndDate = moment(new Date()).subtract(1, 'days');
    }
    if (selectedRange === DateFilterRange.SevenDays) {
      selectedStartDate = moment(new Date()).subtract(7, 'days');
      selectedEndDate = moment(new Date());
    }
    if (selectedRange === DateFilterRange.ThirtyDays) {
      selectedStartDate = moment(new Date()).subtract(1, 'month');
      selectedEndDate = moment(new Date());
    }
    if (selectedRange === DateFilterRange.ThisMonth) {
      selectedStartDate = moment(new Date(new Date().setDate(1)));
      selectedEndDate = moment(new Date(new Date().setDate(moment(new Date()).daysInMonth())));
    }
    selectedStartDate = moment(selectedStartDate.toDate().setHours(0, 0, 0, 0));
    selectedEndDate = moment(selectedEndDate.toDate().setHours(23, 59, 0, 0));
    this.messageFilter.createdDateStartRange = selectedStartDate.toDate();
    this.messageFilter.createdDateEndRange = selectedEndDate.toDate();
    this.store$.dispatch(MessageActions.SetFilter({messageFilter: this.messageFilter}));
  }

  /**
   * Opens the date range calendar
   */
  public openCalendar() {

    const modalOptions = {
      class: 'bex-calendar',
      data: {
        calendarOptions: {
          applyLabel: 'Select',
          initialDateRange: {
            startDate: this.messageFilter.createdDateStartRange,
            endDate: this.messageFilter.createdDateEndRange
          },
          maxDateRangeSelection: MaxCalendarRangePeriod,
          timePicker: false
        }
      }
    };

    const modalRef = this.modalService.show(ModalCalendarComponent, modalOptions);
    const self = this;
    modalRef.content.action$.subscribe((result: any) => {
      this.messageFilter.createdDateStartRange = result.startDate;
      this.messageFilter.createdDateEndRange = result.endDate;
      this.store$.dispatch(MessageActions.SetFilter({messageFilter: this.messageFilter}));
    });
  }

  /**
   * Clear search and restores the original list
   */
  clearSearch() {
    this.textSearchInput.nativeElement.value = '';
    this.showClearSearch = false;
    // this.store$.dispatch(new ManifestActions.SetFilterTableSearch(''));
  }

  /**
   * Select element on checkbox click
   */
  selectRow(checkboxEvent, manifest) {
    if (checkboxEvent.checked) {
      this.selectedMessages.push(manifest);
    } else {
      const index = this.selectedMessages.indexOf(manifest);

      if (index > -1) {
        this.selectedMessages.splice(index, 1);
      }
    }
  }

  /**
   * Select all elements
   */
  selectAll(checkboxEvent) {
    if (checkboxEvent.checked) {
      this.messageList.messages.forEach(el =>
        this.selectedMessages.push(el));
    } else {
      this.selectedMessages = [];
    }
  }

  /**
   * Check if element is selected
   */
  isSelected(selectedElement): boolean {
    return this.selectedMessages.findIndex(el => el.id === selectedElement.id) > -1;
  }

  /**
   * Show/hide filters
   */
  toggleFilters() {
    this.listFiltersVisible = !this.listFiltersVisible;
  }

  /**
   * Reload data
   */
  reLoadData() {
    this.firstVisiblePaginator = 0;
    this.lastVisiblePaginator = NumberOfVisiblePaginators;
    this.store$.dispatch(MessageActions.SetFilter({messageFilter: {
      pageNumber: 1,
      pageSize: this.messageFilter.pageSize
    }}));

  }

  /**
   * Apply filters
   */
  onApplyFilters() {
    this.firstVisiblePaginator = 0;
    this.lastVisiblePaginator = NumberOfVisiblePaginators;
    this.messageFilter.pageNumber = 1;
    this.store$.dispatch(MessageActions.SetFilter({messageFilter: this.messageFilter}));
  }

  /**
   * Click event on the table column header
   * @param tHeader - the column header
   */
  onTableColumnHeaderClick(tHeader: DataListColumn) {
    switch (tHeader.sortOrder) {
      case SortOrder.Asc: {
        tHeader.sortOrder = SortOrder.Desc;
        break;
      }
      case SortOrder.Desc: {
        tHeader.sortOrder = SortOrder.Asc;
        break;
      }
      default: {
        tHeader.sortOrder = SortOrder.Asc;
        break;
      }
    }
    let sortBy = '';
    this.activeView.columns.forEach(column => {
      if (column.sortOrder !== SortOrder.None) {
        sortBy += column.field + ':' + column.sortOrder + ',';
      }
    });
    if (sortBy.length > 0) {
      sortBy = sortBy.slice(0, sortBy.length - 1);
    }
    this.messageFilter.sortBy = sortBy;
    this.store$.dispatch(MessageActions.SetFilter({messageFilter: this.messageFilter}));
  }


  /**
   * Open show/hide columns dialog
   */
  openShowHideColumnsModal() {
    const modalOptions = {
      class: 'modal-full-height modal-right',
      data: {
        activeView: this.activeView
      }
    };
    const viewColumnsModal: MDBModalRef = this.modalService.show(ShowHideColumnsComponent, modalOptions);
    viewColumnsModal.content.action$.subscribe(result => {
        if (result) {
        }
      });
  }

  /**
   * Set active view
   */
  setView(view: DataListView) {
    this.store$.dispatch(MessageActions.SetActiveView({listView: view}));
  }

  /**
   * Date change selected event
   */
  onDateRangeChange(event) {
    this.selectedDateRange = event;
    this.messageFilter.pageNumber = 1;
    this.messageFilter.createdDateStartRange = this.selectedDateRange.startDate.toISOString();
    this.messageFilter.createdDateEndRange = this.selectedDateRange.endDate.toISOString();
    this.store$.dispatch(MessageActions.SetFilter({messageFilter: this.messageFilter}));
  }

  /**
   * Date change cleared event
   */
  onDateRangeCleared() {
    this.selectedDateRange = {
      startDate: null,
      endDate: null
    };
    this.messageFilter.pageNumber = 1;
    delete(this.messageFilter.createdDateStartRange);
    delete(this.messageFilter.createdDateEndRange);
    this.store$.dispatch(MessageActions.SetFilter({messageFilter: this.messageFilter}));
  }

  /**
   * Edit message
   * @param id number
   */
  editMessage(id: number) {

  }

  /**
   * Edit message
   * @param id number
   */
  deleteMessage(id: number) {

  }

  /**
   * Back to list
   */
  backToList(event) {
    if (!event.ctrlKey) {
      event.preventDefault();
      this.store$.dispatch(RouterActions.Go({path: [this.backToListLink]}));
    }
  }

  /**
   * Cleanup anything when the form closes
   */
  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
