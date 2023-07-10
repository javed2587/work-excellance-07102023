import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MianToolBarComponent } from './mian-tool-bar.component';

describe('MianToolBarComponent', () => {
  let component: MianToolBarComponent;
  let fixture: ComponentFixture<MianToolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MianToolBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MianToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
