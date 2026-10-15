import { Component } from '@angular/core';
import { UsersService } from '../../services/users-service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  /**
   *
   */
  constructor(private userService : UsersService) {
    
    
  }

  signOut(){
    this.userService.signOut();
  }
}
