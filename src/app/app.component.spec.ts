import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
    RouterTestingModule
} from '@angular/router/testing';
import { TopMenuComponent } from './shared/components/topmenu/topmenu.component';
import { AuthService } from './shared/service/auth.service';

class MockAuthService {

}


describe('App Component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent, TopMenuComponent
            ],
            providers: [
                { provide: AuthService, useClass: MockAuthService }
            ],
            imports: [RouterTestingModule]
        }).compileComponents();
    }));
    it('should create an app component', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));    
});
