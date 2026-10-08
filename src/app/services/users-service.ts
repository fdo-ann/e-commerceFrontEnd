import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  
   private baseUrl:string ="https://localhost:7150/api/users/";
  constructor(private http:HttpClient){

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
}
