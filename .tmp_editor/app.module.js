"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
/* Components */
var app_component_1 = require("./app.component");
var resizable_canvas_component_1 = require("./resizable-canvas/resizable-canvas.component");
var drag_control_component_1 = require("./resizable-canvas/drag-control/drag-control.component");
var runner_component_1 = require("./runner/runner.component");
/* Services */
var stories_service_1 = require("./stories/stories.service");
var zanimator_service_1 = require("./zanimator/zanimator.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule],
        declarations: [
            app_component_1.AppComponent,
            resizable_canvas_component_1.ResizableCanvasComponent,
            drag_control_component_1.DragControlComponent,
            runner_component_1.RunnerComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [stories_service_1.StoriesService, zanimator_service_1.ZAnimatorService],
        entryComponents: []
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map