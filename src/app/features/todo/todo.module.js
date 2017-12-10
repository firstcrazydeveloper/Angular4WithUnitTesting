"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var router_1 = require("@angular/router");
var todo_component_1 = require("./todo.component");
var todo_localstorage_service_1 = require("./todo.localstorage.service");
var todo_service_1 = require("./todo.service");
var todo_routing_1 = require("./todo.routing");
var TodoModule = (function () {
    function TodoModule() {
    }
    TodoModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, ng_bootstrap_1.NgbModule, router_1.RouterModule, todo_routing_1.todoRouting, forms_2.ReactiveFormsModule],
            declarations: [todo_component_1.TodoComponent],
            exports: [todo_component_1.TodoComponent],
            providers: [todo_localstorage_service_1.TodoLocalStorageService, todo_service_1.TodoService]
        })
    ], TodoModule);
    return TodoModule;
}());
exports.TodoModule = TodoModule;
//# sourceMappingURL=todo.module.js.map