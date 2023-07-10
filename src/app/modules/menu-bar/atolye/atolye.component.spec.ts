import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtolyeComponent } from './atolye.component';

describe('AtolyeComponent', () => {
  let component: AtolyeComponent;
  let fixture: ComponentFixture<AtolyeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtolyeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtolyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
