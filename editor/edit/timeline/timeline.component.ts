import { Component, Input } from '@angular/core';
import { SelectionService } from '../selection/selection.service';

@Component({
  selector: 'my-story-timeline',
  templateUrl: './timeline.component.html',
  moduleId: module.id
})
export class TimelineComponent {

  @Input()
  public story;

  constructor(private selectionService: SelectionService){
  }

  public addTimeslot(){
    this.story.timeSlots.push([]);
  }

  public selectSlot(slot, event){
    this.selectionService.setSelectedSlot(slot);
    event.stopPropagation();
  }

}
