import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageMeasurementComponent } from './main-page-measurement.component';

describe('MainPageMeasurementComponent', () => {
  let component: MainPageMeasurementComponent;
  let fixture: ComponentFixture<MainPageMeasurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageMeasurementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
