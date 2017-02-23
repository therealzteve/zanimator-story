import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectionService } from '../selection/selection.service';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'my-timeslot',
  templateUrl: 'timeslot.component.html',
  moduleId: module.id
})
export class TimeslotComponent implements OnInit {

  @Input()
  public timeslot;

  @Output()
  public onDeleteSlot = new EventEmitter();

  constructor(private selectionService: SelectionService, private dragulaService: DragulaService) {

    this.dragulaService.setOptions('bag-block', {
            removeOnSpill: false,
            moves: function (el, container, target) {
                if (target.classList) {
                    return target.classList.contains('timeslot-timeblock');
                }
                return false;
            }
        });
   }


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

  public deleteCommand(block, command){
      var index = block.indexOf(command);
      if(index > -1){
        block.splice(index, 1);
      }
  }

  public deleteBlock(block){
    var index = this.timeslot.indexOf(block);
    if(index > -1){
      this.timeslot.splice(index, 1);
    }
  }

  public deleteSlot(){
    this.onDeleteSlot.emit();
  }

}
