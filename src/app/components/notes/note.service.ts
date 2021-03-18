import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import {take,map,delay,tap} from 'rxjs/operators';
import { Note } from './notes.model';

@Injectable({
  providedIn: 'root'
})

export class NoteService{

private _notes = new BehaviorSubject<Note[]>([ ])

get notes() {
  return this._notes.asObservable();
}

getNote(id:string)
{
   return this.notes.pipe(
    take(1),
    map(notes => {
      return { ...notes.find(p => p.id === id) };
    })
  );
  }

  getAll()
  {
    return this.notes;
  }
  addNote(title: string,note: string,){
    const newNote= new Note(
      Math.random().toString(),
      title,
      note,
  
    );
    return this.notes.pipe(
      take(1),
      tap(notes => {
        this._notes.next(notes.concat(newNote));
      }));
}

updateNote(id:string,title: string, note:string){
  return this.notes.pipe(
  take(1),
  tap((notes: Note[]) => {
    
        const updatedNoteIndex = notes.findIndex(n => n.id === id);console.log('o');
      const updatedNote = notes;
      const oldNote = updatedNote[updatedNoteIndex];
      updatedNote[updatedNoteIndex] = new Note(
        oldNote.id,
        title,
        note,
      );
      this._notes.next(updatedNote);

      console.log(id);
      console.log(title);
      console.log(note);
     }));
  }
}