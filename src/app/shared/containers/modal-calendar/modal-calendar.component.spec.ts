import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCalendarComponent } from './modal-calendar.component';

describe('ModalCalendarComponent', () => {
  let component: ModalCalendarComponent;
  let fixture: ComponentFixture<ModalCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
