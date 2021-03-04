import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { UserInfo } from 'src/app/interfaces/UserInfo';
import { map, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{

  userInfo : UserInfo = {};
  formContent : FormGroup ;
  constructor(private authService : AuthService,
              private userService : UsersService,
              private formBuilder : FormBuilder) { 
                this.formContent = this.formBuilder.group({
                  firstName:['',Validators.required],
                  lastName:['',Validators.required],
                  email:['',Validators.compose([Validators.required,Validators.email])],
                  mobile:['',Validators.required]
                });
                 
              }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo(){
    this.authService.isConnected()
                    .pipe(map(data => data.uid),switchMap((id)=>this.userService.getUser(id)))
                    .subscribe((dataUser => {
                      this.userInfo = dataUser['userInfo'];
                      this.formContent.controls['firstName'].setValue(this.userInfo.firstName);
                      this.formContent.controls['lastName'].setValue(this.userInfo.lastName);
                      this.formContent.controls['email'].setValue(this.userInfo.email);
                      this.formContent.controls['mobile'].setValue(this.userInfo.tel);
                    }));
  }

}
