import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';
import { DataListView } from 'src/app/shared/models/data-list-view.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/+state/reducers';
import { ToastMessageService } from 'src/app/shared/services/toast-message/toast-message.service';
import * as MessageActions from '../../+state/actions/message.actions';


@Component({
  selector: 'app-show-hide-columns',
  templateUrl: './show-hide-columns.component.html',
  styleUrls: ['./show-hide-columns.component.scss']
})
export class ShowHideColumnsComponent implements OnInit {
  action$: Subject<any> = new Subject();
  activeView: DataListView;
  viewColumnsForm: FormGroup;
  viewColumns: any[];
  viewSaveForm: FormGroup;
  isSavingView: boolean;

  constructor(
    private store$: Store<AppState>,
    public viewColumnsModal: MDBModalRef,
    private formBuilder: FormBuilder,
    private toastMessageService: ToastMessageService
  ) { }

  ngOnInit() {
    this.viewColumns = this.activeView.columns;
    let i = 0;
    this.viewColumns.forEach(column => {
        column.controlName = 'field' + i.toString();
        i++;
    });
    this.viewColumnsForm = this.createViewForm();
    this.viewSaveForm = this.createSaveForm();
  }

  get viewName() { return this.viewSaveForm.get('viewName'); }

  /**
   * Create fields
   */
  createViewForm() {
    const group = this.formBuilder.group({});
    console.log(this.viewColumns);
    this.viewColumns.forEach(control => group.addControl(control.controlName, this.formBuilder.control(control.show)));
    return group;
  }

  /**
   * Create save form fields
   */
  createSaveForm() {
    return this.formBuilder.group({
      viewName: ['', [Validators.required]],
      isDefaultView: [false, ]
    });
  }

  /**
   * Close/cancel button click event
   */
  closeForm() {
    this.viewColumnsModal.hide();
    this.action$.next();
  }

  /**
   * Apply selection
   */
  applySelection() {
    const newView = {...this.activeView};
    for (let index = 0; index < this.viewColumns.length; index++) {
      newView.columns[index].show = this.viewColumnsForm.get(this.viewColumns[index].controlName).value;
    }
    this.store$.dispatch(MessageActions.UpdateView({listView: newView}));
    this.viewColumnsModal.hide();
  }

  /**
   * Save view event
   */
  saveView() {
    if (this.viewSaveForm.valid) {
      const newView: DataListView = {
        viewName: this.viewSaveForm.get('viewName').value,
        default: this.viewSaveForm.get('isDefaultView').value,
        columns: this.activeView.columns
      };
      for (let index = 0; index < newView.columns.length; index++) {
        newView.columns[index].show = this.viewColumnsForm.get('field' + index.toString()).value;
      }
      this.store$.dispatch(MessageActions.CreateView({listView: newView}));
      this.viewColumnsModal.hide();
    } else {
      this.toastMessageService.error('Please enter view name');
    }
  }



}
