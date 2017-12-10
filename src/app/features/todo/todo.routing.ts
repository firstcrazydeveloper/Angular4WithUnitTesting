import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo.component';
import { AuthGuard } from '../../shared/service/auth.guard.service';


const todoRoutes: Routes = [
    {
        path: '',
        component: TodoComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                children: [
                    {
                        path: '',
                        canActivateChild: [AuthGuard],
                        component: TodoComponent
                    }
                ]
            }
        ]
    }

];

export const todoRouting: ModuleWithProviders = RouterModule.forChild(todoRoutes);