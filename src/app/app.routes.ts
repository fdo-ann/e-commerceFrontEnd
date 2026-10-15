import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Dashboard } from './components/dashboard/dashboard';
import { authGuardGuard } from './guards/auth-guard-guard';

//export const routes: Routes = [];



export const routes: Routes = [ { path: '', redirectTo: 'login', pathMatch: 'full' }, 
    { path: 'login', component: Login }, 
    { path: 'signup', component: Signup },
    { path: 'dashboard', component: Dashboard, canActivate:[authGuardGuard]}
 ];
