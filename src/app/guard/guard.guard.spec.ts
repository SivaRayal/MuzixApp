import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GuardGuard } from './guard.guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

describe('GuardGuard', () => {
  let guard: GuardGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
    });
    guard = TestBed.inject(GuardGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });


  it('should allow navigation when token is present', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fakeToken');

    const canActivate = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(canActivate).toBe(true);
  });

  it('should navigate to "/login" and return false when token is not present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const navigateSpy = spyOn(router, 'navigate');

    const canActivate = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    expect(canActivate).toBe(false);
  });
});
