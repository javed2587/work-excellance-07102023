import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNotesComponent } from './side-notes.component';

describe('SideNotesComponent', () => {
  let component: SideNotesComponent;
  let fixture: ComponentFixture<SideNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
