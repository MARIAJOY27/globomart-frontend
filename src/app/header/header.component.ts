import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  wishCount:number = 0
  cartCount:number = 0
  username:string = ""

  constructor(private api:ApiService,private router:Router){}

  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      const existingUser = JSON.parse(sessionStorage.getItem("existingUser") as string)
      this.username = existingUser.username
      
      this.api.wishlistCount.subscribe((res:any)=>{
        this.wishCount = res
      })

      this.api.cartCount.subscribe((res:any)=>{
        this.cartCount = res
      })
    }
  }


  getSearch(value:any){
    this.api.getSearchKey(value)
  }

  logout(){
    this.username=""
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("total")
    sessionStorage.removeItem("existingUser")
    this.router.navigateByUrl('/')
  }

  
}
