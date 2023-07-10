import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyPhasesItemsComponent } from './sticky-phases-items.component';

describe('StickyPhasesItemsComponent', () => {
  let component: StickyPhasesItemsComponent;
  let fixture: ComponentFixture<StickyPhasesItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickyPhasesItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickyPhasesItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
