import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  allProduct:any=[]
  total:number= 0

  constructor(private api:ApiService, private router:Router){}

  ngOnInit(): void {
    this.getAllCartItem()
  }

  getAllCartItem(){
    this.api.getCartItemsApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allProduct=res
        this.getTotal()       
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  removeCartItem(id:any){
    this.api.removeItemfromCartApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert(res)
        this.getAllCartItem()
        this.api.getCartCount()
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  emptyCartItem(){
    this.api.emptyCartapi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getAllCartItem()
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err);
       
      }
    })
  }

  incrementItem(id:any){
    this.api.incrementCarItem(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getAllCartItem()
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  decrementItem(id:any){
    this.api.decrementCartItem(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getAllCartItem()
        this.api.getCartCount()
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  getTotal(){
    this.total=Math.ceil(this.allProduct.map((item:any)=>item.grandTotal).reduce((n1:any,n2:any)=>n1+n2))
  }

  chechOut(){
    sessionStorage.setItem("total",JSON.stringify(this.total))
    this.router.navigateByUrl('/checkout')
  }

}
