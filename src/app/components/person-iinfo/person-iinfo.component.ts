import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserInfo } from 'src/app/interfaces/UserInfo';
import { Address } from 'src/app/interfaces/Address';

@Component({
  selector: 'app-person-iinfo',
  templateUrl: './person-iinfo.component.html',
  styleUrls: ['./person-iinfo.component.css']
})
export class PersonIinfoComponent implements OnInit {

  @Output() personInfo = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  submitForm(form : NgForm){
    let userInfo : UserInfo = {
      firstName : form.value["firstName"],
      lastName : form.value["lastName"],
      email : form.value["email"],
      tel : form.value["tel"]
    };

    let userAddress : Address = {
      street : form.value["street"],
      city : form.value["city"],
      area : form.value["area"],
      coodZip : form.value["coodZip"]
    };

    this.personInfo.emit({userInfo : userInfo,userAddress : userAddress});
  }

}
