import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Todo } from '../models/todo.model';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private todosUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl).pipe(catchError(this.errorHandler));
  }

  create(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo).pipe(catchError(this.errorHandler));
  }

  delete(id: number): Observable<Todo> {
    return this.http.delete<Todo>(this.todosUrl + '/' + id).pipe(catchError(this.errorHandler));
  }

  update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.todosUrl + '/' + todo.get('id'), todo).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Error en el servidor');
  }
}
