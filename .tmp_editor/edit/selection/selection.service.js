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
var SelectionService = (function () {
    function SelectionService() {
    }
    SelectionService.prototype.setSelectedSlot = function (slot) {
        this.getTemporarySelected().slot = slot;
    };
    SelectionService.prototype.setSelectedLine = function (line) {
        this.getTemporarySelected().line = line;
        this.updateSelected();
    };
    SelectionService.prototype.setSelectedCommand = function (command) {
        this.getTemporarySelected().command = command;
    };
    SelectionService.prototype.getTemporarySelected = function () {
        if (!this.temporarySelected) {
            this.temporarySelected = {};
        }
        return this.temporarySelected;
    };
    SelectionService.prototype.updateSelected = function () {
        this.selectedSlot = this.getTemporarySelected().slot;
        this.selectedLine = this.getTemporarySelected().line;
        this.selectedCommand = this.getTemporarySelected().command;
        this.temporarySelected = null;
    };
    return SelectionService;
}());
SelectionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], SelectionService);
exports.SelectionService = SelectionService;
//# sourceMappingURL=selection.service.js.map