import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Cart } from 'src/app/interfaces/Cart';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/Order';
import { UserInfo } from 'src/app/interfaces/UserInfo';
import { Address } from 'src/app/interfaces/Address';
import { UsersService } from 'src/app/services/users.service';
import { OrderService } from 'src/app/services/order.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutStep : any[] = [
                          {name : "person details",isValid : false},
                          {name : "payment",isValid : false},
                          {name : "confirmation",isValid : false}
                          ];
  step : number = 1;
  order : any[] = [];
  cartData : Array<Cart> = [];
  subTotal : number;
  livration : number = 0.0;
  constructor(private auth : AuthService,
              private cart : CartService,
              private router : Router,
              private user : UsersService,
              private orderService : OrderService) { }

  ngOnInit() {
    this.getCart();
  }

  validInfo(info){
    this.checkoutStep[this.step -1].isValid = true;
    this.order[this.step -1] = info;
    this.step += 1;
  }

  getCart(){
    this.cart.getProdFromCart()
             .then(
               data => {
                 this.cartData = Array.from(data.values());
                 this.getSubTotal();
              });
  }

  getSubTotal(){
    this.subTotal = 0.0;
    for(let data of this.cartData.values()){
      this.subTotal += data.price * data.quantity
    }
  }

  orderNow(){
  let order : Order = {
    goodsUrlImg: this.cartData.map((data)=> data.imgUrl),
    dataOrder : formatDate(new Date(), 'dd/MM/yyyy', 'en-US'),
    stateOfOrder : "New",
    totalPrice : this.subTotal,
    paymentMethod : this.order[1]
  };

  let userInfo : UserInfo = {
    ...this.order[0].userInfo
  }

  let userAddress : Address = {
    ...this.order[0].userAddress
  }

  this.auth.isConnected().subscribe(data => {
    if(data.uid !== null){
      this.user.addUserInfo(data.uid,userInfo).then(()=>{
        this.user.addUserAddress(data.uid,userAddress).then(()=>{
          this.orderService.addOrder(data.uid,order).then(()=>{
            console.log("order is saved");
          });
        });
      });
    this.cart.clearCart();
    }
  });

    this.router.navigate(['/']);
  }
//userAddress
}
