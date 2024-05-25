import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/authentication/auth.service";

export const authGuard: CanActivateFn = (route, state) => {

  const authService=inject(AuthService);
  const router=inject(Router);

  if(!authService.isLoggedIn()){
    router.navigate(['/'])
    return false;
  }

  return true;
};
