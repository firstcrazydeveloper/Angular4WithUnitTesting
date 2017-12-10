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
var todo_model_1 = require("./todo.model");
var TodoLocalStorageService = (function () {
    function TodoLocalStorageService() {
        var persistedTodos = JSON.parse(localStorage.getItem('my-todos') || '[]');
        // Normalize back into classes
        this.todos = persistedTodos.map(function (todo) {
            var ret = new todo_model_1.Todo(todo._title);
            ret.completed = todo.completed;
            return ret;
        });
    }
    TodoLocalStorageService.prototype.updateStore = function () {
        localStorage.setItem('my-todos', JSON.stringify(this.todos));
    };
    TodoLocalStorageService.prototype.getWithCompleted = function (completed) {
        return this.todos.filter(function (todo) { return todo.completed === completed; });
    };
    TodoLocalStorageService.prototype.allCompleted = function () {
        return this.todos.length === this.getCompleted().length;
    };
    TodoLocalStorageService.prototype.setAllTo = function (completed) {
        this.todos.forEach(function (t) { return t.completed = completed; });
        this.updateStore();
    };
    TodoLocalStorageService.prototype.removeCompleted = function () {
        this.todos = this.getWithCompleted(false);
        this.updateStore();
    };
    TodoLocalStorageService.prototype.getRemaining = function () {
        return this.getWithCompleted(false);
    };
    TodoLocalStorageService.prototype.getCompleted = function () {
        return this.getWithCompleted(true);
    };
    TodoLocalStorageService.prototype.toggleCompletion = function (todo) {
        todo.completed = !todo.completed;
        this.updateStore();
    };
    TodoLocalStorageService.prototype.remove = function (todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
        this.updateStore();
    };
    TodoLocalStorageService.prototype.add = function (title) {
        this.todos.push(new todo_model_1.Todo(title));
        this.updateStore();
    };
    TodoLocalStorageService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], TodoLocalStorageService);
    return TodoLocalStorageService;
}());
exports.TodoLocalStorageService = TodoLocalStorageService;
//# sourceMappingURL=todo.localstorage.service.js.map