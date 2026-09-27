import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {
  

signUpForm!: FormGroup;
constructor(private fb:FormBuilder) {
 
}

  ngOnInit(){

    this.signUpForm =this.fb.group({
      fullName:["",Validators.required],
      email:["",[Validators.required,Validators.email]],
      password:["",Validators.required],
      confirmPassword:["", Validators.required]
    })
    
  }
  
  onSignUp(){
    if (this.signUpForm.valid){
      console.log("this.signUpForm",this.signUpForm.value)
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
