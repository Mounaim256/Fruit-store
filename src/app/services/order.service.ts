import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from '../interfaces/Order';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private store : AngularFirestore) { }

  addOrder(userId : string,order : Order){
    return this.store.collection(`users/${userId}/order`).add({
     ...order,
     userId
    });
  }


  getOrder(userId : string){
    return this.store.collection(`users/${userId}/order`)
                     .snapshotChanges().pipe(
                      map(actions => actions.map(a => {
                        return { 
                          orderId : a.payload.doc.id,
                          ...a.payload.doc.data() as Order
                        };
                      }))
                     );
  }

}
