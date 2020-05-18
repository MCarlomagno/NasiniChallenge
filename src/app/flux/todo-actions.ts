import { Todo } from '../models/todo.model';
import { GET_TODOS, ADD_TODO, EDIT_TODO, FINISH_TODO, DELETE_TODO, BACKEND_ACTION_STARTED, BACKEND_ACTION_FINISHED } from './const';
import { List } from 'immutable';

export function getTodos(todos: List<Todo>) {
    return { type: GET_TODOS, todos: todos };
}

export function addTodo(todo: Todo) {
    return { type: ADD_TODO, todo };
}

export function editTodo(todo: Todo) {
    return { type: EDIT_TODO, todo: todo };
}


export function finishTodo(todo: Todo) {
    return { type: FINISH_TODO, todo: todo };
}

export function deleteTodo(todo: Todo) {
    return { type: DELETE_TODO, todo };
}

export function startBackendAction(message: string) {
    return { type: BACKEND_ACTION_STARTED, message };
}

export function endBackendAction(message: string = '') {
    return { type: BACKEND_ACTION_FINISHED };
}
