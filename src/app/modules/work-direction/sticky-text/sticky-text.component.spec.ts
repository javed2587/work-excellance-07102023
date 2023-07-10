import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyTextComponent } from './sticky-text.component';

describe('StickyTextComponent', () => {
  let component: StickyTextComponent;
  let fixture: ComponentFixture<StickyTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickyTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickyTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
