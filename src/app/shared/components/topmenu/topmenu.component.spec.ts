import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import {
    RouterTestingModule
} from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/service/auth.service';
import { User } from '../../../shared/model/user.model';
import { routing } from '../../../app.routing'
import { TopMenuComponent } from './topmenu.component';
import { LoginComponent } from '../../../common/components/login/login.component';
import { PageNotFoundComponent } from '../../../common/components/pagenotfound/pagenotfound.component';

class MockTodoLocalStorageService {

}

class MockTodoService {
}

class MockAuthService {
    currentUser: User;
    isLoggedIn: boolean = false;
    token: any;  

    logout(): Observable<boolean> {
        this.token = null;
        this.isLoggedIn = false;
        this.currentUser = undefined;
        localStorage.removeItem('currentUser');
        return Observable.of(true).delay(1000).do(val => this.isLoggedIn = false);
    }
}


describe('Top Menu Component', () => {
    let app: TopMenuComponent;
    let fixture: any;
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                TopMenuComponent, LoginComponent, PageNotFoundComponent
            ],
            providers: [
                { provide: AuthService, useClass: MockAuthService }
            ],
            imports: [RouterTestingModule, FormsModule, routing]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TopMenuComponent);
            app = fixture.componentInstance;

        });;;
    }));
    it('should create a top menu  component', async(() => {
        let tempapp = fixture.debugElement.componentInstance;
        expect(tempapp).toBeTruthy();
    }));

    it('user should logout', async(() => {
        app.logout();
        expect(app.authService.isLoggedIn).toBe(false);
    }));

});
