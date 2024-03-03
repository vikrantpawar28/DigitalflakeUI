import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeldialogComponent } from './deldialog.component';

describe('DeldialogComponent', () => {
  let component: DeldialogComponent;
  let fixture: ComponentFixture<DeldialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeldialogComponent]
    });
    fixture = TestBed.createComponent(DeldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
