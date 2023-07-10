import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageWorkDirectionComponent } from './main-page-work-direction.component';

describe('MainPageWorkDirectionComponent', () => {
  let component: MainPageWorkDirectionComponent;
  let fixture: ComponentFixture<MainPageWorkDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageWorkDirectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageWorkDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
