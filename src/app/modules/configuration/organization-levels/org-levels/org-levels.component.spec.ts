import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgLevelsComponent } from './org-levels.component';

describe('OrgLevelsComponent', () => {
  let component: OrgLevelsComponent;
  let fixture: ComponentFixture<OrgLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgLevelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
