import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ModalCalendarComponent } from './containers/modal-calendar/modal-calendar.component';
import { ModalDialogComponent } from './containers/modal-dialog/modal-dialog.component';
import { DateRangeComponent } from './containers/date-range/date-range.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { BexCustomSearchDirective } from './directives/bex-custom-search.directive';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';

@NgModule({
  declarations: [
    ModalCalendarComponent,
    ModalDialogComponent,
    DateRangeComponent,
    BexCustomSearchDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgSelectModule,
    NgOptionHighlightModule,
    NgxDaterangepickerMd.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    NgxUiLoaderModule.forRoot({
      bgsColor: '#CC092F',
      bgsPosition: 'center-center',
      bgsType: 'ball-spin-fade-rotating',
      fgsColor: '#CC092F',
      bgsSize: 60,
      fgsType: 'ball-spin-fade-rotating',
      overlayColor: 'rgba(255,255,255,0.5)',
      blur: 0,
      hasProgressBar: false
    })
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgSelectModule,
    NgOptionHighlightModule,
    MDBBootstrapModulesPro,
    NgxUiLoaderModule,
    ModalCalendarComponent,
    ModalDialogComponent,
    DateRangeComponent,
    BexCustomSearchDirective
  ]
})
export class SharedModule { }
