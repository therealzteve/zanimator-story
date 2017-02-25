import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FullCommandEditorService } from './command-edit.service';
import { StoriesService } from '../../stories/stories.service';

@Component({
  selector: 'my-command-edit',
  templateUrl: './command.component.html',
  moduleId: module.id
})
export class CommandEditComponent {

  @Input()
  public command;

  @Output()
  commandDeleted = new EventEmitter();

  public editMode = false;
  public editData = '';
  public deleteButtonVisible = false;

  constructor(private fullCommandEditorService: FullCommandEditorService, private storiesService: StoriesService) {  }


  public openEditor(){
      this.editMode = true;
      this.editData = JSON.stringify(this.command.data);
  }

  public openFullEditor(){
    this.fullCommandEditorService.editCommand(this.command);
    var saveSubscription = this.fullCommandEditorService.onSaved.subscribe(()=>{
      saveSubscription.unsubscribe();
      cancelSubscription.unsubscribe();
      this.storiesService.onStoryChanged.next();
    });

    var cancelSubscription = this.fullCommandEditorService.onCancel.subscribe(()=>{
      saveSubscription.unsubscribe();
      cancelSubscription.unsubscribe();
    });
  }

  public saveChanges(){
    this.command.data = JSON.parse(this.editData);
    this.editMode = false;
    this.storiesService.onStoryChanged.next();
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
