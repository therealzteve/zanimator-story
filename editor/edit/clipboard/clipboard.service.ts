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
      selBlock.push(JSON.parse(JSON.stringify(selCmd)));
    }else{
      selBlock.splice(selBlock, 0, JSON.parse(JSON.stringify(selCmd)));
    }
  }

  private handleBlockPaste(){

  }

  private handleSlotPaste(){

  }
}
