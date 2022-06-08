import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHideColumnsComponent } from './show-hide-columns.component';

describe('ShowHideColumnsComponent', () => {
  let component: ShowHideColumnsComponent;
  let fixture: ComponentFixture<ShowHideColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHideColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHideColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
