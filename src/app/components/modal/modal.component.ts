import { Component, OnInit, Input } from '@angular/core';
import { Goods } from 'src/app/interfaces/Goods';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() good : Goods;
  display : string ='block';
  quantity : number = 1;
  opacity : number = 0.5;
  totalPrice : number;

  constructor(private auth : AuthService,
              private router : Router,
              private cart : CartService) { }

  ngOnInit() {
    this.totalPrice = this.good.price;
  }

   onCloseHandled(){
      this.display='none';
  }

  increaseQuantity(){
    this.quantity+=1;
    if(this.quantity >  1) this.opacity = 1;
    this.totalPrice = this.good.price * this.quantity;
  }

  decreaseQuantity(){
    if(this.quantity > 1) {
      this.quantity-=1;
      this.totalPrice = this.good.price * this.quantity;
    }
    if(this.quantity ===  1) this.opacity = 0.5;
  }

  addProduct(){
    console.log(this.good);
    this.cart.addProdToCart(this.good,this.quantity);
    this.display = "none";
  }

}
