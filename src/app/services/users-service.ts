import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  
   private baseUrl:string ="https://localhost:7150/api/users/";
    private userPayload: any;

  constructor(private http:HttpClient,private router: Router){
    this.userPayload = this.decodedToken();
    console.log('userPayload user service', this.userPayload)
  }

  getBackEndResponseSample():Observable<string>{
    return this.http.get(this.baseUrl,{
      responseType:'text'
    });
  }

  onSignUp(signUpObj:any):Observable<any>{
    return this.http.post(`${this.baseUrl}register`,signUpObj)
  }

  onLogin(loginObj:any): Observable<any>{
    return this.http.post(`${this.baseUrl}login`,loginObj)
  }

  setToken(tokenValue:string): void{
    localStorage.setItem('token',tokenValue);
  }

  getToken():string | null{
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean {
    return !!localStorage.getItem('token');
  }

  signOut():void{
    localStorage.clear();
    //localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  getAllUsers():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}get-users`);
  }

  decodedToken():any{
     const jwtHelper = new JwtHelperService();
     const token = this.getToken();
     if (token){
      return jwtHelper.decodeToken(token);
     }
     return null
  }

  getFullNameFromToken():string{
    if(this.userPayload){
      return this.userPayload.unique_name;
    }
    return "";
  }

}
