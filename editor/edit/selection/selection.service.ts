import { Injectable } from '@angular/core';

@Injectable()
export class SelectionService {

  public selectedSlot;
  public selectedBlock;
  public selectedCommand;

  private temporarySelected;

  constructor() {  }

  public setSelectedSlot(slot){
    this.getTemporarySelected().slot = slot;
    this.updateSelected();
  }

  public setSelectedBlock(block){
    this.getTemporarySelected().block = block;
  }

  public setSelectedCommand(command){
    this.getTemporarySelected().command = command;
  }

  private getTemporarySelected(){
    if(!this.temporarySelected){
      this.temporarySelected = {};
    }
    return this.temporarySelected;
  }

  private updateSelected(){
    this.selectedSlot = this.getTemporarySelected().slot;
    this.selectedBlock = this.getTemporarySelected().block;
    this.selectedCommand = this.getTemporarySelected().command;
    this.temporarySelected = null;
  }
}
