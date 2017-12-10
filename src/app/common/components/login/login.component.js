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
var router_1 = require("@angular/router");
var auth_service_1 = require("../../../shared/service/auth.service");
var user_model_1 = require("../../../shared/model/user.model");
var LoginComponent = (function () {
    function LoginComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.user = new user_model_1.User();
        this.error = '';
        this.error = '';
    }
    LoginComponent.prototype.Login = function () {
        var _this = this;
        this.error = '';
        this.authService.login(this.id, this.password).subscribe(function (user) {
            if (user.isAunthenticate) {
                _this.authService.isLoggedIn = true;
                _this.authService.currentUser = user;
                _this.authService.setUserDetails(user);
                _this.authService.token = user.token;
                _this.authService.userName = user.firstName;
                var redirect = _this.authService.redirectUrl ? _this.authService.redirectUrl : 'todo';
                var navigationExtras = {
                    preserveQueryParams: true,
                    preserveFragment: true
                };
                _this.router.navigate(['todo'], navigationExtras);
            }
            else {
                _this.error = 'UserId and Password are not correct!';
            }
        }, function (err) {
            _this.error = 'We are getting error to connect with server! Try again';
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-page',
            templateUrl: "./login.component.html",
            styleUrls: ['./login.component.min.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map