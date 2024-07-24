import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverUrl = 'https://globomart-server.onrender.com'

  wishlistCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)
  searchKey = new BehaviorSubject("")

  constructor(private http:HttpClient) { 
    this.getWishlistCount()
    this.getCartCount()
  }

   getAllProductApi(){
    return this.http.get(`${this.serverUrl}/all-products`)
   }

   registerApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/register`,reqBody)
   }

   loginApi(reqBody:any){
     return this.http.post(`${this.serverUrl}/login`,reqBody)
   }
   addHeaderToRequest(){
    let headers = new HttpHeaders()
    let token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append('Authorization',`Bearer ${token}`)
    }
    return {headers}
   }

   addWishlistApi(reqBody:any){
     return this.http.post(`${this.serverUrl}/add-wishlist`, reqBody, this.addHeaderToRequest())
   }

   getWishlistItemApi(){
    return this.http.get(`${this.serverUrl}/get-wishlistitem`,this.addHeaderToRequest())
   }

   //api to remove item from wishlist
   removeWishlistItemApi(id:any){
    return this.http.delete(`${this.serverUrl}/delete-wishlistItem/${id}`)
   }

   //api to view a product
   viewProductApi(id:any){
    return this.http.get(`${this.serverUrl}/view-product/${id}`)
   }

   getWishlistCount(){
    this.getWishlistItemApi().subscribe({
      next:(res:any)=>{
        this.wishlistCount.next(res.length)
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
   }

   //api to add product to cart
   addToCartApi(reqBody:any){
      return this.http.post(`${this.serverUrl}/add-cart`,reqBody,this.addHeaderToRequest())
   }

   //api to get all cart items
   getCartItemsApi(){
    return this.http.get(`${this.serverUrl}/get-cartItem`,this.addHeaderToRequest())
   }

   //api to remove item from cart
   removeItemfromCartApi(id:any){
    return this.http.delete(`${this.serverUrl}/remove-cartItem/${id}`)
   }

   //api to empty cart
   emptyCartapi(){
    return this.http.delete(`${this.serverUrl}/empty-cart`,this.addHeaderToRequest())
   }

   getCartCount(){
    this.getCartItemsApi().subscribe({
      next:(res:any)=>{
        this.cartCount.next(res.length)
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
   }

   //api to increment quantity
   incrementCarItem(id:any){
    return this.http.get(`${this.serverUrl}/cart/increment/${id}`)
   }

   decrementCartItem(id:any){
    return this.http.get(`${this.serverUrl}/cart/decrement/${id}`)
   }

   getSearchKey(value:any){
    this.searchKey.next(value)
   }

}
