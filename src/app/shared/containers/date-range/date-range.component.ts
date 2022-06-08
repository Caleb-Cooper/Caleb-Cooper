import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { MaxCalendarRangePeriod, DateRangeFormat } from 'src/app/+state/app.const';
import { DateFilterRange } from 'src/app/+state/app.enum';
import * as moment from 'moment';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})

export class DateRangeComponent implements OnInit, OnChanges {
  @Input() dateRangeSelection;
  @Input() dateRangeStyle;
  @Input() dateRangeBlankLabel;
  @Input() popoverPlacement;
  @Output() dateRangeSelected = new EventEmitter<any>();
  @Output() dateRangeCleared = new EventEmitter();

  dateRangeLabel: string;
  dateFilterRange = DateFilterRange;
  calendarVisible: boolean;
  clearButtonVisible: boolean;
  modalCalendarOptions = {
        showButtons: false,
        initialDateRange: {
          startDate: moment(new Date()),
          endDate: moment(new Date())
        },
        maxDateRangeSelection: MaxCalendarRangePeriod,
        timePicker: false
  };
  selectedDateRange = {
    startDate: moment(new Date()),
    endDate: moment(new Date())
  };

  constructor() { }

  ngOnInit() {
    this.clearButtonVisible = false;
    this.selectedDateRange = {...this.dateRangeSelection};
    this.populatedPostedDateRangeLabel(this.selectedDateRange.startDate,
                                       this.selectedDateRange.endDate);
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    const change: SimpleChange = changes.dateRangeSelection;
    if (!change.firstChange) {
      this.selectedDateRange = {...this.dateRangeSelection};
      this.populatedPostedDateRangeLabel(change.currentValue.startDate,
        change.currentValue.endDate);
    }
  }

  /**
   * set selected filter date range
   */
  rangeSelected(rangePopover, selectedRange: string) {
    if (selectedRange === this.dateFilterRange.Today) {
      this.selectedDateRange.startDate = moment(new Date());
      this.selectedDateRange.endDate = moment(new Date());
    }
    if (selectedRange === this.dateFilterRange.Yesterday) {
      this.selectedDateRange.startDate = moment(new Date()).subtract(1, 'days');
      this.selectedDateRange.endDate = moment(new Date()).subtract(1, 'days');
    }
    if (selectedRange === this.dateFilterRange.SevenDays) {
      this.selectedDateRange.startDate = moment(new Date()).subtract(7, 'days');
      this.selectedDateRange.endDate = moment(new Date());
    }
    if (selectedRange === this.dateFilterRange.ThirtyDays) {
      this.selectedDateRange.startDate = moment(new Date()).subtract(1, 'month');
      this.selectedDateRange.endDate = moment(new Date());
    }
    if (selectedRange === this.dateFilterRange.ThisMonth) {
      this.selectedDateRange.startDate = moment(new Date(new Date().setDate(1)));
      this.selectedDateRange.endDate = moment(new Date(new Date().setDate(moment(new Date()).daysInMonth())));
    }
    if (selectedRange === this.dateFilterRange.CustomRange) {
      if (!this.selectedDateRange || !this.selectedDateRange.startDate || !this.selectedDateRange.endDate) {
        this.selectedDateRange = {
          startDate: moment(new Date()),
          endDate: moment(new Date())
        };
      }
      this.modalCalendarOptions.initialDateRange = this.selectedDateRange;
      this.calendarVisible = true;
      setTimeout(() => {
        rangePopover.show();
      }, 200);
    } else {
      rangePopover.hide();
      this.selectedDateRange.startDate = moment(this.selectedDateRange.startDate.toDate().setHours(0, 0, 0, 0));
      this.selectedDateRange.endDate = moment(this.selectedDateRange.endDate.toDate().setHours(23, 59, 0, 0));
      if (this.selectedDateRange.startDate && this.selectedDateRange.endDate) {
        this.populatedPostedDateRangeLabel(this.selectedDateRange.startDate, this.selectedDateRange.endDate);
        this.dateRangeSelected.emit(this.selectedDateRange);
      }
    }
  }

  /**
   * Populate date range label
   * @param startDate moment
   * @param endDate moment
   */
  private populatedPostedDateRangeLabel(startDate: moment.Moment, endDate: moment.Moment) {
    if (startDate && endDate) {
      this.dateRangeLabel = startDate.format(DateRangeFormat) + ' - ' + endDate.format(DateRangeFormat);
      this.clearButtonVisible = true;
    } else {
      this.dateRangeLabel = this.dateRangeBlankLabel;
      this.clearButtonVisible = false;
    }
  }

  /**
   * Show range picking dialog
   */
  showRangePicker() {
    this.calendarVisible = false;
  }

  /**
   * Calendar date change event
   */
  onDateRangeChange(event) {
    this.selectedDateRange = event;
  }

  /**
   * Calendar date change event
   */
  onDateRangeClear(event) {
    this.selectedDateRange = {
      startDate: null,
      endDate: null
    };
    this.populatedPostedDateRangeLabel(this.selectedDateRange.startDate, this.selectedDateRange.endDate);
    this.dateRangeCleared.emit();
    event.stopPropagation();
  }

}
