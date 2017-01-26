import { Component, OnInit } from '@angular/core';
import { StoriesService } from '../stories/stories.service';
import { ZAnimatorService } from '../zanimator/zanimator.service';
declare var zAnimatorStory;

@Component({
  selector: 'my-runner',
  templateUrl: './runner.component.html',
  moduleId: module.id
})
export class RunnerComponent implements OnInit{

  private storyHandler;

  constructor(private storiesService: StoriesService, private zAnimatorService: ZAnimatorService){
    zAnimatorService.animatorReady.subscribe((animator) =>{
        this.storyHandler = zAnimatorStory.create({interval: 1000, zAnimator: animator});
        //zAniStory.play(storiesService.currentStory);
    });
  }

  public getCurrentStoryTitle(){
    if(this.storiesService.currentStory){
      return this.storiesService.currentStory.title;
    }
  }

  public ngOnInit(){
    this.storiesService.storiesServiceInitialized.subscribe(() => {
      this.storyHandler.play(this.storiesService.currentStory);
    });
  }

}
