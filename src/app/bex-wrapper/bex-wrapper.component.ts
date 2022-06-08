import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../animations';

@Component({
  selector: 'app-bex-wrapper',
  templateUrl: './bex-wrapper.component.html',
  styleUrls: ['./bex-wrapper.component.scss'],
  animations: [slideInAnimation]
})
export class BexWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
