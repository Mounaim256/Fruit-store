import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { GoodsService } from 'src/app/services/goods.service';
import { Cart } from 'src/app/interfaces/Cart';
import { map, filter, switchMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartData : Array<Cart> = [];
  subTotal : number;
  livration : number = 0.0;

  constructor(private auth : AuthService,
              private cart : CartService,
              private good : GoodsService,
              private router : Router) { }

  ngOnInit() {
    this.getCart();
  }

  getCart(){
    this.cart.getProdFromCart().then(data => { this.cartData =  Array.from(data.values()) ; this.getSubTotal();});
  }

  updateGoodFromCart(cart : Cart){
    this.cart.updateProdFromCart(cart);
  }


  deleteGoodFromCart(goodId : string){
    this.cart.deleteProdFromCart(goodId);
    this.getCart();
  }

  increaseQuantity(index : number){
    this.cartData[index].quantity+=1;
    this.getSubTotal();
  }

  decreaseQuantity(index : number){
    if(this.cartData[index].quantity > 1)  {
      this.cartData[index].quantity-=1;
      this.getSubTotal();
    };
  }

  getSubTotal(){
    this.subTotal = 0.0;
    for(let data of this.cartData){
      this.subTotal += data.price * data.quantity
    }
  }

  /**
   increaseQuantity(index : number){
    this.quantity+=1;
    if(this.quantity >  1) this.opacity = 1;
    this.totalPrice = this.good.price * this.quantity;
  }

  decreaseQuantity(index : number){
    if(this.quantity > 1) {
      this.quantity-=1;
      this.totalPrice = this.good.price * this.quantity;
    }
    if(this.quantity ===  1) this.opacity = 0.5;
  }
   */
}


/*
const observablesList = [];

apps.forEach(app => {
  observablesList.push(this.appTypeService.getPhoto(app.Id));
})

forkJoin(observablesList).subscribe(response => {
  console.log(response);
  // handle the rest
});
*/


/*
.subscribe(userInf =>{
      if(userInf){
        this.cart.getProdFromCart(userInf.uid).subscribe(data =>{ this.cartData = data;console.log(this.cartData )
        this.cartData.forEach(elem => { this.good.getGood(elem.goodId).subscribe( dt =>{ this.goodData.push(dt); console.log(dt)} ) });
      });
        
      }
      else{
        this.router.navigate(['/login']);
      }
    })

    this.appParameters.pipe(
  map(params => params['id']),
  filter(id => id),
  switchMap(id => this.getUser(id))
)
.subscribe(user => this.user = user);


initialize() {
  this.appParameters.map(params => params['id'])
    .switchMap(id => id ? this.getUser(id) : Observable.empty())
    .subscribe(user => this.user = user);
}
*/

/*
  async getGoods(){
    const observablesList = [];
    await this.cartData.forEach(cartInfo => { observablesList.push(this.good.getGood(cartInfo.goodId)) });
    forkJoin(observablesList).subscribe(result => console.log(result));
  }
*/