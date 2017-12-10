import { Injectable, Output, EventEmitter } from '@angular/core';
import { WebApiManager } from '../../shared/service/webApiManager.service';
import { AppSettings } from '../../../app/appSettings.setting';
import { Observable } from 'rxjs/Rx';
import { Todo } from './todo.model';
@Injectable()
export class TodoService {
    todosCollection: Observable<any> = null;
    todos: Array<Todo> = [];

    constructor(public webApiManager: WebApiManager) {
        // TODO >> Update this service file in proper way after using this Web API Service
        // this.getAllToDoList();
    }

    // This is url to get data from web api
    public static todoListAPIUrl = AppSettings.BaseAPIUrl + 'todolist';

    // Get all to do list from Web API server
    getAllToDoList() {
        this.getAllTodo()
            .subscribe(todoList => {
                this.todos = todoList;
            },
            err => { });
    }

    // Add new Todo in database through Web API request
    add(title: String) {
        let newTodo = new Todo(title);
        this.addUpdateToDo(newTodo).subscribe(() => {
            this.getAllToDoList();
        }, err => { });
    }


    // Make API request to Add To Do
    private addUpdateToDo(newTodo: Todo) {
        return this.webApiManager.post(TodoService.todoListAPIUrl, newTodo);

    }

    // Filter To Do List
    private getToDoWithCompleted(completed: Boolean) {
        return this.todos.filter((todo: Todo) => todo.completed === completed);
    }

    // Make API request to get all To Do list 
    getAllTodo() {
        this.todosCollection = this.webApiManager.get(TodoService.todoListAPIUrl);
        return this.todosCollection;
    }

    removeCompleted() {
        this.todos = this.getToDoWithCompleted(false);

    }

    getRemaining() {
        return this.getToDoWithCompleted(false);
    }

    getCompleted() {
        return this.getToDoWithCompleted(true);
    }

    toggleCompletion(todo: Todo) {
        todo.completed = !todo.completed;

    }

    // Remove To Do list
    private removeTodo(todo: Todo) {
        this.remove(todo).subscribe(() => {
            this.todos.splice(this.todos.indexOf(todo), 1);
        }, err => { });

    }

    // Make API request to remove To Do
    remove(todo: Todo) {
        todo.isDeletd = true;
        return this.webApiManager.post(TodoService.todoListAPIUrl, todo);

    }
}