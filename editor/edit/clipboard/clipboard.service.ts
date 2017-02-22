import { Injectable } from '@angular/core';
import { SelectionService } from '../selection/selection.service';
import { StoriesService } from '../../stories/stories.service';


@Injectable()
export class ClipboardService {

  public storedSlot;
  public storedBlock;
  public storedCommand;

  constructor(private selectionService: SelectionService, private storiesService: StoriesService) {  }

  public copy(){
    this.storedSlot = this.selectionService.selectedSlot;
    this.storedBlock = this.selectionService.selectedBlock;
    this.storedCommand = this.selectionService.selectedCommand;
  }

  public paste(){
    if(this.storedCommand){
      return this.handleCommandPaste();
    }

    if(this.storedBlock){
      return this.handleBlockPaste();
    }

    if(this.storedSlot){
      return this.handleSlotPaste();
    }
  }

  private handleCommandPaste(){
    var selBlock = this.selectionService.selectedBlock;
    var selCmd = this.selectionService.selectedCommand;

    if(!selBlock){
      return;
    }

    var cmdIndex = selBlock.indexOf(selCmd);
    if(cmdIndex === -1){
      selBlock.push(JSON.parse(JSON.stringify(this.storedCommand)));
    }else{
      selBlock.splice(cmdIndex, 0, JSON.parse(JSON.stringify(this.storedCommand)));
    }
  }

  private handleBlockPaste(){
    var selSlot = this.selectionService.selectedSlot;
    var selBlock = this.selectionService.selectedBlock;

    if(!selSlot){
      return;
    }

    var blockIndex = selSlot.indexOf(selBlock);
    if(blockIndex === -1){
      selSlot.push(JSON.parse(JSON.stringify(this.storedBlock)));
    }else{
      selSlot.splice(blockIndex, 0, JSON.parse(JSON.stringify(this.storedBlock)));
    }
  }

  private handleSlotPaste(){
    var selSlot = this.selectionService.selectedSlot;

    var slotIndex =  this.storiesService.currentStory.timeSlots.indexOf(slotIndex);
    if(slotIndex === -1){
       this.storiesService.currentStory.timeSlots.push(JSON.parse(JSON.stringify(this.storedSlot)));
    }else{
      this.storiesService.currentStory.timeSlots.splice(slotIndex, 0, JSON.parse(JSON.stringify(this.storedSlot)));
    }
  }
}
