import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyPhasesListComponent } from './sticky-phases-list.component';

describe('StickyPhasesListComponent', () => {
  let component: StickyPhasesListComponent;
  let fixture: ComponentFixture<StickyPhasesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickyPhasesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickyPhasesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
