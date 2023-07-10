import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrgLevelsComponent } from './create-org-levels.component';

describe('CreateOrgLevelsComponent', () => {
  let component: CreateOrgLevelsComponent;
  let fixture: ComponentFixture<CreateOrgLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrgLevelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrgLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
