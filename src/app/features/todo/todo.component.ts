import { Component } from '@angular/core';
import { TodoLocalStorageService } from './todo.localstorage.service';
import { Router, NavigationExtras } from '@angular/router';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { AuthService } from '../../shared/service/auth.service';
import { AppSettings } from '../../appSettings.setting';

@Component({
    selector: 'todo-app',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.min.css']
})
export class TodoComponent {
    todoStore: any;
    newTodoText = '';

    constructor(todoLocalStorage: TodoLocalStorageService, todoService: TodoService, authService: AuthService, public router: Router) {

        if (!authService.isLoggedIn) {
            let navigationExtras: NavigationExtras = {
                preserveQueryParams: true,
                preserveFragment: true
            };
            this.router.navigate(['login'], navigationExtras);

        }
        if (AppSettings.IsLocal) {
            this.todoStore = todoLocalStorage;
        }
        else {
            this.todoStore = todoService;
        }
    }

    stopEditing(todo: Todo, editedTitle: string) {
        todo.title = editedTitle;
        todo.editing = false;
    }

    cancelEditingTodo(todo: Todo) {
        todo.editing = false;
    }

    updateEditingTodo(todo: Todo, editedTitle: string) {
        editedTitle = editedTitle.trim();
        todo.editing = false;

        if (editedTitle.length === 0) {
            return this.todoStore.remove(todo);
        }

        todo.title = editedTitle;
    }

    editTodo(todo: Todo) {
        todo.editing = true;
    }

    removeCompleted() {
        this.todoStore.removeCompleted();
    }

    toggleCompletion(todo: Todo) {
        this.todoStore.toggleCompletion(todo);
    }

    remove(todo: Todo) {
        this.todoStore.remove(todo);
    }

    addTodo() {
        if (this.newTodoText.trim().length) {
            this.todoStore.add(this.newTodoText);
            this.newTodoText = '';
        }
    }
}