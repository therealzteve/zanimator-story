import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import {FullCommandEditorService } from './command-edit.service';

@Component({
  selector: 'my-command-edit',
  templateUrl: './command.component.html',
  moduleId: module.id
})
export class CommandEditComponent implements OnInit {

  @Input()
  public command;

  @Output()
  commandDeleted = new EventEmitter();

  public editMode = false;
  public editData = '';
  public deleteButtonVisible = false;

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

  public openFullEditor(){
    this.fullCommandEditorService.editCommand(this.command);
    this.cancelEdit();
  }

  public saveChanges(){
    this.command.data = JSON.parse(this.editData);
    this.editMode = false;
  }

  public cancelEdit(){
    this.editMode = false;
  }

  public removeCommand(){
    this.commandDeleted.emit();
  }

  public showDeleteButton(){
    this.deleteButtonVisible = true;
  }

  public hideDeleteButton(){
    this.deleteButtonVisible = false;
  }
}
