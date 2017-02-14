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
import { TimeslotComponent } from './edit/timeline/timeslot.component';
import { CommandEditComponent } from './edit/command/command.component';
import { FullCommandEditorComponent } from './edit/command/full-comand-editor.component';

/* Services */
import { StoriesService } from './stories/stories.service';
import { ZAnimatorService } from './zanimator/zanimator.service';
import { FullCommandEditorService } from './edit/command/command-edit.service';
import { CommandDescriptionService } from './edit/command/description/command-description.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule ],
  declarations: [
    AppComponent,
    ResizableCanvasComponent,
    DragControlComponent,
    RunnerComponent,
    EditComponent,
    TimelineComponent,
    TimeslotComponent,
    CommandEditComponent,
    FullCommandEditorComponent
  ],
  bootstrap:    [ AppComponent ],
  providers:    [ StoriesService, ZAnimatorService, FullCommandEditorService, CommandDescriptionService ],
  entryComponents: [ ]
})
export class AppModule { }
