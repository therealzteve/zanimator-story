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
var core_1 = require("@angular/core");
var selection_service_1 = require("../selection/selection.service");
var TimeslotComponent = (function () {
    function TimeslotComponent(selectionService) {
        this.selectionService = selectionService;
    }
    TimeslotComponent.prototype.ngOnInit = function () { };
    TimeslotComponent.prototype.addBlock = function () {
        this.timeslot.push([]);
    };
    TimeslotComponent.prototype.addCommandToBlock = function (block) {
        block.push({});
    };
    TimeslotComponent.prototype.selectBlock = function (block) {
        this.selectionService.setSelectedBlock(block);
    };
    TimeslotComponent.prototype.selectCommand = function (command) {
        this.selectionService.setSelectedCommand(command);
    };
    TimeslotComponent.prototype.isSelectedSlot = function () {
        return (this.selectionService.selectedSlot === this.timeslot);
    };
    return TimeslotComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TimeslotComponent.prototype, "timeslot", void 0);
TimeslotComponent = __decorate([
    core_1.Component({
        selector: 'my-timeslot',
        templateUrl: 'timeslot.component.html',
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [selection_service_1.SelectionService])
], TimeslotComponent);
exports.TimeslotComponent = TimeslotComponent;
//# sourceMappingURL=timeslot.component.js.map