import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  
  private fullName$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');

  /**
   *
   */
  constructor() {
    
  }

  //get role as obeservarable stream
  public getRoleFromStore(): Observable<string>{
    return this.role$.asObservable();
  }

  // Set new Role state into stream
  public setRoleForStore(role:string):void{
     this.role$.next(role);
  }

  //get fullname as observable stream
  public getFullNameFromStore():Observable<string>{
    return this.fullName$.asObservable();
  }

  //set fullname state into stream
  public setFullNameForStore(fullName:string){
    this.fullName$.next(fullName);
  }
}
