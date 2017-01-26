import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

declare var zAnimator;

@Injectable()
export class ZAnimatorService {
  public animatorReady = new Subject();
  public zAnimator;

  constructor() {
  }

  public init(zAnimator){
    this.zAnimator = zAnimator;
    this.animatorReady.next(this.zAnimator);
  }

}
