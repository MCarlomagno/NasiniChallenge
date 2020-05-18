import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/services/todos.service';
import { MatDialog} from '@angular/material';
import { Todo } from 'src/app/models/todo.model';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { TodoStore } from 'src/app/flux/todo-store';
import { List } from 'immutable';
import { getTodos, startBackendAction, endBackendAction } from 'src/app/flux/todo-actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errorMsg = '';
  lastId = 0;

  constructor(private store: TodoStore,
              private todosService: TodosService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(startBackendAction('Cargando datos'));
    this.todosService.getAll().subscribe(
      data => {
        const todos = data.map((todo: Todo) =>
            new Todo({id: todo.id, title: todo.title, description: todo.description, completed: todo.completed}));

        this.store.dispatch(getTodos(List(todos)));
        this.store.dispatch(endBackendAction());
      },
      error => this.errorMsg = error
      );

    this.store.subscribe(
      state => console.log('new state received: ' + state)
    );
  }

  create() {
    this.dialog.open(CreateDialogComponent);
  }

}
