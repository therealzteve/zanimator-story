import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-drag-control',
  templateUrl: './drag-control.component.html',
  moduleId: module.id
})
export class DragControlComponent {

  @Output()
  public onDrag = new EventEmitter();

  private active = false;
  private dragStartPoint = { x: 0, y: 0};

  constructor(){
  }


  private activate(event){
    this.dragStartPoint.x = event.clientX;
    this.dragStartPoint.y = event.clientY;

    document.addEventListener("mousemove", this.windowCallback);
    document.addEventListener("mouseup", this.deactivate);
  }

  private deactivate = () =>{
    document.removeEventListener("mousemove",this.windowCallback);
    document.removeEventListener("mouseup", this.deactivate);
  }

  private windowCallback =  (event) => {
        if ((<any>document).selection) {
        (<any>document).selection.empty()
      } else {
        window.getSelection().removeAllRanges()
      }
      this.onDrag.emit({x: event.clientX - this.dragStartPoint.x,
         y: event.clientY - this.dragStartPoint.y});
      this.dragStartPoint.x = event.clientX;
      this.dragStartPoint.y = event.clientY;
  };

}
