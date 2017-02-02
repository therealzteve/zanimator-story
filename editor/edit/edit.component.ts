import { Component} from '@angular/core';
import { StoriesService } from '../stories/stories.service';

@Component({
  selector: 'my-story-edit',
  templateUrl: './edit.component.html',
  moduleId: module.id
})
export class EditComponent {

  public exportedStory;

  constructor(private storiesService: StoriesService){

  }

  public export(){
    this.exportedStory = JSON.stringify(this.storiesService.currentStory)
    console.log(this.exportedStory);
  }


}
