import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainReportPageComponent } from './main-report-page.component';

describe('MainReportPageComponent', () => {
  let component: MainReportPageComponent;
  let fixture: ComponentFixture<MainReportPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainReportPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
