import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSuccessComponent } from './request-success.component';

describe('RequestSuccessComponent', () => {
  let component: RequestSuccessComponent;
  let fixture: ComponentFixture<RequestSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestSuccessComponent]
    });
    fixture = TestBed.createComponent(RequestSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
