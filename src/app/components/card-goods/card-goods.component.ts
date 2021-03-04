import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Goods } from 'src/app/interfaces/Goods';


@Component({
  selector: 'app-card-goods',
  templateUrl: './card-goods.component.html',
  styleUrls: ['./card-goods.component.css']
})
export class CardGoodsComponent implements OnInit{

  @Input() goodParm : Goods;
  @Output() addGood  =  new EventEmitter();
  constructor() { }
  
  ngOnInit() {

  }

  addToCart(good : Goods){
    this.addGood.emit(good)  
  }


}
