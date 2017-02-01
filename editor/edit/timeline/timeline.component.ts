import { Component, Input } from '@angular/core';


@Component({
  selector: 'my-story-timeline',
  templateUrl: './timeline.component.html',
  moduleId: module.id
})
export class TimelineComponent {

  @Input()
  public story;

  constructor(){

  }

  public addTimeslot(){
    this.story.timeSlots.push([]);
  }

}
