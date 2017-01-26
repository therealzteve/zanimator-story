import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ZAnimatorService } from '../zanimator/zanimator.service';
declare var zAnimator: any;


@Component({
  selector: 'my-resizable-canvas',
  templateUrl: './resizable-canvas.component.html',
  moduleId: module.id
})
export class ResizableCanvasComponent {
  public zAnimator;

  @Input()
  public width;

  @Input()
  public height;

  @Output() animatorInitialized = new EventEmitter();

  private canvasId = "myCanvas";

  constructor(private zAnimatorService: ZAnimatorService){
  }

  public resizeCanvasHorizontal(event){
    (<any>document.getElementById(this.canvasId)).width = (<any>document.getElementById(this.canvasId)).width + event.x;
  }

  public resizeCanvasVertical(event){
    (<any>document.getElementById(this.canvasId)).height = (<any>document.getElementById(this.canvasId)).height + event.y;
  }

  ngAfterViewInit(){
    this.zAnimator = zAnimator.create(this.canvasId);
    this.zAnimatorService.init(this.zAnimator);
  }
}
