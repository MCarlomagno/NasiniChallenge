import {List, Record} from 'immutable';

const TodoRecord = Record({
    id: 0,
    title: '',
    description: '',
    completed: false
});

export class Todo extends TodoRecord {

    id: number;
    title: string;
    description: string;
    completed: boolean;

    constructor(props) {
        super(props);
    }
}
