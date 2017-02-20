import { Injectable } from '@angular/core';
import { ClipboardService } from '../edit/clipboard/clipboard.service';

@Injectable()
export class KeyBindingService {
  constructor(private clipboardService: ClipboardService) {
    var Mousetrap = require('/node_modules/mousetrap/mousetrap.js');
    Mousetrap.bind('ctrl+c', function(e) {
      console.log('copy');
      clipboardService.copy();
      return false;
    });

    Mousetrap.bind('ctrl+v', function(e) {
      console.log('paste');
      clipboardService.paste();
      return false;
    });

  }

}
