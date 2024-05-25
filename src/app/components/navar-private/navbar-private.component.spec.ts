import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPrivateComponent } from './navbar-private.component';

describe('NavarPrivateComponent', () => {
  let component: NavbarPrivateComponent;
  let fixture: ComponentFixture<NavbarPrivateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarPrivateComponent]
    });
    fixture = TestBed.createComponent(NavbarPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
