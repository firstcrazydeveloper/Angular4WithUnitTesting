﻿import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { User } from '../model/user.model';
import { WebApiManager } from './webApiManager.service';
import { AppSettings } from '../../appSettings.setting';

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;
    token: string;
    userData: Observable<any> = null;
    currentUser: User;
    redirectUrl: string;
    userName: string = 'Guest';

    //TODO -- remove this Test Data Section after Web API implementation
    // Start TestData Section  
    // testUserData: Array<User> = [{ id: 1, userid: 'abhishek', password: 'sahil', email: 'abhishek.job@hotmail.com' },
    // { id: 2, userid: 'josh', password: 'rosman', email: 'sample@hotmail.com' }];

    // End TestData Section  

    constructor(public webApiService: WebApiManager) { }


    // TODO -- uncomment this code after Web API implementation
    // public static loginUrl = AppSettings.BaseAPIUrl + 'login';

    

    login(id: string, password: string) {
        //TODO: Need to implement Actual login logic
        // return Observable.of(true).delay(1000).do(val => this.verifuser(id, password));

        let param = {
            userId: id,
            password: password
        }

        // dummy data for testing
        if (id === 'abhishek' && password === 'sahil') {
            this.currentUser = new User();
            this.currentUser.firstName = 'Abhishek';
            this.currentUser.lastName = 'Sahil';
            this.currentUser.isAunthenticate = true;
            this.currentUser.password = 'sahil';
            this.userName = 'abhishek';
        } else {
            this.currentUser = new User();
            this.currentUser.isAunthenticate = false;
        }


        return Observable.of(this.currentUser);
        // uncomment this code for Web API call
        // this.userData = this.webApiService.post(AuthService.loginUrl, param, undefined);
        // return this.userData;
    }

    setUserDetails(currentUser: User) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }


    logout(): Observable<boolean> {

        this.token = null;
        this.isLoggedIn = false;
        this.currentUser = undefined;
        this.userName = 'Guest';
        localStorage.removeItem('currentUser');
        return Observable.of(true).delay(1000).do(val => this.isLoggedIn = false);
    }
}
