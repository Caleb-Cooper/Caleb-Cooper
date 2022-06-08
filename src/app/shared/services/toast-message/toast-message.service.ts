import { Injectable } from '@angular/core';
import { ToastService } from 'ng-uikit-pro-standard';

@Injectable({
  providedIn: 'root'
})

export class ToastMessageService {
  error(message: string) {
    const toastOptions = { timeOut: 10000, toastClass: 'toast-opacity-80 toast-fit-content', positionClass: 'md-toast-bottom-right'};
    this.toastService.error(message, null, toastOptions);
  }
  success(message: string) {
    const toastOptions = { timeOut: 10000,  toastClass: 'toast-opacity-80 toast-fit-content', positionClass: 'md-toast-bottom-right'};
    this.toastService.success(message, null, toastOptions );
  }
  info(message: string) {
    const toastOptions = { timeOut: 10000,  toastClass: 'toast-opacity-80 toast-fit-content', positionClass: 'md-toast-bottom-right'};
    this.toastService.info(message, null, toastOptions );
  }

  constructor(
    private toastService: ToastService
    ) { }
}
