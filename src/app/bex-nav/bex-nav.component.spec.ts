import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BexNavComponent } from './bex-nav.component';

describe('BexNavComponent', () => {
  let component: BexNavComponent;
  let fixture: ComponentFixture<BexNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BexNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BexNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
