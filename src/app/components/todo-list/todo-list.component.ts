import { Component, OnInit, Input } from '@angular/core';
import { TodoStore } from 'src/app/flux/todo-store';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DetailDialogComponent } from '../detail-dialog/detail-dialog.component';
import { deleteTodo, endBackendAction, finishTodo } from 'src/app/flux/todo-actions';
import { List } from 'immutable';
import { Todo } from 'src/app/models/todo.model';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input() todos: List<Todo>;

  deletingId = -1;
  finishingId = -1;

  constructor(private snackBar: MatSnackBar,
              private todoService: TodosService,
              private store: TodoStore,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  onRemove(event: MouseEvent, todo: Todo) {
    event.stopPropagation();
    console.log('Se borra el todo con id: ' + todo.get('id'));
    this.deletingId = todo.get('id');
    this.todoService.delete(todo.get('id')).subscribe(
        res => {
            this.deletingId = -1;
            this.store.dispatch(deleteTodo(todo));
        },
        err => {
            this.deletingId = -1;
            this.openSnackBar('Ocurrió un error en el servidor', 'Aceptar');
            this.store.dispatch(endBackendAction('Ocurrió un error: ' + err));
        }
    );
  }

  openDetail(todo: Todo) {
    this.dialog.open(DetailDialogComponent, {data: todo});
  }

  onFinish(event: MouseEvent, todo: Todo) {
    event.stopPropagation();
    this.finishingId = todo.get('id');
    this.todoService.update(todo).subscribe(
      res => {
          this.finishingId = -1;
          this.store.dispatch(finishTodo(todo));
      },
      err => {
          this.finishingId = -1;
          this.openSnackBar('Ocurrió un error en el servidor', 'Aceptar');
      }
  );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
