import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, take } from 'rxjs';

export const AuthGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const auth = inject(Auth);

  return authState(auth).pipe(
    take(1),
    map((user) => {
      if (user) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
