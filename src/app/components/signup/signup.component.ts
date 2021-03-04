import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User} from '../../interfaces/User';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/interfaces/UserInfo';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  data : User;
  errorMsg : string = '';
  constructor(private authService : AuthService,
              private userService : UsersService,
              private router : Router) { }

  ngOnInit() {
  }

  formSubmit(form : NgForm){
    this.data = form.value;
    
    let userInfo : UserInfo = {
      firstName : this.data.firstName,
      lastName : this.data.lastName,
      email : this.data.email,
      tel : this.data.mobile
    }

    this.authService.signup(this.data.email,this.data.password)
                    .then( data =>{ 
                                    this.userService.addUser(data.user.uid,userInfo)
                                                    .then(() => { this.router.navigate(["/"]) })
                                                    .catch(error =>{ console.log("added",error) });
                                  })
                    .catch(error =>{ this.errorMsg = error.message } );
 }

}
