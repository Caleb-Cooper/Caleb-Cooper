import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BexWrapperComponent } from './bex-wrapper.component';

describe('BexWrapperComponent', () => {
  let component: BexWrapperComponent;
  let fixture: ComponentFixture<BexWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BexWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BexWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
