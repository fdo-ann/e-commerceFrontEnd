import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users-service';
import { ToastrService } from 'ngx-toastr';

export const authGuardGuard: CanActivateFn = (route, state) => {

  const userService =inject(UsersService)
  const router = inject(Router);
  const toaster = inject(ToastrService)
  
  if(userService.isLoggedIn()){
    console.log('token',)
    return true;
    //console.log('')
  }else{
    toaster.error("Please Login First!");
    return router.createUrlTree(['/login']);
  }
};
