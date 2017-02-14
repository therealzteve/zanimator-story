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
var command_edit_service_1 = require("./command-edit.service");
var command_description_service_1 = require("./description/command-description.service");
var FullCommandEditorComponent = (function () {
    function FullCommandEditorComponent(fullCommandEditorService, commandDescriptionService) {
        this.fullCommandEditorService = fullCommandEditorService;
        this.commandDescriptionService = commandDescriptionService;
    }
    FullCommandEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fullCommandEditorService.onNewCommandToEdit.subscribe(function (command) {
            setTimeout(function () { _this.command = command; _this.initEdit(); });
        });
    };
    FullCommandEditorComponent.prototype.initEdit = function () {
        this.tempCommand = JSON.parse(JSON.stringify(this.command));
        if (!this.tempCommand.data) {
            this.tempCommand.data = {};
        }
        this.editData = this.tempCommand.data;
        for (var _i = 0, _a = this.getProperties(); _i < _a.length; _i++) {
            var prop = _a[_i];
            if (prop.type === "json") {
                this.editData[prop.name] = JSON.stringify(this.editData[prop.name]);
            }
        }
    };
    FullCommandEditorComponent.prototype.saveChanges = function () {
        this.command.action = this.tempCommand.action;
        for (var _i = 0, _a = this.getProperties(); _i < _a.length; _i++) {
            var prop = _a[_i];
            if (prop.type === "json") {
                this.editData[prop.name] = JSON.parse(this.editData[prop.name]);
            }
        }
        this.command.data = this.editData;
        this.command = null;
        this.tempCommand = null;
    };
    FullCommandEditorComponent.prototype.cancelEdit = function () {
        this.command = null;
        this.tempCommand = null;
    };
    FullCommandEditorComponent.prototype.getProperties = function () {
        if (this.tempCommand.action) {
            return this.commandDescriptionService.getDescriptionOf(this.tempCommand.action).properties;
        }
        return [];
    };
    return FullCommandEditorComponent;
}());
FullCommandEditorComponent = __decorate([
    core_1.Component({
        selector: 'my-full-command-edit',
        templateUrl: './full-command-editor.component.html',
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [command_edit_service_1.FullCommandEditorService,
        command_description_service_1.CommandDescriptionService])
], FullCommandEditorComponent);
exports.FullCommandEditorComponent = FullCommandEditorComponent;
//# sourceMappingURL=full-comand-editor.component.js.map