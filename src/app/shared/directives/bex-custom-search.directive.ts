import { Directive, Input, HostListener, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { VisibleDropdownItems } from 'src/app/+state/app.const';
import { ItemList } from '../models/item-list.model';

@Directive({
  selector: '[bexCustomSearch]'
})
export class BexCustomSearchDirective implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();
  @Input() items: any;
  @Input() itemList: ItemList;
  @Input() bindValue: string;
  @Input() bindLabel: string;

  @Input() searchText: string;
  @Input() searchKeyValue: any;
  @Input() searchField: any;
  @Input() typeahead: Subject<string>;
  @Output() refreshItemList = new EventEmitter<any>();
  @Output() applyFilter = new EventEmitter<string>();

  previousKey: number;
  previousSearch: string;
  previousList: ItemList;

  constructor() { }

  @HostListener('open') onOpen() {
    this.previousKey = this.searchField.value;
    this.previousSearch = this.searchText;
    this.previousList = {
      items: this.items,
      keyword: this.searchText,
      pageNumber: this.itemList.pageNumber,
      pageSize: this.itemList.pageSize,
      totalRecords: this.itemList.totalRecords,
      totalPages: this.itemList.totalPages,
    };
    if (this.searchKeyValue && this.searchField.value === this.searchKeyValue) {
      this.refreshItemList.emit({
        items: [],
        pageNumber: 1,
        totalPages: 1,
        totalRecords: 1,
      });
      this.applyFilter.emit('');
    }
  }

  @HostListener('close') onClose() {
    if (this.previousSearch !== this.searchText) {
      this.searchField.setValue(this.previousKey);
      this.searchText = this.previousSearch;
      this.refreshItemList.emit(this.previousList);
    }
    if (!this.searchField.value) {
        this.previousSearch = '';
        this.searchText = '';
    }
  }

  @HostListener('change') onChange() {
    this.previousSearch = this.searchText;
  }

  @HostListener('clear') onClear() {
    this.previousSearch = '';
    this.searchText = '';
    this.applyFilter.emit('');
  }

  ngOnInit() {
    this.typeahead.pipe(
      takeUntil(this.destroyed$),
      distinctUntilChanged())
      .subscribe(term => {
        if (term !== null) {
          this.searchText = term;
          const filteredItems = this.items.filter(item =>
                item[this.bindLabel].toLowerCase().includes(term.toLowerCase())
            );
          /* The filteredItems are subset of the currently loaded list, the last page of the list needs to be reloaded
              to check for more items, totalRecords is artificially incremented,
              and if the last page is not full - pageNumber is artificially decremented,
              to force api call when reaching the end of the list */
          if (filteredItems.length < VisibleDropdownItems || term === '') {
              this.applyFilter.emit(term);
          } else {
              this.refreshItemList.emit({
                items: filteredItems,
                filtered: true,
                keyword: term,
                pageNumber: this.itemList.totalPages * this.itemList.pageSize > filteredItems.length
                            ? Math.ceil(filteredItems.length / this.itemList.pageSize) - 1
                            : Math.ceil(filteredItems.length / this.itemList.pageSize),
                totalPages: Math.ceil(filteredItems.length / this.itemList.pageSize),
                totalRecords: filteredItems.length + 1,
              });
          }
          if (term === '') {
            this.searchField.setValue(null);
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
