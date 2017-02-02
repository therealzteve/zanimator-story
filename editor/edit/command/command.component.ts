import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'my-command-edit',
  templateUrl: './command.component.html',
  moduleId: module.id
})
export class CommandEditComponent implements OnInit {

  @Input()
  public command;
  
  constructor() {  }

  ngOnInit() {}
}
