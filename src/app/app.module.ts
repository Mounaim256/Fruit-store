import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SignupComponent } from './components/signup/signup.component';
import { CartComponent } from './components/cart/cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { CopyRightComponent } from './components/copy-right/copy-right.component';
import { SliderComponent } from './components/slider/slider.component';
import { CardGoodsComponent } from './components/card-goods/card-goods.component';


import { AngularFireModule} from '@angular/fire';
import {environment } from '../environments/environment';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ModalComponent } from './components/modal/modal.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PersonIinfoComponent } from './components/person-iinfo/person-iinfo.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { OrderComponent } from './components/order/order.component';
import { AccountComponent } from './components/account/account.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    SignupComponent,
    CartComponent,
    NavbarComponent,
    NotFoundComponent,
    FooterComponent,
    CopyRightComponent,
    SliderComponent,
    CardGoodsComponent,
    ModalComponent,
    CheckoutComponent,
    PersonIinfoComponent,
    PaymentComponent,
    ConfirmationComponent,
    OrderComponent,
    AccountComponent,
    CustomerComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp( environment.firebaseConfig),
    FormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents : [ModalComponent]
})
export class AppModule { }
