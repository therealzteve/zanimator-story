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
var TimelineComponent = (function () {
    function TimelineComponent(selectionService) {
        this.selectionService = selectionService;
    }
    TimelineComponent.prototype.addTimeslot = function () {
        this.story.timeSlots.push([]);
    };
    TimelineComponent.prototype.selectSlot = function (slot) {
        this.selectionService.setSelectedSlot(slot);
    };
    return TimelineComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TimelineComponent.prototype, "story", void 0);
TimelineComponent = __decorate([
    core_1.Component({
        selector: 'my-story-timeline',
        templateUrl: './timeline.component.html',
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [selection_service_1.SelectionService])
], TimelineComponent);
exports.TimelineComponent = TimelineComponent;
//# sourceMappingURL=timeline.component.js.map