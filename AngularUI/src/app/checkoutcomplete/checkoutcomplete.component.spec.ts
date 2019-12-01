import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutcompleteComponent } from './checkoutcomplete.component';

describe('CheckoutcompleteComponent', () => {
  let component: CheckoutcompleteComponent;
  let fixture: ComponentFixture<CheckoutcompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutcompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutcompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
