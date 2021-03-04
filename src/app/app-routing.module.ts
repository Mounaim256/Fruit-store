import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component'
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SignupComponent } from './components/signup/signup.component';
import { CartComponent } from './components/cart/cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AccountComponent } from './components/account/account.component';
import { OrderComponent } from './components/order/order.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'login', component : LoginComponent},
  {path : 'logout', component : LogoutComponent},
  {path : 'signup', component : SignupComponent},
  {path : 'cart',children : [
    {path : '', component : CartComponent},
    {path : 'checkout', component : CheckoutComponent, canActivate : [ AuthGuardService]}
  ]},
  {path : 'customer', component : CustomerComponent, children : [
    {path : '', redirectTo: '/customer/account', pathMatch: 'full'},
    {path : 'account', component : AccountComponent},
    {path : 'change-password', component : ChangePasswordComponent}
  ] ,canActivate : [AuthGuardService]},
  {path : 'order', component : OrderComponent, canActivate : [AuthGuardService]},
  {path : '**', component : NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
