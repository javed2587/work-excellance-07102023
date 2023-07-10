import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOppertunityComponent } from './add-oppertunity.component';

describe('AddOppertunityComponent', () => {
  let component: AddOppertunityComponent;
  let fixture: ComponentFixture<AddOppertunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOppertunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOppertunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
