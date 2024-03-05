import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { ForgotdialogComponent } from '../forgotdialog/forgotdialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private dialog: MatDialog,private _authService:AuthService,private _fb:FormBuilder,private _router:Router) {}
  openForgotPasswordDialog(): void {
    const dialogRef = this.dialog.open(ForgotdialogComponent, {
      width: '250px',
      closeOnNavigation: true, // Close the dialog when navigating away from current route
      disableClose: true 
      /* Add any other dialog configuration options */
    });
  }

  loginForm:FormGroup = new FormGroup({})

  ngOnInit(): void {
    this.loginForm=this._fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      this._authService.userLogin(this.loginForm.value).subscribe({
        next:(response)=>{
          localStorage.setItem('Token',response.token)
          this._router.navigate(['dashboard']);
          alert("login sucessfully");
        },
        error:(error)=>{
          console.log(error.error)
        }
      })
    }
  }
  register(){
    this._router.navigate(['registration'])
  }

}
