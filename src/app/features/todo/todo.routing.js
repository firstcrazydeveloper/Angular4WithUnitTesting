"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var todo_component_1 = require("./todo.component");
var auth_guard_service_1 = require("../../shared/service/auth.guard.service");
var todoRoutes = [
    {
        path: '',
        component: todo_component_1.TodoComponent,
        canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            {
                path: '',
                children: [
                    {
                        path: '',
                        canActivateChild: [auth_guard_service_1.AuthGuard],
                        component: todo_component_1.TodoComponent
                    }
                ]
            }
        ]
    }
];
exports.todoRouting = router_1.RouterModule.forChild(todoRoutes);
//# sourceMappingURL=todo.routing.js.map