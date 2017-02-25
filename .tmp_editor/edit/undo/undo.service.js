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
var stories_service_1 = require("../../stories/stories.service");
var UndoService = (function () {
    function UndoService(storiesService) {
        var _this = this;
        this.storiesService = storiesService;
        this.storyStates = [];
        this.currentHistoryIndex = -1;
        this.storiesService.onStoryChanged.subscribe(function () { _this.saveState(); });
    }
    UndoService.prototype.saveState = function () {
        this.currentHistoryIndex++;
        this.storyStates = this.storyStates.slice(0, this.currentHistoryIndex + 1);
        this.storyStates.push(JSON.parse(JSON.stringify(this.storiesService.currentStory)));
    };
    UndoService.prototype.undo = function () {
        if (this.currentHistoryIndex > 0) {
            this.currentHistoryIndex--;
            this.storiesService.currentStory = this.storyStates[this.currentHistoryIndex];
        }
    };
    UndoService.prototype.redo = function () {
        if (this.currentHistoryIndex < this.storyStates.length - 1) {
            this.currentHistoryIndex++;
            this.storiesService.currentStory = this.storyStates[this.currentHistoryIndex];
        }
    };
    return UndoService;
}());
UndoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [stories_service_1.StoriesService])
], UndoService);
exports.UndoService = UndoService;
//# sourceMappingURL=undo.service.js.map