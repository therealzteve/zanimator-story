"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var ng2_dragula_1 = require("ng2-dragula");
/* Components */
var app_component_1 = require("./app.component");
var resizable_canvas_component_1 = require("./resizable-canvas/resizable-canvas.component");
var drag_control_component_1 = require("./resizable-canvas/drag-control/drag-control.component");
var runner_component_1 = require("./runner/runner.component");
var edit_component_1 = require("./edit/edit.component");
var timeline_component_1 = require("./edit/timeline/timeline.component");
var timeslot_component_1 = require("./edit/timeline/timeslot.component");
var command_component_1 = require("./edit/command/command.component");
var full_comand_editor_component_1 = require("./edit/command/full-comand-editor.component");
/* Services */
var stories_service_1 = require("./stories/stories.service");
var zanimator_service_1 = require("./zanimator/zanimator.service");
var command_edit_service_1 = require("./edit/command/command-edit.service");
var command_description_service_1 = require("./edit/command/description/command-description.service");
var selection_service_1 = require("./edit/selection/selection.service");
var clipboard_service_1 = require("./edit/clipboard/clipboard.service");
var undo_service_1 = require("./edit/undo/undo.service");
var key_binding_service_1 = require("./key/key_binding.service");
var ng2_dragula_2 = require("ng2-dragula");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, ng2_dragula_1.DragulaModule],
        declarations: [
            app_component_1.AppComponent,
            resizable_canvas_component_1.ResizableCanvasComponent,
            drag_control_component_1.DragControlComponent,
            runner_component_1.RunnerComponent,
            edit_component_1.EditComponent,
            timeline_component_1.TimelineComponent,
            timeslot_component_1.TimeslotComponent,
            command_component_1.CommandEditComponent,
            full_comand_editor_component_1.FullCommandEditorComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [
            stories_service_1.StoriesService,
            zanimator_service_1.ZAnimatorService,
            command_edit_service_1.FullCommandEditorService,
            command_description_service_1.CommandDescriptionService,
            selection_service_1.SelectionService,
            key_binding_service_1.KeyBindingService,
            clipboard_service_1.ClipboardService,
            ng2_dragula_2.DragulaService,
            undo_service_1.UndoService
        ],
        entryComponents: []
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map