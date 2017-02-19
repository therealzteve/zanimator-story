import { Component, OnInit, Input } from '@angular/core';
import { SelectionService } from '../selection/selection.service';

@Component({
  selector: 'my-timeslot',
  templateUrl: 'timeslot.component.html',
  moduleId: module.id
})
export class TimeslotComponent implements OnInit {
  @Input()
  public timeslot;

  constructor(private selectionService: SelectionService) {  }


  ngOnInit() {}

  public addBlock(){
    this.timeslot.push([]);
  }

  public addCommandToBlock(block){
    block.push({});
  }

  public selectBlock(block){
    this.selectionService.setSelectedBlock(block);
  }

  public selectCommand(command){
    this.selectionService.setSelectedCommand(command);
  }

  public isSelectedSlot(){
    return (this.selectionService.selectedSlot === this.timeslot
      && !this.selectionService.selectedBlock
      && !this.selectionService.selectedCommand
    );
  }

  public isSelectedBlock(block){
    return ( this.selectionService.selectedBlock === block
      && !this.selectionService.selectedCommand
    );
  }

  public isSelectedCommand(command){
    return ( this.selectionService.selectedCommand === command );
  }
}
