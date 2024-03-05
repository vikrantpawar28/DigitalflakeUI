import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deldialog1Component } from './deldialog1.component';

describe('Deldialog1Component', () => {
  let component: Deldialog1Component;
  let fixture: ComponentFixture<Deldialog1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Deldialog1Component]
    });
    fixture = TestBed.createComponent(Deldialog1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
