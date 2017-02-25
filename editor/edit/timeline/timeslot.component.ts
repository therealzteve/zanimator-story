import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectionService } from '../selection/selection.service';
import { DragulaService } from 'ng2-dragula';
import { StoriesService } from '../../stories/stories.service';
import { FullCommandEditorService } from '../command/command-edit.service';

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

  constructor(
    private selectionService: SelectionService,
    private dragulaService: DragulaService,
    private storiesService: StoriesService,
    private fullCommandEditorService: FullCommandEditorService) {

    // Needed because otherwise there is an error from dragula because bag already exists
    const bag: any = this.dragulaService.find('bag-block');
    if (bag !== undefined ) this.dragulaService.destroy('bag-block');
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
    this.storiesService.onStoryChanged.next();
  }

  public addCommandToBlock(block){
    var newCommand = {};
    this.fullCommandEditorService.editCommand(newCommand);

    var saveSubscription = this.fullCommandEditorService.onSaved.subscribe(()=>{
      saveSubscription.unsubscribe();
      cancelSubscription.unsubscribe();
      block.push(newCommand);
      this.storiesService.onStoryChanged.next();
    });

    var cancelSubscription = this.fullCommandEditorService.onCancel.subscribe(()=>{
      saveSubscription.unsubscribe();
      cancelSubscription.unsubscribe();
    });
  }

  public deleteCommand(block, command){
      var index = block.indexOf(command);
      if(index > -1){
        block.splice(index, 1);
        this.storiesService.onStoryChanged.next();
      }
  }

  public deleteBlock(block){
    var index = this.timeslot.indexOf(block);
    if(index > -1){
      this.timeslot.splice(index, 1);
      this.storiesService.onStoryChanged.next();
    }
  }

  public deleteSlot(){
    this.onDeleteSlot.emit();
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
