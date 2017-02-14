import { Injectable } from '@angular/core';

@Injectable()
export class SelectionService {

  public selectedSlot;
  public selectedLine;
  public selectedCommand;

  private temporarySelected;

  constructor() {  }

  public setSelectedSlot(slot){
    this.getTemporarySelected().slot = slot;
  }

  public setSelectedLine(line){
    this.getTemporarySelected().line = line;
    this.updateSelected();
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
    this.selectedLine = this.getTemporarySelected().line;
    this.selectedCommand = this.getTemporarySelected().command;
    this.temporarySelected = null;
  }
}
