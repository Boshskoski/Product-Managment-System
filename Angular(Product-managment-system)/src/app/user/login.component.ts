import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service/user.service';
import { IUser } from '../models/IUser';
import { MessageService } from '../services/message-service/message.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorMessage: string;
  pageTitle = 'Log In';
  allUsers: IUser[];

  constructor(private router: Router,
    private userService: UserService,
    private messageService:MessageService,
    private toastr:ToastrService) { }

  login(loginForm: NgForm) 
  {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.userService.getAllUsers()
      .subscribe(users => {
        this.allUsers = users;
        let findUserInfo = this.allUsers.filter(user => user.userName == userName && user.password == password)[0];
        this.userService.currentLoggedInUser = findUserInfo;
        
        if(findUserInfo)
        {
          this.toastr.success('You successfully logged in');
          this.router.navigate(['/products']);
          this.userService.isLoggedIn = true;
          this.messageService.addMessage(`User: ${findUserInfo.userName} logged in`);
        }
        else
        {
          this.toastr.error("You username or password are wrong");
          this.router.navigate(["login"])
        }
      })
    }
  }

}
