import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageWorkSystemComponent } from './main-page-work-system.component';

describe('MainPageWorkSystemComponent', () => {
  let component: MainPageWorkSystemComponent;
  let fixture: ComponentFixture<MainPageWorkSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageWorkSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageWorkSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
