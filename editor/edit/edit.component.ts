import { Component} from '@angular/core';
import { StoriesService } from '../stories/stories.service';

@Component({
  selector: 'my-story-edit',
  templateUrl: './edit.component.html',
  moduleId: module.id
})
export class EditComponent {


  constructor(private storiesService: StoriesService){

  }



}
