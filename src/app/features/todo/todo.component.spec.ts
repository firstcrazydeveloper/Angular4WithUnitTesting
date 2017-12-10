import { TestBed, async } from '@angular/core/testing';
import {
    RouterTestingModule
} from '@angular/router/testing';
import { TodoComponent } from './todo.component';
import { TodoLocalStorageService } from './todo.localstorage.service';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';
import { routing } from '../../app.routing'
import { LoginComponent } from '../../common/components/login/login.component';
import { PageNotFoundComponent } from '../../common/components/pagenotfound/pagenotfound.component';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

class MockTodoLocalStorageService {
    todos: Array<Todo> = [];

    add(title: String) {
        this.todos.push(new Todo(title));
    }

    remove(todo: Todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
    }

    toggleCompletion(todo: Todo) {
        todo.completed = !todo.completed;
    }

    getRemaining() {
        return this.getWithCompleted(false);
    }

    getCompleted() {
        return this.getWithCompleted(true);
    }

    private getWithCompleted(completed: Boolean) {
        return this.todos.filter((todo: Todo) => todo.completed === completed);
    }

    removeCompleted() {
        this.todos = this.getWithCompleted(false);
    }

    allCompleted() {
        return this.todos.length === this.getCompleted().length;
    }

    setAllTo(completed: Boolean) {
        this.todos.forEach((t: Todo) => t.completed = completed);
    }
}

class MockTodoService {
}

class MockAuthService {
}


describe('Todo Component', () => {
    let app: TodoComponent;
    beforeEach(async(() => {
       
        TestBed.configureTestingModule({
            declarations: [
                TodoComponent, LoginComponent, PageNotFoundComponent
            ],
            providers: [
                { provide: TodoLocalStorageService, useClass: MockTodoLocalStorageService },
                { provide: TodoService, useClass: MockTodoService },
                { provide: AuthService, useClass: MockAuthService }
            ],
            imports: [RouterTestingModule, FormsModule, routing]
        }).compileComponents().then(() => {
            let fixture = TestBed.createComponent(TodoComponent);
            app = fixture.componentInstance;

        });
    }));

    it('should create a todo component', async(() => {
        const fixture = TestBed.createComponent(TodoComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should add todo', async(() => {
        app.newTodoText = 'Sample';
        app.addTodo();
        expect(app.todoStore.todos.length).toBe(1);
        expect(app.todoStore.todos[0].title).toBe('Sample');
    }));

    it('should remove todo', async(() => {
        app.newTodoText = 'Sample';
        app.addTodo();
        app.newTodoText = 'Data';
        app.addTodo();
        expect(app.todoStore.todos.length).toBe(2);
        let tempTodo = app.todoStore.todos[0];
        app.remove(tempTodo);
        expect(app.todoStore.todos.length).toBe(1);
        expect(app.todoStore.todos[0].title).toBe('Data');
    }));

    it('should toggle Completion of Todo', async(() => {
        app.newTodoText = 'Sample';
        app.addTodo();
        let tempTodo = app.todoStore.todos[0];
        app.toggleCompletion(tempTodo);
        expect(tempTodo.completed).toBe(true);
    }));

    it('should remove completed todo', async(() => {
        app.newTodoText = 'Sample';
        app.addTodo();
        let tempTodo = app.todoStore.todos[0];
        app.toggleCompletion(tempTodo);
        app.newTodoText = 'Sample 2';
        app.addTodo();
        app.newTodoText = 'Sample 3';
        app.addTodo();
        app.removeCompleted();
        expect(app.todoStore.todos.length).toBe(2);
    }));

    it('should edit todo', async(() => {
        app.newTodoText = 'Sample';
        app.addTodo();
        let tempTodo = app.todoStore.todos[0];
        app.editTodo(tempTodo);
        expect(tempTodo.editing).toBe(true);
    }));

    it('should update todo', async(() => {
        app.newTodoText = 'Sample';
        app.addTodo();
        let tempTodo = app.todoStore.todos[0];
        app.updateEditingTodo(tempTodo, 'New Title');
        expect(tempTodo.title).toBe('New Title');
    }));

    it('should cancel editing todo', async(() => {
        app.newTodoText = 'Sample';
        app.addTodo();
        let tempTodo = app.todoStore.todos[0];
        app.cancelEditingTodo(tempTodo);
        expect(tempTodo.editing).toBe(false);
    }));

    it('should stop editing todo', async(() => {
        app.newTodoText = 'Sample';
        app.addTodo();
        let tempTodo = app.todoStore.todos[0];
        app.stopEditing(tempTodo, 'Old Title');
        expect(tempTodo.title).toBe('Old Title');
        expect(tempTodo.editing).toBe(false);
    }));  

});
