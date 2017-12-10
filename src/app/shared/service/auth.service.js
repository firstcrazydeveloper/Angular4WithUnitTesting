"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
require("rxjs/add/operator/do");
require("rxjs/add/operator/delay");
var user_model_1 = require("../model/user.model");
var webApiManager_service_1 = require("./webApiManager.service");
var AuthService = (function () {
    //TODO -- remove this Test Data Section after Web API implementation
    // Start TestData Section  
    // testUserData: Array<User> = [{ id: 1, userid: 'abhishek', password: 'sahil', email: 'abhishek.job@hotmail.com' },
    // { id: 2, userid: 'josh', password: 'rosman', email: 'sample@hotmail.com' }];
    // End TestData Section  
    function AuthService(webApiService) {
        this.webApiService = webApiService;
        this.isLoggedIn = false;
        this.userData = null;
        this.userName = 'Guest';
    }
    // TODO -- uncomment this code after Web API implementation
    // public static loginUrl = AppSettings.BaseAPIUrl + 'login';
    AuthService.prototype.login = function (id, password) {
        //TODO: Need to implement Actual login logic
        // return Observable.of(true).delay(1000).do(val => this.verifuser(id, password));
        var param = {
            userId: id,
            password: password
        };
        // dummy data for testing
        if (id === 'abhishek' && password === 'sahil') {
            this.currentUser = new user_model_1.User();
            this.currentUser.firstName = 'Abhishek';
            this.currentUser.lastName = 'Sahil';
            this.currentUser.isAunthenticate = true;
            this.currentUser.password = 'sahil';
            this.userName = 'abhishek';
        }
        else {
            this.currentUser = new user_model_1.User();
            this.currentUser.isAunthenticate = false;
        }
        return Observable_1.Observable.of(this.currentUser);
        // uncomment this code for Web API call
        // this.userData = this.webApiService.post(AuthService.loginUrl, param, undefined);
        // return this.userData;
    };
    AuthService.prototype.setUserDetails = function (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        this.token = null;
        this.isLoggedIn = false;
        this.currentUser = undefined;
        this.userName = 'Guest';
        localStorage.removeItem('currentUser');
        return Observable_1.Observable.of(true).delay(1000).do(function (val) { return _this.isLoggedIn = false; });
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [webApiManager_service_1.WebApiManager])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map