import { Injectable } from '@angular/core';
import { Goods } from '../interfaces/Goods';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  
  constructor(private firestore : AngularFirestore) { }

  goodsList : Array<Goods> = [
    {name : "apple" , price : 30.00 , imgUrl : "/assets/img/goods/apples.jpg"},
    {name : "apricot" , price : 30.00 , imgUrl : "/assets/img/goods/apricots.jpg"},
    {name : "avocado" , price : 30.00 , imgUrl : "/assets/img/goods/avocados.jpg"},
    {name : "banana" , price : 30.00 , imgUrl : "/assets/img/goods/bananas.jpg"},
    {name : "cherry" , price : 30.00 , imgUrl : "/assets/img/goods/cherrys.jpg"},
    {name : "fig" , price : 30.00 , imgUrl : "/assets/img/goods/figs.jpg"},
    {name : "kiwi" , price : 30.00 , imgUrl : "/assets/img/goods/kiwis.jpg"},
    {name : "lemon" , price : 30.00 , imgUrl : "/assets/img/goods/lime.jpg"},
    {name : "nectarine" , price : 30.00 , imgUrl : "/assets/img/goods/nectarines.jpg"},
    {name : "papaya" , price : 30.00 , imgUrl : "/assets/img/goods/papayas.jpg"},
    {name : "peach" , price : 30.00 , imgUrl : "/assets/img/goods/peachs.jpg"},
    {name : "pear" , price : 30.00 , imgUrl : "/assets/img/goods/pears.jpg"},
    {name : "persimmon" , price : 30.00 , imgUrl : "/assets/img/goods/persimmons.jpg"},
    {name : "pineapple" , price : 30.00 , imgUrl : "/assets/img/goods/pineapples.jpg"},
    {name : "plum" , price : 30.00 , imgUrl : "/assets/img/goods/plums.jpg"},
    {name : "pomegranate" , price : 30.00 , imgUrl : "/assets/img/goods/pomegranates.jpg"},
    {name : "raspberry" , price : 30.00 , imgUrl : "/assets/img/goods/raspberrys.jpg"},
    {name : "strawberrie" , price : 30.00 , imgUrl : "/assets/img/goods/strawberries.jpg"},
    {name : "tangerine" , price : 30.00 , imgUrl : "/assets/img/goods/tangerines.jpg"}
  ];

  getAllGoods(){
    return this.firestore.collection('goods').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        return { 
          id : a.payload.doc.id,
          ...a.payload.doc.data() as Goods
        };
      }))
    );
  }

  getGood(goodId : string){
    return this.firestore.doc<Goods>(`goods/${goodId}`).valueChanges();
  }
}

