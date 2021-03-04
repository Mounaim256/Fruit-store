import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @Output() paymentMethod = new EventEmitter();
  isOnline : boolean = false;
  constructor() { }

  ngOnInit() {
    console.log(this.isOnline)
  }

  offline(){
    this.isOnline = false;
    console.log(this.isOnline);
  }

  online(){
    this.isOnline = true;
    console.log(this.isOnline);
  }

  formSubmit(form : NgForm){
    let paymentMethod = form.value["online"] ? "online" : "offline";
    this.paymentMethod.emit(paymentMethod);
  }

}
