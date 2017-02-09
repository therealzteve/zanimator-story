import { Component, OnInit, Input } from '@angular/core';
import {FullCommandEditorService } from './command-edit.service';

@Component({
  selector: 'my-full-command-edit',
  templateUrl: './full-command-editor.component.html',
  moduleId: module.id
})
export class FullCommandEditorComponent implements OnInit {

  public command;

  constructor(private fullCommandEditorService: FullCommandEditorService) {  }

  ngOnInit() {
    this.fullCommandEditorService.onNewCommandToEdit.subscribe( (command) =>{
      this.command = command;
    });
  }

  public openEditor(){
  }

  public saveChanges(){
  }

  public cancelEdit(){
  }
}
