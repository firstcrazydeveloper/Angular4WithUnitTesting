import { Component, ViewContainerRef } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../../shared/service/auth.service';
import { User } from '../../../shared/model/user.model';

@Component({
    selector: 'login-page',
    templateUrl: `./login.component.html`,
    styleUrls: ['./login.component.min.css']
})
export class LoginComponent {
    id: string;
    password: string;
    user: User = new User();
    error: string = '';

    constructor(public router: Router, public authService: AuthService) {
        this.error = '';
    }

    login() {
        this.error = '';
        this.authService.login(this.id, this.password).subscribe((user: User) => {
            if (user.isAunthenticate) {
                this.authService.isLoggedIn = true;
                this.authService.currentUser = user;
                this.authService.setUserDetails(user);
                this.authService.token = user.token;
                this.authService.userName = user.firstName;
                let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'todo';
                let navigationExtras: NavigationExtras = {
                    preserveQueryParams: true,
                    preserveFragment: true
                };
                this.router.navigate(['todo'], navigationExtras);

            }
            else {
                this.error = 'UserId and Password are not correct!';

            }

        },
            err => {
                this.error = 'We are getting error to connect with server! Try again';

            });


    }
}