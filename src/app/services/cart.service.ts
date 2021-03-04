import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Goods } from '../interfaces/Goods';
import { Cart } from '../interfaces/Cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private store : AngularFirestore) { }

  addProdToCart(good:Goods, quantity:number){
    let existing :  Map<string,Cart>  = new Map<string,Cart>(JSON.parse(localStorage.getItem("cart")));
    if(existing == null) existing = new Map<string,Cart>();
    existing.set(good.id,{...good,quantity});
    localStorage.setItem("cart",JSON.stringify(Array.from(existing)));
  }

  getProdFromCart() : Promise<Map<string,Cart>>{
    return new Promise((resolve)=>{
      let existing :  Map<string,Cart> = new Map<string,Cart>(JSON.parse(localStorage.getItem("cart")));
      if(existing !== null) return resolve(existing);
      else return resolve(new Map<string,Cart>());
    });
  }

  deleteProdFromCart(goodId : string){
    let existing :  Map<string,Cart>  = new Map<string,Cart>(JSON.parse(localStorage.getItem("cart")));
    if(existing == null) existing = new Map<string,Cart>();
    existing.delete(goodId);
    localStorage.setItem("cart",JSON.stringify(Array.from(existing)));
  }

  updateProdFromCart(cart : Cart){
    let existing :  Map<string,Cart>  = new Map<string,Cart>(JSON.parse(localStorage.getItem("cart")));
    if(existing == null) existing = new Map<string,Cart>();
    existing.set(cart.id,cart);
    localStorage.setItem("cart",JSON.stringify(Array.from(existing)));
  }

  getNbOfGoodInCart(): Observable<number>{
    return new Observable(observer => {
      let existing :  Map<string,Cart> = new Map<string,Cart>(JSON.parse(localStorage.getItem("cart")));
      let nbOfGoodsInCart : number = 0;
      if(existing !== null) {
        for(let data of existing.values()){
          nbOfGoodsInCart += 1;
        }
        observer.next(nbOfGoodsInCart);
      }
      else observer.next(nbOfGoodsInCart);
});

}
clearCart(){
localStorage.removeItem("cart");
}
    


}


/**
 * 
 * return new Promise((resolve)=>{
      let existing :  Map<string,Cart> = new Map<string,Cart>(JSON.parse(localStorage.getItem("cart")));
      let nbOfGoodsInCart : number = 0;
      if(existing !== null) {
        for(let data of existing.values()){
          nbOfGoodsInCart += 1;
        }
        return resolve(nbOfGoodsInCart)
      }
      else return resolve(nbOfGoodsInCart);
    });
 */