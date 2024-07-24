import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  allWishlistProducts:any = []

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getWishlistProducts() 
  }

  getWishlistProducts(){
    this.api.getWishlistItemApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allWishlistProducts = res        
      },
      error:(err:any)=>{
        console.log(err);     
      }
    })
  }

  removeItem(id:any){
    this.api.removeWishlistItemApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);  
        this.getWishlistProducts()    
        this.api.getWishlistCount()  
      },
      error:(err:any)=>{
        console.log(err);     
      }
    })
  }

  addToCart(item:any){
    Object.assign(item,{quantity:1})
    this.api.addToCartApi(item).subscribe({
      next:(res:any)=>{
        console.log(res);  
        alert('Product added to Cart')
        this.removeItem(item._id)
        this.api.getCartCount()
      },
      error:(err:any)=>{
        alert(err.error)
        console.log(err);  
        if(err.error == 'Product already in your cart'){
          alert('Product added successfully')
          this.removeItem(item._id)
        }  
        else{
          alert(err.error)
        }    
      }
    })
  }


}
