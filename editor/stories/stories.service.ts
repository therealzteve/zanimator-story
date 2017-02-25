import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Injectable()
export class StoriesService {


  public stories = [];
  public currentStory;
  public storiesServiceInitialized = new Subject();
  public onStoryChanged = new Subject();

  constructor(private http:Http) {
      // Load first sample story
     this.http.get('/test/test.json').map((res:Response) => res.json()).subscribe(
       data => {
         this.addStory(data);
         this.selectStory(0);
         this.storiesServiceInitialized.next();
         this.onStoryChanged.next()
       }
     );
  }


  public addStory(story){
    this.stories.push(story);
  }

  public selectStory(number){
    this.currentStory = this.stories[number];
  }

}
