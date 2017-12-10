import { TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/service/auth.service';
import { User } from '../../../shared/model/user.model';
import { routing } from '../../../app.routing'
import { LoginComponent } from './login.component';
import { PageNotFoundComponent } from '../pagenotfound/pagenotfound.component';

class MockTodoService {
}

class MockAuthService {
    currentUser: User;
    isLoggedIn: boolean = false;
    token: any;
    login(id: string, password: string) {
        this.currentUser = new User();
        if (id === 'abhishek' && password === 'sahil') {
            this.currentUser.firstName = 'Abhishek';
            this.currentUser.isAunthenticate = true;
        } else {
            this.currentUser.isAunthenticate = false;
        }
        return Observable.of(this.currentUser);
    }

    setUserDetails(currentUser: User) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}


describe('Login Component', () => {
    let app: LoginComponent;
    let fixture: any;
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                LoginComponent, PageNotFoundComponent
            ],
            providers: [
                { provide: AuthService, useClass: MockAuthService }
            ],
            imports: [RouterTestingModule, FormsModule, routing]
        }).compileComponents().then(() => {
            let fixture = TestBed.createComponent(LoginComponent);
            app = fixture.componentInstance;

        });;
    }));
    it('should create a login component', async(() => {
        fixture = TestBed.createComponent(LoginComponent);
        let tempapp = fixture.debugElement.componentInstance;

        expect(tempapp).toBeTruthy();
    }));

    it('user should login', async(() => {
        app.id = 'abhishek';
        app.password = 'sahil';
        app.login();
        expect(app.authService.isLoggedIn).toBe(true);
    }));
});

