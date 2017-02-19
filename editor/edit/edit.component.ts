import { Component} from '@angular/core';
import { StoriesService } from '../stories/stories.service';
import { SelectionService } from './selection/selection.service';

@Component({
  selector: 'my-story-edit',
  templateUrl: './edit.component.html',
  moduleId: module.id
})
export class EditComponent {

  public exportedStory;

  constructor(private storiesService: StoriesService, private selectionService: SelectionService){

  }

  public export(){
    this.exportedStory = JSON.stringify(this.storiesService.currentStory)
    console.log(this.exportedStory);
  }

  public deselect(){
      this.selectionService.deselect();
  }


}
