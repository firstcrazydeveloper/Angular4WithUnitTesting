import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo.component';
import { TodoLocalStorageService } from './todo.localstorage.service';
import { TodoService } from './todo.service';
import { todoRouting } from './todo.routing';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule, todoRouting, ReactiveFormsModule],
    declarations: [TodoComponent],
    exports: [TodoComponent],
    providers: [TodoLocalStorageService, TodoService]
})
export class TodoModule { }