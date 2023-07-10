import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseFiveComponent } from './phase-five.component';

describe('PhaseFiveComponent', () => {
  let component: PhaseFiveComponent;
  let fixture: ComponentFixture<PhaseFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhaseFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
