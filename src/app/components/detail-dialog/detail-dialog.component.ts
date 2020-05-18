import { Component, OnInit, Inject } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoStore } from 'src/app/flux/todo-store';
import { TodosService } from 'src/app/services/todos.service';
import { endBackendAction, editTodo } from 'src/app/flux/todo-actions';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.css']
})
export class DetailDialogComponent implements OnInit {

  cargando = false;
  editTodoForm: FormGroup;
  submitted = false;
  serverError = false;
  changed = false;

  constructor(@Inject(MAT_DIALOG_DATA) private todo: Todo,
              public dialogRef: MatDialogRef<DetailDialogComponent>,
              private store: TodoStore,
              private service: TodosService,
              private builder: FormBuilder) { }

  ngOnInit() {

    this.editTodoForm = this.builder.group({
      titleControl:  [this.todo.get('title'), Validators.required],
      descriptionControl:  [this.todo.get('description'), ],
    });

  }

  onChange() {
    this.changed = true;
  }

  onSubmit(formValues) {
    this.submitted = true;
    if (this.editTodoForm.valid) {
      this.cargando = true;

      const todo = new Todo({
        id: this.todo.id,
        title: formValues.titleControl,
        description: formValues.descriptionControl,
        completed: false
      });

      this.service.update(todo)
          .subscribe(
              res => {
                  this.store.dispatch(editTodo(todo));
                  this.cargando = false;
                  this.dialogRef.close();
              },
              err => {
                  this.cargando = false;
                  this.serverError = true;
                  this.store.dispatch(endBackendAction('Ocurrió un error: ' + err));
              }
          );
    }
  }

}
