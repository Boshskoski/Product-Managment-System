import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user-service/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'pm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  pageTitle:string = "Sign up form";
  signUpFormGroup:FormGroup;
  constructor(private fb:FormBuilder,
              private userService:UserService,
              private router:Router,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    this.signUpFormGroup = this.fb.group({
      userName:['' , Validators.required],
      password:['' , Validators.required]
    })
  }

  onSubmit()
  {
    let userNameValue = this.signUpFormGroup.get("userName").value;
    let passwordValue = this.signUpFormGroup.get("password").value;
    let newUserObject = {};
    newUserObject["userName"] = userNameValue;
    newUserObject["password"] = passwordValue;


    this.userService.getAllUsers()
    .subscribe(users => {
      let isThereSuchAUserName = users.find(user => user.userName == userNameValue);
      if(isThereSuchAUserName)
      {
        this.toastr.error('This username is already taken', 'Sign up failed.');
      }
      else
      {
        this.userService.registerUser(newUserObject)
        .subscribe(newUser => {
          this.toastr.success('You successfully signed up');
          this.router.navigate(["/login"])
        })
      }
    })
  }
}
