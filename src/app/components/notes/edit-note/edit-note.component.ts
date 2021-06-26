import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import {NoteService } from './../note.service';
import { Subscription } from 'rxjs';
import { Note } from '../notes.model';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {
 
  notes:Note;
  noteId: number;
  editForm: FormGroup;
  private noteSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private noteService: NoteService
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(paramMap => {
      this.noteSub=this.noteService
      .getNote(paramMap.get('NoteId'))
      .subscribe(note =>
        {
          this.notes=note;
        })
        this.editForm = new FormGroup({
                title: new FormControl(this.notes.title),
                 note: new FormControl(this.notes.note)
         });
    });

  }
  

  onUpdate(){
    
    this.noteService.updateNote(this.notes.id, this.editForm.value.title, this.editForm.value.note).subscribe(()=>
    {
      this.editForm.reset();
      this.router.navigateByUrl('/');
    });
    
   
  }

  onCancel(){
    this.router.navigateByUrl('/');
    
  }
  ngOnDestroy() {
    if (this.noteSub) {
      this.noteSub.unsubscribe();
    }
  }

}
