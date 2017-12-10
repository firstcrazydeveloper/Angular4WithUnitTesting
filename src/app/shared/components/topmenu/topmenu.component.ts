import { Component, ViewContainerRef } from '@angular/core';
import { Router, NavigationExtras, UrlSegment, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/service/auth.service';
import { User } from '../../../shared/model/user.model';

@Component({
    selector: 'top-menu',
    templateUrl: `./topmenu.component.html`,
    styleUrls: ['./topmenu.component.min.css']
})
export class TopMenuComponent {
    userName: string = 'Guest';
    currentModule: string = 'speechDashboard';
    navigationExtras: NavigationExtras = {
        preserveQueryParams: true,
        preserveFragment: true
    };

    constructor(private route: ActivatedRoute, public router: Router, public authService: AuthService) {

    }

    logout() {
        this.authService.logout().subscribe(() => {
            this.router.navigate(['login'], this.navigationExtras);
        });
    }

    redirect(url: string) {
        this.currentModule = url;
        this.router.navigate([url], this.navigationExtras);

    }
}