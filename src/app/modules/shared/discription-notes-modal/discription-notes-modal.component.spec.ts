import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscriptionNotesModalComponent } from './discription-notes-modal.component';

describe('DiscriptionNotesModalComponent', () => {
  let component: DiscriptionNotesModalComponent;
  let fixture: ComponentFixture<DiscriptionNotesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscriptionNotesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscriptionNotesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
