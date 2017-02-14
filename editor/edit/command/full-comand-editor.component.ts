import { Component, OnInit, Input } from '@angular/core';
import { FullCommandEditorService } from './command-edit.service';
import { CommandDescriptionService } from './description/command-description.service';

@Component({
  selector: 'my-full-command-edit',
  templateUrl: './full-command-editor.component.html',
  moduleId: module.id
})
export class FullCommandEditorComponent implements OnInit {

  public command;
  public tempCommand;
  public editData;

  constructor(
    private fullCommandEditorService: FullCommandEditorService,
    private commandDescriptionService: CommandDescriptionService
  ) {  }

  ngOnInit() {
    this.fullCommandEditorService.onNewCommandToEdit.subscribe( (command) =>{
      setTimeout(() => {this.command = command; this.initEdit() });
    });
  }


  public initEdit(){
    this.tempCommand = JSON.parse(JSON.stringify(this.command));
    if(!this.tempCommand.data){
      this.tempCommand.data = {};
    }
    this.editData = this.tempCommand.data;

    for(var prop of this.getProperties()){
          if(prop.type === "json"){
            this.editData[prop.name] = JSON.stringify(this.editData[prop.name]);
          }
    }

  }

  public saveChanges(){
    this.command.action = this.tempCommand.action;

    for(var prop of this.getProperties()){
          if(prop.type === "json"){
            this.editData[prop.name] = JSON.parse(this.editData[prop.name]);
          }
    }

    this.command.data = this.editData;

    this.command = null;
    this.tempCommand = null;
  }

  public cancelEdit(){
    this.command = null;
    this.tempCommand = null;
  }

  public getProperties(){
    if(this.tempCommand.action){
      return this.commandDescriptionService.getDescriptionOf(this.tempCommand.action).properties;
    }
      return [];
  }
}
