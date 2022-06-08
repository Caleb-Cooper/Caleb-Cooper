import { Component, OnInit } from '@angular/core';
import { ToastMessageService } from 'src/app/shared/services/toast-message/toast-message.service';
import { MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard';
import { ModalCalendarComponent } from 'src/app/shared/containers/modal-calendar/modal-calendar.component';
import * as moment from 'moment';
import { ModalDialogComponent } from 'src/app/shared/containers/modal-dialog/modal-dialog.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataInputService } from '../../services/data-input.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+state/reducers';
import * as RouterActions from '../../../+state/actions/router.actions';

@Component({
  selector: 'app-example-input',
  templateUrl: './example-input.component.html',
  styleUrls: ['./example-input.component.scss']
})
export class ExampleInputComponent implements OnInit {
  inputForm: FormGroup;
  optionsSelect: any;
  people$: Observable<any[]>;
  backToListLink = '';
  modalCalendarOptions = {
    class: 'bex-calendar bex-calendar-single',
    data: {
      calendarOptions: {
        autoApply: true,
        linkedCalendars: false,
        applyLabel: 'Select',
        singleCalendar: true,
      }
    }
  };

  constructor(
    private store$: Store<AppState>,
    private fb: FormBuilder,
    private toastMessageService: ToastMessageService,
    private modalService: MDBModalService,
    private dataInputService: DataInputService
  ) { }

  ngOnInit() {
    this.optionsSelect = [
      { value: 1, label: 'Branch' },
      { value: 2, label: 'Customer' },
      { value: 3, label: 'Manifesting' },
    ];
    this.inputForm = this.fb.group({
      userName: new FormControl({
        value: '',
        },
        [Validators.required, Validators.minLength(3)]
      ),
      checked: new FormControl(true),
      switchExample: new FormControl(true),
      options: new FormControl({
        value: '',
      }
      ),
      ngSelect: new FormControl({
        value: [],
      }
      ),
      message: new FormControl({
        value: '',
        },
        [Validators.required]
      ),
    });
    this.inputForm.patchValue({userName: ''});
    this.inputForm.patchValue({message: ''});
    this.inputForm.patchValue({ngSelect: []});
    this.people$ = this.dataInputService.getPeople();
  }

  get userName() { return this.inputForm.get('userName'); }
  get checked() { return this.inputForm.get('checked'); }
  get options() { return this.inputForm.get('options'); }
  get ngSelect() { return this.inputForm.get('ngSelect'); }
  get message() { return this.inputForm.get('message'); }

  onSubmit() {
    this.inputForm.markAllAsTouched();
  }

  onCancel() {
    this.inputForm.reset();
    this.inputForm.markAsUntouched();
    this.inputForm.markAsPristine();
  }

  /**
   * Show info toast
   */
  showSuccessToast() {
    this.toastMessageService.success('This is a very long success message for testing!');
  }

  /**
   * Open the date calendar
   */
  public openCalendar() {
    const modalOptions = {...this.modalCalendarOptions} as any;
    modalOptions.data.calendarOptions.initialDate = moment(new Date());
    const modalRef = this.modalService.show(ModalCalendarComponent, modalOptions);
    modalRef.content.action$.subscribe((result: any) => {
      modalRef.hide();
      if (result) {
        this.toastMessageService.info('Selected date is ' + moment(new Date(result.startDate)).format('DD/MM/YYYY'));
      }
    });
  }

  /**
   * Show modal dialog
   */
  public showModalDialog() {
    const modalOptions = {
      class: 'modal-dialog-centered',
      data: {
        dialogType: 'discardChanges',
        dialogTitle: 'Confirm',
        dialogMessage: 'Are you sure you want to close this dialog?',
        confirmButton: 'Yes',
        closeButton: 'No'
      }
    };
    const modalRef: MDBModalRef = this.modalService.show(ModalDialogComponent, modalOptions);
    modalRef.content.action$.subscribe((result: boolean) => {
      this.toastMessageService.info('Result is ' + result );
    });
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



}
