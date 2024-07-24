import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit{

  product:any = {}


  constructor(private api:ApiService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe((res)=>{
      const {id}= res
      this.viewProduct(id)
    })
  }

  viewProduct(id:any){
    this.api.viewProductApi(id).subscribe({
      next:(res:any)=>{
        //console.log(res);
        this.product = res
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  addToWishlist(reqBody:any){
    this.api.addWishlistApi(reqBody).subscribe({
      next:(res:any)=>{
       console.log(res);   
       alert('Product added to wishlist')    
      },
      error:(err:any)=>{
        alert('Something went wrong')
        console.log(err);   
      }
    })
  }

  addTocart(reqBody:any){
    Object.assign(reqBody,{quantity:1})
    this.api.addToCartApi(reqBody).subscribe({
      next:(res:any)=>{
       console.log(res);   
       alert('Product added to cart')    
       this.api.getCartCount()
      },
      error:(err:any)=>{
        alert(err.error)
        console.log(err);   
      }
    })
  }


}
