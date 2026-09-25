import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  loginForm!:FormGroup;
  constructor( private fb:FormBuilder){

  }

ngOnInit():void{
  this.loginForm = this.fb.group({
    username: ["",Validators.required],
    password: ["", Validators.required]
  });

}

}
