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
var selection_service_1 = require("../selection/selection.service");
var stories_service_1 = require("../../stories/stories.service");
var ClipboardService = (function () {
    function ClipboardService(selectionService, storiesService) {
        this.selectionService = selectionService;
        this.storiesService = storiesService;
    }
    ClipboardService.prototype.copy = function () {
        this.storedSlot = this.selectionService.selectedSlot;
        this.storedBlock = this.selectionService.selectedBlock;
        this.storedCommand = this.selectionService.selectedCommand;
    };
    ClipboardService.prototype.paste = function () {
        if (this.storedCommand) {
            return this.handleCommandPaste();
        }
        if (this.storedBlock) {
            return this.handleBlockPaste();
        }
        if (this.storedSlot) {
            return this.handleSlotPaste();
        }
    };
    ClipboardService.prototype.handleCommandPaste = function () {
        var selBlock = this.selectionService.selectedBlock;
        var selCmd = this.selectionService.selectedCommand;
        if (!selBlock) {
            return;
        }
        var cmdIndex = selBlock.indexOf(selCmd);
        if (cmdIndex === -1) {
            selBlock.push(JSON.parse(JSON.stringify(this.storedCommand)));
        }
        else {
            selBlock.splice(cmdIndex, 0, JSON.parse(JSON.stringify(this.storedCommand)));
        }
    };
    ClipboardService.prototype.handleBlockPaste = function () {
        var selSlot = this.selectionService.selectedSlot;
        var selBlock = this.selectionService.selectedBlock;
        if (!selSlot) {
            return;
        }
        var blockIndex = selSlot.indexOf(selBlock);
        if (blockIndex === -1) {
            selSlot.push(JSON.parse(JSON.stringify(this.storedBlock)));
        }
        else {
            selSlot.splice(blockIndex, 0, JSON.parse(JSON.stringify(this.storedBlock)));
        }
    };
    ClipboardService.prototype.handleSlotPaste = function () {
        var selSlot = this.selectionService.selectedSlot;
        var slotIndex = this.storiesService.currentStory.timeSlots.indexOf(slotIndex);
        if (slotIndex === -1) {
            this.storiesService.currentStory.timeSlots.push(JSON.parse(JSON.stringify(this.storedSlot)));
        }
        else {
            this.storiesService.currentStory.timeSlots.splice(slotIndex, 0, JSON.parse(JSON.stringify(this.storedSlot)));
        }
    };
    return ClipboardService;
}());
ClipboardService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [selection_service_1.SelectionService, stories_service_1.StoriesService])
], ClipboardService);
exports.ClipboardService = ClipboardService;
//# sourceMappingURL=clipboard.service.js.map