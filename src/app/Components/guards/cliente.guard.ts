import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const role = localStorage.getItem('rol');
    if (role === 'CLIENTE') {
      return true;
    } else {
      this.router.navigate(['/bienvenido']);
      return false;
    }
  }
}
