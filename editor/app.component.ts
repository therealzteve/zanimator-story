import { Component, HostListener } from '@angular/core';
import { KeyBindingService } from './key/key_binding.service';
declare var zAnimator: any;


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  moduleId: module.id
})
export class AppComponent {
  private zAnimator;

  constructor(private KeyBindingService: KeyBindingService){

  }


}
