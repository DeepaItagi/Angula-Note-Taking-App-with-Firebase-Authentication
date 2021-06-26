import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './components/notes/notes.component';
import { SignupComponent } from './user/signup/signup.component';
import { SigninComponent } from './user/signin/signin.component';
import { PagenotfoundComponent } from './user/pagenotfound/pagenotfound.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

//firebase
import{AngularFireAuthModule} from "@angular/fire/auth";
import{AngularFireModule} from "@angular/fire";

//toastr
import { ToastrModule } from 'ngx-toastr';

import { environment } from 'src/environments/environment';
import { HeaderComponent } from './components/header/header.component';
import {TextFieldModule} from '@angular/cdk/text-field';
import { EditNoteComponent } from './components/notes/edit-note/edit-note.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    SignupComponent,
    SigninComponent,
    PagenotfoundComponent,
    HeaderComponent,
    EditNoteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    ToastrModule.forRoot(),
    TextFieldModule,
    MatTableModule,
    HttpClientModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
