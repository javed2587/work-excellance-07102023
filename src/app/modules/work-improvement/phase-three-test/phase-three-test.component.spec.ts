import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseThreeTestComponent } from './phase-three-test.component';

describe('PhaseThreeTestComponent', () => {
  let component: PhaseThreeTestComponent;
  let fixture: ComponentFixture<PhaseThreeTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhaseThreeTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseThreeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
