import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users-service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  /**
   *
   */
  userList:any[] =[]
  userList$: Observable<any[]>;

  constructor(private userService : UsersService,private toaster :ToastrService) {
    this.userList$ = this.userService.getAllUsers();
    
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
