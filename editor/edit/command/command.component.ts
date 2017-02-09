import { Component, OnInit, Input } from '@angular/core';
import {FullCommandEditorService } from './command-edit.service';

@Component({
  selector: 'my-command-edit',
  templateUrl: './command.component.html',
  moduleId: module.id
})
export class CommandEditComponent implements OnInit {

  @Input()
  public command;

  public editMode = false;
  public editData = '';

  constructor(private fullCommandEditorService: FullCommandEditorService) {  }

  ngOnInit() {
    if(!this.command.action){
      this.fullCommandEditorService.editCommand(this.command);
    }
  }

  public openEditor(){
      this.editMode = true;
      this.editData = JSON.stringify(this.command.data);
  }

  public saveChanges(){
    this.command.data = JSON.parse(this.editData);
    this.editMode = false;
  }

  public cancelEdit(){
    this.editMode = false;
  }
}
