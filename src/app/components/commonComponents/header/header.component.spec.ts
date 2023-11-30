import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],imports: [HttpClientModule,BrowserAnimationsModule, MatSnackBarModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should navigate to "login" on login()', () => {
    spyOn(localStorage, 'clear');
    const navigateSpy = spyOn(router, 'navigate');

    component.login();

    expect(localStorage.clear).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  });

  it('should navigate to "login" on logout()', () => {
    spyOn(localStorage, 'clear');
    const navigateSpy = spyOn(router, 'navigate');

    component.logout();

    expect(localStorage.clear).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  });
});
