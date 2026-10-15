import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users-service';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const userService =inject(UsersService)
  const router = inject(Router);
  
  if(userService.isLoggedIn()){
    return true;
  }
   
   return router.createUrlTree(['/login']);
};
