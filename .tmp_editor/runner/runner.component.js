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
var stories_service_1 = require("../stories/stories.service");
var zanimator_service_1 = require("../zanimator/zanimator.service");
var RunnerComponent = (function () {
    function RunnerComponent(storiesService, zAnimatorService) {
        var _this = this;
        this.storiesService = storiesService;
        this.zAnimatorService = zAnimatorService;
        zAnimatorService.animatorReady.subscribe(function (animator) {
            _this.storyHandler = zAnimatorStory.create({ interval: 1000, zAnimator: animator });
            //zAniStory.play(storiesService.currentStory);
        });
    }
    RunnerComponent.prototype.getCurrentStoryTitle = function () {
        if (this.storiesService.currentStory) {
            return this.storiesService.currentStory.title;
        }
    };
    RunnerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.storiesService.storiesServiceInitialized.subscribe(function () {
            _this.storyHandler.play(_this.storiesService.currentStory);
        });
    };
    return RunnerComponent;
}());
RunnerComponent = __decorate([
    core_1.Component({
        selector: 'my-runner',
        templateUrl: './runner.component.html',
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [stories_service_1.StoriesService, zanimator_service_1.ZAnimatorService])
], RunnerComponent);
exports.RunnerComponent = RunnerComponent;
//# sourceMappingURL=runner.component.js.map