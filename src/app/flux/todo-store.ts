
import {createStore, applyMiddleware} from 'redux';
import { app , initialUiState } from './todo-reducers';
import { List } from 'immutable';
import { Injectable } from '@angular/core';
import { ReduxStore } from './redux-store';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(
    app, { todosState: List([]), uiState: initialUiState });


@Injectable()
export class TodoStore extends ReduxStore {

    constructor() {
        super(store);
    }

}
