import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authUser : AngularFireAuth) { }

  signup(email:string, password:string){
    return this.authUser.auth.createUserWithEmailAndPassword(email,password);
  }

  signin(email:string, password:string){
    return this.authUser.auth.signInWithEmailAndPassword(email,password);
  }

  signout(){
    return this.authUser.auth.signOut();
  }

  isConnected(){
    return this.authUser.user;
  }
}
