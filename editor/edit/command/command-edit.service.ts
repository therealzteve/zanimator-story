import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Injectable()
export class FullCommandEditorService {

  public onNewCommandToEdit = new Subject();

  constructor() {  }


  public editCommand(command){
    this.onNewCommandToEdit.next(command);
  }
}
