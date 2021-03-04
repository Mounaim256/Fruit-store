import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMsg : string = '';

  constructor(private auto : AuthService,
              private router : Router) { }

  ngOnInit() {
  }

  signIn(f:NgForm){
    let data = f.value;
    this.auto.signin(data.email,data.password)
             .then((result) =>{
              this.errorMsg= '';
              this.router.navigate(["/"]); })
             .catch((error) =>{this.errorMsg = error.message});
  }

}
