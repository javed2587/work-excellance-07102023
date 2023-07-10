import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeAlertComponent } from './prime-alert.component';

describe('PrimeAlertComponent', () => {
  let component: PrimeAlertComponent;
  let fixture: ComponentFixture<PrimeAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimeAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
