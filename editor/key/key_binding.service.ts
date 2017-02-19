import { Injectable } from '@angular/core';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Injectable()
export class KeyBindingService {
  constructor(private hotkeysService: HotkeysService) {
    this.hotkeysService.add(new Hotkey('strg+c', (event: KeyboardEvent): boolean => {
        console.log('Typed hotkey');
        return false; // Prevent bubbling
    }));

  }

}
