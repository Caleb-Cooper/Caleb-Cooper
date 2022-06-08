import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {
  @ViewChild('dialogMessage', { static: true }) dialogMessage: ElementRef;
  action$: Subject<any> = new Subject();
  dialogType: any;
  dialogTitle: string;
  confirmButton: string;
  closeButton: string;
  constructor(
    public modalRef: MDBModalRef,
    private ngxUiLoaderService: NgxUiLoaderService
    ) { }

  ngOnInit() {
    this.ngxUiLoaderService.stopAll();
  }


  /**
   * Close/cancel button click event
   */
  cancel() {
      this.modalRef.hide();
      this.action$.next(false);
  }

  /**
   * Confirm button click event
   */
  confirm() {
      this.modalRef.hide();
      this.action$.next(true);
  }

}
