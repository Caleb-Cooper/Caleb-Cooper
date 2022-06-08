import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BexFooterComponent } from './bex-footer.component';

describe('BexFooterComponent', () => {
  let component: BexFooterComponent;
  let fixture: ComponentFixture<BexFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BexFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BexFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
