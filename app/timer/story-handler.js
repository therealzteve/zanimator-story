import timer from './timer';
import storyReader from '../story-reader';

export default function(story){

  var storyHandler = {};
  storyHandler.timePassed = 0;
  storyHandler.interval = 17; // ~60 fps
  storyHandler.lastFrame = -1;
  storyHandler.story = story;

  var internalTimer = timer(handler);

  function handler(time){
    storyHandler.timePassed += time;

    tellStory();
  }

  var tellStory = function(){

    // Handle each timeslots
    for(var i = 0; i < storyHandler.story.timeSlots.length; i++){
      var timeSlotIndex = Math.floor((storyHandler.timePassed / storyHandler.interval)/i);
      if(timeSlotIndex > storyHandler.lastFrame / i ){
        storyReader.read(storyHandler.story.timeSlots[i]);
      }
    }
    storyHandler.lastFrame = Math.floor(storyHandler.timePassed / storyHandler.interval);
  }
}
