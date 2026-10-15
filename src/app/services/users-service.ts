import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  
   private baseUrl:string ="https://localhost:7150/api/users/";
  constructor(private http:HttpClient,private router: Router){

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
    localStorage.setItem("token",tokenValue);
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
}
