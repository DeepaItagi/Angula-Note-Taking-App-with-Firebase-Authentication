import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import{Note } from './notes.model';
import { Router } from '@angular/router';
import {NoteService} from '../notes/note.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit{

  notesForm: FormGroup;
  hideForm=false;
  AddNote= false;
  notes:Note[]=[];
  private noteSub:Subscription;
  
  constructor(
    private formbuilder:FormBuilder,
    private noteService : NoteService) { }

  ngOnInit() {
    this.notesForm = this.formbuilder.group({
      title: [""],
      note: [""],
    });
    this.noteSub=this.noteService.notes.subscribe(notes=>{
    this.notes=notes;
    this.filteredNotes=notes;
    })
  }
  
  toggle() {
    this.AddNote = !this.AddNote;
  }

  _searchInput='';
    filteredNotes: Note[]=[];
    get searchInput(): string{
        return this._searchInput;
    }
    set searchInput(value:string){
        this._searchInput=value;
        this.filteredNotes=this.searchInput ? this.searchNote(this.searchInput) : this.notes;
    }

  searchNote(si:string):Note[]
  {
    si=si.toLocaleLowerCase();
    return this.notes.filter((note:Note) =>
    note.title.toLocaleLowerCase().indexOf(si) !== -1) ;
   
  }

  onAddNote()
  { 
     this.noteService.addNote(this.notesForm.value.title,this.notesForm.value.note).subscribe(()=>
    {
      console.log(this.notes);
      this.hideForm = false;
      this.AddNote = false;
      this.notesForm.reset();
     });
    }

  delete(notes:Note)
  {
    const index=this.notes.findIndex(
      (currentNote) => currentNote.id===notes.id,
    );
    this.notes.splice(index,1);
    console.log("Deleted");
  }

  resetForm()
  {
    this.notesForm.reset();
  }
}
