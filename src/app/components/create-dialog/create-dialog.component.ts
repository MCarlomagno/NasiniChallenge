import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoStore } from 'src/app/flux/todo-store';
import { TodosService } from 'src/app/services/todos.service';
import { addTodo, endBackendAction } from 'src/app/flux/todo-actions';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent implements OnInit {

  cargando = false;
  createTodoForm: FormGroup;
  submitted = false;
  serverError = false;

  constructor(public dialogRef: MatDialogRef<CreateDialogComponent>,
              private store: TodoStore,
              private service: TodosService,
              private builder: FormBuilder) { }

  ngOnInit() {
    this.createTodoForm = this.builder.group({
      titleControl:  ['', Validators.required],
      descriptionControl:  ['', ],
    });
  }

  onSubmit(formValues) {
    this.submitted = true;
    if (this.createTodoForm.valid) {
      this.cargando = true;
      console.log(formValues);

      const todo = new Todo({
        title: formValues.titleControl,
        description: formValues.descriptionControl,
        completed: false});

      this.service.create(todo)
        .subscribe(
          res => {
              this.store.dispatch(addTodo(todo));
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
