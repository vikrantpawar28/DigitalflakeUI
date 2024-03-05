import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _fb:FormBuilder,private _authService:AuthService,private _router:Router){}

  registerForm:FormGroup = new FormGroup({})

  ngOnInit(): void {
    this.registerForm=this._fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }

  onSubmit(){
    if(this.registerForm.valid){
      this._authService.userRegister(this.registerForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          alert("registration sucessfully");
        },
        error:(error)=>{
          console.log(error.error)
        }
      })
    }
  }
  login(){
    this._router.navigate(['authentication'])
  }

}
