import { Component, OnInit } from '@angular/core';
import * as RouterActions from '../+state/actions/router.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../+state/reducers';

@Component({
  selector: 'app-bex-nav',
  templateUrl: './bex-nav.component.html',
  styleUrls: ['./bex-nav.component.scss']
})
export class BexNavComponent implements OnInit {
  isOpen = true;
  menuState = 'full';
  hoverMenuOpen = this.isOpen;

  constructor(
    private store$: Store<AppState>,
  ) { }



  ngOnInit() {
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.calculateMenuState();
  }

  calculateMenuState() {
    this.menuState =  this.isOpen ? 'full' : 'slim';
    if (!this.isOpen) {
      document.getElementById('maincontent').style.left = '65px';
      document.getElementById('maincontent').style.width = 'calc(100% - 65px)';
    } else {
      document.getElementById('maincontent').style.left = '250px';
      document.getElementById('maincontent').style.width = 'calc(100% - 250px)';
    }
  }

  hoverOnMenu() {
    this.hoverMenuOpen = this.isOpen;
    if (!this.isOpen) {
      this.isOpen = true;
      this.calculateMenuState();
    }
  }

  hoverOffMenu() {
    if (!this.hoverMenuOpen) {
      this.isOpen = false;
      this.hoverMenuOpen = false;
      this.calculateMenuState();
    }
  }

  /**
   * Navigate to new route
   */
  navigateTo(path: string[]) {
    this.store$.dispatch(
      RouterActions.Go({
        path
      })
    );
  }
}
