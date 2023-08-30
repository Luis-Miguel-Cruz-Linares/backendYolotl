import { TestBed } from '@angular/core/testing';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { authActivateGuard } from './auth-activate.guard';

describe('AuthActivateGuard', () => {
  let guard: authActivateGuard;
  let cookieService: CookieService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CookieService, Router],
    });
    guard = TestBed.inject(authActivateGuard);
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if token exists in cookie', () => {
    spyOn(cookieService, 'get').and.returnValue('token');
    const routeSnapshot = {} as ActivatedRouteSnapshot;
    const stateSnapshot = {} as RouterStateSnapshot;
    const canActivate = guard.canActivate(routeSnapshot, stateSnapshot);
    expect(canActivate).toBeTrue();
    expect(cookieService.get).toHaveBeenCalledWith('token');
  });

  it('should return UrlTree to login page if token does not exist in cookie', () => {
    spyOn(cookieService, 'get').and.returnValue('');
    spyOn(router, 'createUrlTree').and.returnValue({} as UrlTree);
    const routeSnapshot = {} as ActivatedRouteSnapshot;
    const stateSnapshot = {} as RouterStateSnapshot;
    const canActivate = guard.canActivate(routeSnapshot, stateSnapshot);
    expect(canActivate).toEqual(jasmine.any(UrlTree));
    expect(cookieService.get).toHaveBeenCalledWith('token');
    expect(router.createUrlTree).toHaveBeenCalledWith(['/login']);
  });
});
