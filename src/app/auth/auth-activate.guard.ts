import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class authActivateGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.cookieService.get('token');
    if (token) {
      return true;
    } else {
      // Redirigir al usuario a la página de inicio de sesión
      return this.router.createUrlTree(['/login']);
    }
  }
}
