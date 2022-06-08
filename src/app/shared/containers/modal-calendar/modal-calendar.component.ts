import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { Moment } from 'moment';
import { DaterangepickerComponent } from 'ngx-daterangepicker-material';


@Component({
  selector: 'app-modal-calendar',
  templateUrl: './modal-calendar.component.html',
  styleUrls: ['./modal-calendar.component.scss']
})
export class ModalCalendarComponent implements OnInit {
  @ViewChild(DaterangepickerComponent, { static: true }) datePicker: DaterangepickerComponent;
  action$: Subject<any> = new Subject();

  timeFormat = 'HH:mm A';

  // Override any default calendar options
  @Input() calendarOptions;
  @Output() dateRangeChange = new EventEmitter<any>();

  // Default calendar settings, the user can override these when creating the modal
  baseCalendarOptions = {
    autoApply: true,
    showButtons: true,
    applyLabel: 'Search',
    linkedCalendars: true,
    locale: {
      firstDay: 1,
      daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    initialDateRange: { startDate: moment(new Date()), endDate: moment(new Date()) },
    initialDate: moment(Date.now()),
    singleCalendar: false,
    timePicker: false,
    maxDateRangeSelection: 0
  };

  // Stores the user selections
  selection = {
    startDate: moment(new Date()),
    endDate: moment(new Date())
  };

  startTime: any = '12:00 AM';
  endTime = '11:59 PM';
  errors = Array<string>();

  constructor() { }

  ngOnInit() {
    this.baseCalendarOptions = { ...this.baseCalendarOptions, ...this.calendarOptions };
    this.setInitialDates();
  }

  /**
   * Called when the confirm button is clicked
   */
  onConfirmClick() {
    this.selection.startDate = this.combineDateTime(this.selection.startDate, this.startTime, 'HH:mm A');
    this.selection.endDate = this.combineDateTime(this.selection.endDate, this.endTime, 'HH:mm A');
    this.action$.next(this.selection);
    // Forces instance closure of the modal, the modalRef is
    // the correct way to close this isntance of the modal, but it has a delay in angular,
    // this will have an issue if multiple modals are open over the top of each other
  }

  onCancelClick() {
    this.action$.next();
  }

  /**
   * Emits when the dates are selected
   * @param evt The dates selected
   */
  choosedDate(evt) {
    this.selection = evt;
    this.selection.startDate = this.combineDateTime(this.selection.startDate, this.startTime, this.timeFormat) ;
    this.selection.endDate = this.combineDateTime(this.selection.endDate, this.endTime, this.timeFormat);

    if (this.selection.startDate && this.selection.startDate) {
      this.validate();
    } else {
      this.clearErrors();
      this.errors.push('The selected date range is invalid');
    }
  }

  setInitialDates() {
    let startDate: Moment;
    let endDate: Moment;
    if (this.baseCalendarOptions.singleCalendar) {
      startDate = this.baseCalendarOptions.initialDate.isValid() ? this.baseCalendarOptions.initialDate : moment(Date.now());
      endDate = this.baseCalendarOptions.initialDate.isValid() ? this.baseCalendarOptions.initialDate : moment(Date.now());
    } else {
      startDate = this.baseCalendarOptions.initialDateRange.startDate.isValid() ? this.baseCalendarOptions.initialDateRange.startDate : moment(Date.now());
      endDate = this.baseCalendarOptions.initialDateRange.endDate.isValid() ? this.baseCalendarOptions.initialDateRange.endDate : moment(Date.now());
    }
    this.selection.startDate = startDate;
    this.selection.endDate = endDate;

    this.startTime = startDate.format(this.timeFormat);
    this.endTime = endDate.format(this.timeFormat);

    this.datePicker.setStartDate(this.selection.startDate);
    this.datePicker.setEndDate(this.selection.endDate);
    this.datePicker.updateCalendars();
  }

  combineDateTime(date: Moment, time: string, format: string){
    const timeParsed = moment(time, format);
    if (timeParsed.isValid() === true) {
        return date.hour(timeParsed.hour())
                   .minute(timeParsed.minute())
                   .second(timeParsed.second());
    } else {
        console.log('Time couldn\'t be parsed: ' + time + ' (format: ' + format + ')');
        return null;
    }
  }

  validate() {
    this.clearErrors();
    const endDateMs = this.selection.endDate.toDate().getTime();
    const startDateMs = this.selection.startDate.toDate().getTime();
    // Get 1 day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;
    const dateDifferenceMs = endDateMs - startDateMs;

    if (this.baseCalendarOptions.maxDateRangeSelection > 0
      && (Math.round(dateDifferenceMs / oneDay)) > this.baseCalendarOptions.maxDateRangeSelection) {
      this.errors.push(`The selected date range is greater than ${this.baseCalendarOptions.maxDateRangeSelection} days`);
    }

    if (this.selection.startDate.isAfter(this.selection.endDate)){
      this.errors.push('The end date is prior to the start date');
    }
    if (this.errors.length === 0) {
      this.selection.startDate = this.combineDateTime(this.selection.startDate, this.startTime, 'HH:mm A');
      this.selection.endDate = this.combineDateTime(this.selection.endDate, this.endTime, 'HH:mm A');
      this.dateRangeChange.emit(this.selection);
    } else {
      this.dateRangeChange.emit();
    }
  }

  clearErrors() {
    // Clear the errors
    this.errors.splice(0, this.errors.length);
  }

  validateTime() {
    if (this.selection) {
      this.selection.startDate = this.combineDateTime(this.selection.startDate, this.startTime, this.timeFormat);
      this.selection.endDate = this.combineDateTime(this.selection.endDate, this.endTime, this.timeFormat);

      if (this.selection.startDate && this.selection.endDate) {
        this.validate();
      }
    }

  }

}
