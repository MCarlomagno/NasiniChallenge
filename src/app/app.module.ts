import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { TodosService } from './services/todos.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule,
         MatListModule,
         MatIconModule,
         MatCardModule,
         MatInputModule,
         MatProgressSpinnerModule,
         MatDialogModule,
         MatSnackBarModule,
         MatToolbarModule,
         MatTooltipModule,
         MatRippleModule} from '@angular/material';

import { DetailDialogComponent } from './components/detail-dialog/detail-dialog.component';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoStore } from './flux/todo-store';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailDialogComponent,
    CreateDialogComponent,
    TodoListComponent
  ],
  entryComponents: [
    DetailDialogComponent,
    CreateDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatListModule, MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    MatRippleModule,
  ],
  providers: [TodosService, TodoStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
