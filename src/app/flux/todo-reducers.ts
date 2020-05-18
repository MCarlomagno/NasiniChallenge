import { Todo } from '../models/todo.model';
import { ADD_TODO, DELETE_TODO, BACKEND_ACTION_STARTED, BACKEND_ACTION_FINISHED, FINISH_TODO, EDIT_TODO, GET_TODOS } from './const';
import { combineReducers } from 'redux';
import { List } from 'immutable';

function todosState(state: List<Todo>, action) {
    if (!state) {
        return List([]);
    }
    switch (action.type) {
        case GET_TODOS:
            return List(action.todos);
        case ADD_TODO:
            return state.push(action.todo);
        case EDIT_TODO:
            return editTodo(state, action);
        case FINISH_TODO:
            return finishTodo(state, action);
        case DELETE_TODO:
            const index = state.findIndex((todo) => todo.id === action.todo.id);
            return state.delete(index);
        default:
            return state;
    }
}

function finishTodo(state, action) {
    console.log('todo:' + action.todo);
    const index = state.findIndex((todo: Todo) => todo.id === action.todo.id);
    const finished: Todo = state.get(index);
    return state
        .set(index, new Todo({id: finished.id, title: finished.title, description: finished.description, completed: !finished.completed}));
}

function editTodo(state, action) {
    console.log('todo:' + action.todo);
    const index = state.findIndex((todo: Todo) => todo.id === action.todo.id);
    const edited: Todo = state.get(index);
    return state
        .set(index, new Todo({id: edited.id, title: action.todo.title, description: action.todo.description, completed: edited.completed}));
}

export const initialUiState = {
    actionOngoing: false,
    message: 'Ready'
};

function uiState(state: List<Todo>, action) {
    if (!state) {
        return initialUiState;
    }
    switch (action.type) {
        case BACKEND_ACTION_STARTED:
            return {
                actionOngoing: true,
                message: action.message
            };
        case BACKEND_ACTION_FINISHED:
            default:
            return {
                actionOngoing: false,
                message: action.message ? action.message : initialUiState.message
            };
    }
}

const app = combineReducers({
    uiState,
    todosState
});

export {app};
