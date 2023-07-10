import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupMainPageComponent } from './setup-main-page.component';

describe('SetupMainPageComponent', () => {
  let component: SetupMainPageComponent;
  let fixture: ComponentFixture<SetupMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupMainPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
