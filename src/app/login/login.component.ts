import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){}

  loginForm = this.fb.group({
    email:["",[Validators.required, Validators.email]],
    password:["",[Validators.required]]
  })

  login(){
    if(this.loginForm.valid){
      this.api.loginApi(this.loginForm.value).subscribe({
        next:(res:any)=>{
          console.log(res); 
          sessionStorage.setItem("existingUser",JSON.stringify(res.existingUser))
          sessionStorage.setItem("token",res.token)
          alert('Login successful')
          this.api.getWishlistCount()
          this.router.navigateByUrl('/')
        },
        error:(err:any)=>{
          alert(err.error)
          console.log(err);          
        }
      })
    }
  }
}
