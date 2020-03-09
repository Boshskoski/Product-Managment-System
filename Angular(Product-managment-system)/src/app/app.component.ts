import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { slideInAnimation } from './app.animation';
import { MessageService } from './services/message-service/message.service';
import { UserService } from './services/user-service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Product Management System';
  loading = true;
  // isLoggedIn:boolean;

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  get userName(): string {
    if (this.userService.currentLoggedInUser) {
      return this.userService.currentLoggedInUser.userName;
    }
    return '';
  }

  constructor(private router: Router,
              private messageService: MessageService,
              private userService:UserService,
              private toastr:ToastrService) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }


  displayMessages(): void {
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.messageService.isDisplayed = false;
  }

  logOut(): void {
    this.userService.isLoggedIn = false;
    this.messageService.addMessage(`User: ${this.userService.currentLoggedInUser.userName} logged out`);
    this.toastr.error("You successfully logged out");
    this.router.navigateByUrl('/welcome');
  }
}
