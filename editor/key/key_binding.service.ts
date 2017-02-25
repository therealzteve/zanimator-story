import { Injectable } from '@angular/core';
import { ClipboardService } from '../edit/clipboard/clipboard.service';
import { UndoService } from '../edit/undo/undo.service';

@Injectable()
export class KeyBindingService {
  constructor(private clipboardService: ClipboardService, private undoService: UndoService) {
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

    Mousetrap.bind('ctrl+z', function(e) {
      console.log('undo');
      undoService.undo();
      return false;
    });


    Mousetrap.bind('ctrl+y', function(e) {
      console.log('redo');
      undoService.redo();
      return false;
    });
  }

}
