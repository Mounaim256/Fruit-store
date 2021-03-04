import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Cart } from 'src/app/interfaces/Cart';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  @Input() cartData : Array<Cart> = [];
  subTotal : number;
  @Output() confirma = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
    console.log(this.cartData)
  }

  confirmation(){
    this.confirma.emit();
  }

}
