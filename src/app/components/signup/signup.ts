import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {
  

signUpForm!: FormGroup;
constructor(private fb:FormBuilder, private userService:UsersService, private router:Router,private toaster :ToastrService ) {
 
}

  ngOnInit(){

    this.signUpForm =this.fb.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      username:["",Validators.required],
      email:["",[Validators.required,Validators.email]],
      password:["",Validators.required],
    })
    
  }
  
  onSignUp(){
    if (this.signUpForm.valid)
      {
      console.log("this.signUpForm",this.signUpForm.value)
      // this.userService.getBackEndResponseSample().subscribe({
      //   next:(res)=>{console.log("ApiResponse",res)},
      //   error:(err)=>{console.log("error",err)}
      // })
      this.userService.onSignUp(this.signUpForm.value).subscribe({
        next:(res)=>{
          //alert(res.message);
          console.log("res msg", res)
          this.toaster.success(res.msg);
          this.signUpForm.reset();
          this.router.navigate(['login']);
        },
        error:(err)=>{
          //alert(err?.error?.message || 'Something went wrong!');
          this.toaster.error(err?.error.msg);
        }
      })
    }else{
       this.validateAllFormFields(this.signUpForm);
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
