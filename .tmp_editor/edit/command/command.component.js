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
var command_edit_service_1 = require("./command-edit.service");
var CommandEditComponent = (function () {
    function CommandEditComponent(fullCommandEditorService) {
        this.fullCommandEditorService = fullCommandEditorService;
        this.commandDeleted = new core_1.EventEmitter();
        this.editMode = false;
        this.editData = '';
        this.deleteButtonVisible = false;
    }
    CommandEditComponent.prototype.ngOnInit = function () {
        if (!this.command.action) {
            this.fullCommandEditorService.editCommand(this.command);
        }
    };
    CommandEditComponent.prototype.openEditor = function () {
        this.editMode = true;
        this.editData = JSON.stringify(this.command.data);
    };
    CommandEditComponent.prototype.openFullEditor = function () {
        this.fullCommandEditorService.editCommand(this.command);
        this.cancelEdit();
    };
    CommandEditComponent.prototype.saveChanges = function () {
        this.command.data = JSON.parse(this.editData);
        this.editMode = false;
    };
    CommandEditComponent.prototype.cancelEdit = function () {
        this.editMode = false;
    };
    CommandEditComponent.prototype.removeCommand = function () {
        this.commandDeleted.emit();
    };
    CommandEditComponent.prototype.showDeleteButton = function () {
        this.deleteButtonVisible = true;
    };
    CommandEditComponent.prototype.hideDeleteButton = function () {
        this.deleteButtonVisible = false;
    };
    return CommandEditComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CommandEditComponent.prototype, "command", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CommandEditComponent.prototype, "commandDeleted", void 0);
CommandEditComponent = __decorate([
    core_1.Component({
        selector: 'my-command-edit',
        templateUrl: './command.component.html',
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [command_edit_service_1.FullCommandEditorService])
], CommandEditComponent);
exports.CommandEditComponent = CommandEditComponent;
//# sourceMappingURL=command.component.js.map