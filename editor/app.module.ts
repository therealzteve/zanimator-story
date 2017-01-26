import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';

/* Components */
import { AppComponent } from './app.component';
import { ResizableCanvasComponent } from './resizable-canvas/resizable-canvas.component';
import { DragControlComponent } from './resizable-canvas/drag-control/drag-control.component';
import { RunnerComponent } from './runner/runner.component';
import { EditComponent } from './edit/edit.component';
import { TimelineComponent } from './edit/timeline/timeline.component';

/* Services */
import { StoriesService } from './stories/stories.service';
import { ZAnimatorService } from './zanimator/zanimator.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule ],
  declarations: [
    AppComponent,
    ResizableCanvasComponent,
    DragControlComponent,
    RunnerComponent,
    EditComponent,
    TimelineComponent
  ],
  bootstrap:    [ AppComponent ],
  providers:    [ StoriesService, ZAnimatorService ],
  entryComponents: [ ]
})
export class AppModule { }
