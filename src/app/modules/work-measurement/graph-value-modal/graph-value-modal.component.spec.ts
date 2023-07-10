import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphValueModalComponent } from './graph-value-modal.component';

describe('GraphValueModalComponent', () => {
  let component: GraphValueModalComponent;
  let fixture: ComponentFixture<GraphValueModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphValueModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphValueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
