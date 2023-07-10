import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MianPageImprovementComponent } from './mian-page-improvement.component';

describe('MianPageImprovementComponent', () => {
  let component: MianPageImprovementComponent;
  let fixture: ComponentFixture<MianPageImprovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MianPageImprovementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MianPageImprovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
