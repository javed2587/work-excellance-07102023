import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildCompletenessComponent } from './build-completeness.component';

describe('BuildCompletenessComponent', () => {
  let component: BuildCompletenessComponent;
  let fixture: ComponentFixture<BuildCompletenessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildCompletenessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildCompletenessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
