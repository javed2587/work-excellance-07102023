import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const roles = this.getRolesFromLocalStorage()
      if (roles.includes('ROLE_USER') || roles.includes('ROLE_ORG_ADMIN'))
        return true;
      return false;
  }

  private getRolesFromLocalStorage(): string[] {
    const rolesString = localStorage.getItem('roles');
    let roles: string[] = [];
    if (rolesString) {
      try {
        roles = JSON.parse(rolesString);
      } catch (error) {
        roles = [rolesString]; // Convert to array if not in array format
      }
    }
    return roles;
  }

}
