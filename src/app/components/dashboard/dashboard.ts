import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users-service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';

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

  constructor(private userService : UsersService,private toaster :ToastrService) {
    this.userList$ = this.userService.getAllUsers();
    this.userName = this.userService.getFullNameFromToken();
  }

  ngOnInit(){
     this.getAllUsers(); 
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
