import { Component, OnInit, Input } from '@angular/core';

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

  constructor() {  }

  ngOnInit() {}

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
