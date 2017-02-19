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
var angular2_hotkeys_1 = require("angular2-hotkeys");
var KeyBindingService = (function () {
    function KeyBindingService(hotkeysService) {
        this.hotkeysService = hotkeysService;
        this.hotkeysService.add(new angular2_hotkeys_1.Hotkey('strg+c', function (event) {
            console.log('Typed hotkey');
            return false; // Prevent bubbling
        }));
    }
    return KeyBindingService;
}());
KeyBindingService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [angular2_hotkeys_1.HotkeysService])
], KeyBindingService);
exports.KeyBindingService = KeyBindingService;
//# sourceMappingURL=key_binding.service.js.map