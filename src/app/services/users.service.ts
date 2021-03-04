import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Address } from '../interfaces/Address';
import { UserInfo } from '../interfaces/UserInfo';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private store : AngularFirestore,
              private authUser : AngularFireAuth) { }

  addUser(id:string, userInfo:UserInfo){
    return this.store.doc("users/"+id).set({userInfo});
  }

  getUser(id:string) : Observable<UserInfo>{
    return this.store.doc("users/"+id).valueChanges();
  }

  addUserInfo(id:string, userInfo:UserInfo){
    return this.store.collection(`users/${id}/userInfo`).add(userInfo);
  }

  addUserAddress(id:string, userAddress:Address){
    return this.store.collection(`users/${id}/userAddress`).add(userAddress);
  }

  ChangePassword(){
    
  }

}
