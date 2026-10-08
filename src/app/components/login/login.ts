import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  loginForm!:FormGroup;
  constructor( private fb:FormBuilder, private userService: UsersService, private router:Router){

  }

ngOnInit():void{
  this.loginForm = this.fb.group({
    username: ["",Validators.required],
    password: ["", Validators.required]
  });

}

onLogin():void{
   if (this.loginForm.valid){
    console.log(this.loginForm.value)
    this.userService.onLogin(this.loginForm.value).subscribe({
      next:(res)=>{
        alert(res.message);
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
      },
      error:(err)=>{
        console.log("err",err);
        alert(err?.error?.message || 'Something went wrong!');
      }
    })
   }else {
    this.validateAllFormFields(this.loginForm);
   }

}

private validateAllFormFields(formGroup: FormGroup): void {
   Object.keys(formGroup.controls).forEach(field =>
     { const control = formGroup.get(field); 
      if (control instanceof FormControl) { 
        control.markAsDirty({ onlySelf: true }); 
      } else if (control instanceof FormGroup) { 
        this.validateAllFormFields(control); } }); 
  } 


}
