import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPagesetComponent } from './org-pageset.component';

describe('OrgPagesetComponent', () => {
  let component: OrgPagesetComponent;
  let fixture: ComponentFixture<OrgPagesetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgPagesetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPagesetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
