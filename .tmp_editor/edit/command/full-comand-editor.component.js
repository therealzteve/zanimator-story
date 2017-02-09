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
var FullCommandEditorComponent = (function () {
    function FullCommandEditorComponent(fullCommandEditorService) {
        this.fullCommandEditorService = fullCommandEditorService;
    }
    FullCommandEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fullCommandEditorService.onNewCommandToEdit.subscribe(function (command) {
            _this.command = command;
        });
    };
    FullCommandEditorComponent.prototype.openEditor = function () {
    };
    FullCommandEditorComponent.prototype.saveChanges = function () {
    };
    FullCommandEditorComponent.prototype.cancelEdit = function () {
    };
    return FullCommandEditorComponent;
}());
FullCommandEditorComponent = __decorate([
    core_1.Component({
        selector: 'my-full-command-edit',
        templateUrl: './full-command-editor.component.html',
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [command_edit_service_1.FullCommandEditorService])
], FullCommandEditorComponent);
exports.FullCommandEditorComponent = FullCommandEditorComponent;
//# sourceMappingURL=full-comand-editor.component.js.map