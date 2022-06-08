import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bex-footer',
  templateUrl: './bex-footer.component.html',
  styleUrls: ['./bex-footer.component.scss']
})
export class BexFooterComponent implements OnInit {
  currentYear: number;
  constructor() { }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
  }

}
