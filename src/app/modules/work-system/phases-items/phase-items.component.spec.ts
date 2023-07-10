import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseItemsComponent } from './phase-items.component';

describe('PhaseItemsComponent', () => {
  let component: PhaseItemsComponent;
  let fixture: ComponentFixture<PhaseItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhaseItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
