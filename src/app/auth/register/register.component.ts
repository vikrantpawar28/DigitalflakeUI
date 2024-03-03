import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _fb:FormBuilder,private _authService:AuthService){}

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
          console.log(response)
        },
        error:(error)=>{
          console.log(error.error)
        }
      })
    }
  }

}
