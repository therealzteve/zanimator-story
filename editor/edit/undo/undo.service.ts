import { Injectable } from '@angular/core';
import { StoriesService } from '../../stories/stories.service';

@Injectable()
export class UndoService {

  public storyStates;
  public currentHistoryIndex;

  constructor(private storiesService: StoriesService) {
    this.storyStates = [];
    this.currentHistoryIndex = -1;
    this.storiesService.onStoryChanged.subscribe(() => {this.saveState()});
  }

  public saveState(){
    this.currentHistoryIndex++;
    this.storyStates = this.storyStates.slice(0, this.currentHistoryIndex + 1);
    this.storyStates.push(JSON.parse(JSON.stringify(this.storiesService.currentStory)));
  }

  public undo(){
    if(this.currentHistoryIndex > 0){
      this.currentHistoryIndex--;
      this.storiesService.currentStory = this.storyStates[this.currentHistoryIndex];
    }
  }

  public redo(){
    if(this.currentHistoryIndex < this.storyStates.length - 1){
      this.currentHistoryIndex++;
      this.storiesService.currentStory = this.storyStates[this.currentHistoryIndex];
    }
  }
}
