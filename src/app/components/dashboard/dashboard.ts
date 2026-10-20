import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users-service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserStore } from '../../services/user-store';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLinkActive, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  /**
   *
   */
  userList:any[] =[]
  userList$: Observable<any[]>;
  userName:any;

  constructor(private userService : UsersService,private toaster :ToastrService, private userStore: UserStore) {
    this.userList$ = this.userService.getAllUsers();
    
  }

  ngOnInit(){
     this.getAllUsers(); 
  
     this.userStore.getFullNameFromStore().subscribe({
      next:(name)=>{
        this.userName = name || this.userService.getFullNameFromToken();
         // username is recieved from observable or from the local storage
         // first username displayed from obserable and when page is refreshed it's fetched from store
      },error:()=>{

      }
     })

  }

  signOut(){
    this.userService.signOut();
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe({
      next:(res)=>{
        this.userList=res;
        console.log("users",res)
      },
      error:(err)=>{
         this.toaster.error(err?.error.msg);
      }
    })
  }
}
