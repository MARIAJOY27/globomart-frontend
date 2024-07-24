import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  allProduct:any = []
  token:any = ""
  searchKey:any=""

  constructor(private api:ApiService){ }

  ngOnInit(): void {
    this.api.getAllProductApi().subscribe({
      next:(res:any)=>{
        console.log(res);   
        this.allProduct = res   
      },
      error:(err:any)=>{
        console.log(err);        
      }
    })
    this.token = sessionStorage.getItem("token")
    this.api.searchKey.subscribe((res:any)=>{
      this.searchKey=res
      console.log(this.searchKey);
      
    })
  }

  addWishlistItem(item:any){
    if(!this.token){
      alert('Please Login')
    }
    else{
      this.api.addWishlistApi(item).subscribe({
        next:(res:any)=>{
          console.log(res);  
          alert('Product added to Wishlist')
          this.api.getWishlistCount()
        },
        error:(err:any)=>{
          alert('Something went wrong')
          console.log(err);        
        }
      })
    } 
  }

  addCartItem(item:any){
    if(this.token){
      Object.assign(item,{quantity:1})
      this.api.addToCartApi(item).subscribe({
        next:(res:any)=>{
          console.log(res);  
          alert('Product added to Cart')
          this.api.getCartCount()
        },
        error:(err:any)=>{
          alert(err.error)
          console.log(err);        
        }
      })
      
    }
    else{
      alert('Please Login')
    }
  }
  
}
