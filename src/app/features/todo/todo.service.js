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
var webApiManager_service_1 = require("../../shared/service/webApiManager.service");
var appSettings_setting_1 = require("../../../app/appSettings.setting");
var todo_model_1 = require("./todo.model");
var TodoService = (function () {
    function TodoService(webApiManager) {
        this.webApiManager = webApiManager;
        this.todosCollection = null;
        this.todos = [];
        this.getAllToDoList();
    }
    TodoService_1 = TodoService;
    TodoService.prototype.getAllToDoList = function () {
        var _this = this;
        this.getAllTodo()
            .subscribe(function (todoList) {
            _this.todos = todoList;
        }, function (err) { });
    };
    TodoService.prototype.add = function (title) {
        var _this = this;
        var newTodo = new todo_model_1.Todo(title);
        this.addUpdateToDo(newTodo).subscribe(function () {
            _this.getAllToDoList();
        }, function (err) { });
    };
    TodoService.prototype.addUpdateToDo = function (newTodo) {
        return this.webApiManager.post(TodoService_1.todoListAPIUrl, newTodo);
    };
    TodoService.prototype.getToDoWithCompleted = function (completed) {
        return this.todos.filter(function (todo) { return todo.completed === completed; });
    };
    TodoService.prototype.getAllTodo = function () {
        this.todosCollection = this.webApiManager.get(TodoService_1.todoListAPIUrl);
        return this.todosCollection;
    };
    TodoService.prototype.removeCompleted = function () {
        this.todos = this.getToDoWithCompleted(false);
    };
    TodoService.prototype.getRemaining = function () {
        return this.getToDoWithCompleted(false);
    };
    TodoService.prototype.getCompleted = function () {
        return this.getToDoWithCompleted(true);
    };
    TodoService.prototype.toggleCompletion = function (todo) {
        todo.completed = !todo.completed;
    };
    TodoService.prototype.removeTodo = function (todo) {
        var _this = this;
        this.remove(todo).subscribe(function () {
            _this.todos.splice(_this.todos.indexOf(todo), 1);
        }, function (err) { });
    };
    TodoService.prototype.remove = function (todo) {
        todo.isDeletd = true;
        return this.webApiManager.post(TodoService_1.todoListAPIUrl, todo);
    };
    TodoService.todoListAPIUrl = appSettings_setting_1.AppSettings.BaseAPIUrl + 'todolist';
    TodoService = TodoService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [webApiManager_service_1.WebApiManager])
    ], TodoService);
    return TodoService;
    var TodoService_1;
}());
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map