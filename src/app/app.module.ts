import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BexNavComponent } from './bex-nav/bex-nav.component';
import { BexWrapperComponent } from './bex-wrapper/bex-wrapper.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { AppStateModule } from './+state/app-state.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BexFooterComponent } from './bex-footer/bex-footer.component';
import { ToastModule } from 'ng-uikit-pro-standard';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { faUserCircle, faHome, faExclamationTriangle, faAsterisk, faList, faSort,
         faFilter, faSyncAlt, faPrint, faDownload, faTable, faCog, faTimes, faBars, faBell, faChevronDown, faPlus, faBolt, faWrench,
         faLongArrowAltDown, faLongArrowAltUp, faWindowRestore, faFile, faUser, faSignOutAlt, faCheck, faCalendar, faPen, faTrash,
         faEllipsisH } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    BexNavComponent,
    BexWrapperComponent,
    BexFooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppStateModule,
    SharedModule,
    ToastModule.forRoot(),
  ],
  providers: [
    NgxUiLoaderService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    faLibrary: FaIconLibrary
  ) {
    faLibrary.addIcons(
        faUserCircle, faHome, faExclamationTriangle, faAsterisk, faList, faSort,
        faFilter, faSyncAlt, faPrint, faDownload, faTable, faCog, faTimes, faBars, faBell, faChevronDown, faPlus, faBolt, faWrench,
        faLongArrowAltDown, faLongArrowAltUp, faWindowRestore, faFile, faUser, faSignOutAlt, faCheck, faCalendar, faPen, faTrash,
        faEllipsisH
      );
  }
}
