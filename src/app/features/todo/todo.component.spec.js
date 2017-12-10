"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockTodoLocalStorageService = (function () {
    function MockTodoLocalStorageService() {
        this.quote = 'Test quote';
    }
    MockTodoLocalStorageService.prototype.getQuote = function () {
        return Promise.resolve(this.quote);
    };
    return MockTodoLocalStorageService;
}());
//# sourceMappingURL=todo.component.spec.js.map