import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { UsersService } from '../services/users-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token')
  const userService =inject(UsersService)
  const router = inject(Router);
  const toaster = inject(ToastrService)
  

  // Clone the request and add the JWT token
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    //return next(clonedRequest);
  }
    //return next(req)
 return next(req).pipe(
    catchError((err: HttpErrorResponse) => {

      if (err.status === 401) {
        toaster.warning('Token is expired, Please Login again');
        router.navigate(['/login']);
      }

      return throwError(() => err);
    })
  );
};

  //sample
  // if (token) {
  //   const clonedRequest = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   });

  //   return next(clonedRequest);

  // }
  
  //  return next(req);

