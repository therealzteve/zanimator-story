import timer from './timer';
import storyReader from '../story-reader';

export default function(){
  var internalTimer = timer(handler);
  var storyHandler = {};
  storyHandler.timePassed = 0;
  storyHandler.interval = 100; // ~60 fps
  storyHandler.lastFrame = -1;
  storyHandler.story = false;

  storyHandler.start = function(){
      storyHandler.timePassed = 0;
      storyHandler.play();
  };

  storyHandler.stop = function(){
      storyHandler.pause();
      storyHandler.timePassed = 0;
      console.log('stopped');
  };

  storyHandler.play = function(){
    if(storyHandler.story){
      internalTimer.start();
    }else{
      console.warn('No story was set before. Aborting play.');
    }
  };

  storyHandler.pause = function(){
    internalTimer.stop();
  };

  function handler(time){
    storyHandler.timePassed += time;

    tellStory();
  }

  function checkIfFinished(){
    for(var i = 0; i < storyHandler.story.timeSlots.length; i++){
      var timeSlotIndex = Math.floor((storyHandler.timePassed / storyHandler.interval) / Math.pow(2, i));
      if(timeSlotIndex < storyHandler.story.timeSlots[i].length){
          return false;
      }
    }
    return true;
  }

  var tellStory = function(){

    // Handle each timeslots
    for(var i = 0; i < storyHandler.story.timeSlots.length; i++){
      var timeSlotIndex = Math.floor((storyHandler.timePassed / storyHandler.interval) / Math.pow(2, i));
      if(timeSlotIndex > storyHandler.lastFrame / Math.pow(2, i)){
        if(timeSlotIndex >= storyHandler.story.timeSlots[i].length){
          continue;
        }
        storyReader.read(storyHandler.story.timeSlots[i][timeSlotIndex]);
      }
    }
    storyHandler.lastFrame = Math.floor(storyHandler.timePassed / storyHandler.interval);

    if(checkIfFinished()){
      storyHandler.stop();
    }
  };

  return storyHandler;
}
