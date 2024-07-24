import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){}

  registerForm = this.fb.group({
    username:['',[Validators.required, Validators.pattern('[a-zA-Z{3,}]*')]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  register(){
    if(this.registerForm.valid){
      this.api.registerApi(this.registerForm.value).subscribe({
        next:(res:any)=>{
          console.log(res); 
          alert('Registration successful')
          this.router.navigateByUrl('/login')
        },
        error:(err:any)=>{
          alert(err.error)
          console.log(err);          
        }
      }) 
    }
  }
}
