"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var zanimator_service_1 = require("../zanimator/zanimator.service");
var ResizableCanvasComponent = (function () {
    function ResizableCanvasComponent(zAnimatorService) {
        this.zAnimatorService = zAnimatorService;
        this.animatorInitialized = new core_1.EventEmitter();
        this.canvasId = "myCanvas";
    }
    ResizableCanvasComponent.prototype.resizeCanvasHorizontal = function (event) {
        document.getElementById(this.canvasId).width = document.getElementById(this.canvasId).width + event.x;
    };
    ResizableCanvasComponent.prototype.resizeCanvasVertical = function (event) {
        document.getElementById(this.canvasId).height = document.getElementById(this.canvasId).height + event.y;
    };
    ResizableCanvasComponent.prototype.ngAfterViewInit = function () {
        this.zAnimator = zAnimator.create(this.canvasId);
        this.zAnimatorService.init(this.zAnimator);
    };
    return ResizableCanvasComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ResizableCanvasComponent.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ResizableCanvasComponent.prototype, "height", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ResizableCanvasComponent.prototype, "animatorInitialized", void 0);
ResizableCanvasComponent = __decorate([
    core_1.Component({
        selector: 'my-resizable-canvas',
        templateUrl: './resizable-canvas.component.html',
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [zanimator_service_1.ZAnimatorService])
], ResizableCanvasComponent);
exports.ResizableCanvasComponent = ResizableCanvasComponent;
//# sourceMappingURL=resizable-canvas.component.js.map