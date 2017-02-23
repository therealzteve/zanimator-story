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
var DragControlComponent = (function () {
    function DragControlComponent() {
        var _this = this;
        this.onDrag = new core_1.EventEmitter();
        this.active = false;
        this.dragStartPoint = { x: 0, y: 0 };
        this.deactivate = function () {
            document.removeEventListener("mousemove", _this.windowCallback);
            document.removeEventListener("mouseup", _this.deactivate);
        };
        this.windowCallback = function (event) {
            if (document.selection) {
                document.selection.empty();
            }
            else {
                window.getSelection().removeAllRanges();
            }
            _this.onDrag.emit({ x: event.clientX - _this.dragStartPoint.x,
                y: event.clientY - _this.dragStartPoint.y });
            _this.dragStartPoint.x = event.clientX;
            _this.dragStartPoint.y = event.clientY;
        };
    }
    DragControlComponent.prototype.activate = function (event) {
        this.dragStartPoint.x = event.clientX;
        this.dragStartPoint.y = event.clientY;
        document.addEventListener("mousemove", this.windowCallback);
        document.addEventListener("mouseup", this.deactivate);
    };
    return DragControlComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DragControlComponent.prototype, "onDrag", void 0);
DragControlComponent = __decorate([
    core_1.Component({
        selector: 'my-drag-control',
        templateUrl: './drag-control.component.html',
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [])
], DragControlComponent);
exports.DragControlComponent = DragControlComponent;
//# sourceMappingURL=drag-control.component.js.map