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
var ng2_dragula_1 = require("ng2-dragula");
var stories_service_1 = require("../../stories/stories.service");
var command_edit_service_1 = require("../command/command-edit.service");
var TimeslotComponent = (function () {
    function TimeslotComponent(selectionService, dragulaService, storiesService, fullCommandEditorService) {
        this.selectionService = selectionService;
        this.dragulaService = dragulaService;
        this.storiesService = storiesService;
        this.fullCommandEditorService = fullCommandEditorService;
        this.onDeleteSlot = new core_1.EventEmitter();
        // Needed because otherwise there is an error from dragula because bag already exists
        var bag = this.dragulaService.find('bag-block');
        if (bag !== undefined)
            this.dragulaService.destroy('bag-block');
        this.dragulaService.setOptions('bag-block', {
            removeOnSpill: false,
            moves: function (el, container, target) {
                if (target.classList) {
                    return target.classList.contains('timeslot-timeblock');
                }
                return false;
            }
        });
    }
    TimeslotComponent.prototype.ngOnInit = function () { };
    TimeslotComponent.prototype.addBlock = function () {
        this.timeslot.push([]);
        this.storiesService.onStoryChanged.next();
    };
    TimeslotComponent.prototype.addCommandToBlock = function (block) {
        var _this = this;
        var newCommand = {};
        this.fullCommandEditorService.editCommand(newCommand);
        var saveSubscription = this.fullCommandEditorService.onSaved.subscribe(function () {
            saveSubscription.unsubscribe();
            cancelSubscription.unsubscribe();
            block.push(newCommand);
            _this.storiesService.onStoryChanged.next();
        });
        var cancelSubscription = this.fullCommandEditorService.onCancel.subscribe(function () {
            saveSubscription.unsubscribe();
            cancelSubscription.unsubscribe();
        });
    };
    TimeslotComponent.prototype.deleteCommand = function (block, command) {
        var index = block.indexOf(command);
        if (index > -1) {
            block.splice(index, 1);
            this.storiesService.onStoryChanged.next();
        }
    };
    TimeslotComponent.prototype.deleteBlock = function (block) {
        var index = this.timeslot.indexOf(block);
        if (index > -1) {
            this.timeslot.splice(index, 1);
            this.storiesService.onStoryChanged.next();
        }
    };
    TimeslotComponent.prototype.deleteSlot = function () {
        this.onDeleteSlot.emit();
    };
    TimeslotComponent.prototype.selectBlock = function (block) {
        this.selectionService.setSelectedBlock(block);
    };
    TimeslotComponent.prototype.selectCommand = function (command) {
        this.selectionService.setSelectedCommand(command);
    };
    TimeslotComponent.prototype.isSelectedSlot = function () {
        return (this.selectionService.selectedSlot === this.timeslot
            && !this.selectionService.selectedBlock
            && !this.selectionService.selectedCommand);
    };
    TimeslotComponent.prototype.isSelectedBlock = function (block) {
        return (this.selectionService.selectedBlock === block
            && !this.selectionService.selectedCommand);
    };
    TimeslotComponent.prototype.isSelectedCommand = function (command) {
        return (this.selectionService.selectedCommand === command);
    };
    return TimeslotComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TimeslotComponent.prototype, "timeslot", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TimeslotComponent.prototype, "onDeleteSlot", void 0);
TimeslotComponent = __decorate([
    core_1.Component({
        selector: 'my-timeslot',
        templateUrl: 'timeslot.component.html',
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [selection_service_1.SelectionService,
        ng2_dragula_1.DragulaService,
        stories_service_1.StoriesService,
        command_edit_service_1.FullCommandEditorService])
], TimeslotComponent);
exports.TimeslotComponent = TimeslotComponent;
//# sourceMappingURL=timeslot.component.js.map