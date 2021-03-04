import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { map, switchMap, filter, startWith } from 'rxjs/operators';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild("nav",{static:true}) navbar : ElementRef;
  fixedNow : boolean = false;
  isShow : boolean = false;
  isConnected : boolean = true;
  nbOfGoodsInCart : Observable<number>;
  userId : string  = "";
  isOpen : boolean = false;
  constructor( private auth : AuthService,
               private cart : CartService) { }

  ngOnInit() {
    this.fixedNavbarWhenScroll();
    this.auth.isConnected()
             .subscribe((userInf) => {
               if(userInf) {this.isConnected = true;this.userId = userInf.uid;}
               else {this.isConnected = false;this.userId = "";}
             });
    this.getNbOfGoodInCart();
  }

  show(){
    this.isShow = !this.isShow;
  }

  fixedNavbarWhenScroll(){
    window.addEventListener("scroll",()=>{
      if(window.scrollY >= this.navbar.nativeElement.clientHeight){
        this.fixedNow = true;
      }
      if(!window.scrollY){
        this.fixedNow = false;
      }
    });
  }

  logout(){
    this.auth.signout().then(()=>{console.log("lougout")})
  }

  getNbOfGoodInCart(){
    this.nbOfGoodsInCart = interval(1000).pipe(startWith(0),switchMap(()=> this.cart.getNbOfGoodInCart()));
    //this.nbOfGoodsInCart = this.cart.getNbOfGoodInCart();
  }

  openDropDownMenu(){
    this.isOpen = !this.isOpen;
  }

}
