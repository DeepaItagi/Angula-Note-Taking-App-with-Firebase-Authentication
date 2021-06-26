import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { PagenotfoundComponent } from './user/pagenotfound/pagenotfound.component';
import { NotesComponent } from './components/notes/notes.component';
import { EditNoteComponent } from './components/notes/edit-note/edit-note.component';

//guarding
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['signin']);
const redirectLoggedInToNotes = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path:'signin', 
    component: SigninComponent, 
    canActivate:[AngularFireAuthGuard], 
    data: { authGuardPipe: redirectLoggedInToNotes },
  },
  {
    path: 'signup', 
    component:SignupComponent
  },
 {
    path:'edit/:NoteId',
    component: EditNoteComponent,
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
