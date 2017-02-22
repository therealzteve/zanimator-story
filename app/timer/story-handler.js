import timer from './timer';
import constructStoryReader from '../story-reader';
import idPool from '../id-pool';

export default function(options){
  var internalTimer = timer(handler);
  var storyReader = constructStoryReader({zAnimator: options.zAnimator});
  var storyHandler = {};
  storyHandler.timePassed = 0;
  storyHandler.interval = 100; // ~60 fps
  storyHandler.lastFrame = -1;
  storyHandler.story = false;

  storyHandler.start = function(){
      console.log('starting new story');
      idPool.init(options.zAnimator.mainContainer);
      storyHandler.timePassed = 0;
      storyHandler.lastFrame = -1;
      storyHandler.play();
  };

  storyHandler.stop = function(){
      storyHandler.pause();
      storyHandler.timePassed = 0;
      storyHandler.lastFrame = -1;
      idPool.clean();
  };

  storyHandler.play = function(){
    if(storyHandler.story){
      if(storyHandler.story.interval){
        storyHandler.interval = storyHandler.story.interval;
      }
      internalTimer.start();
    }else{
      console.warn('No story was set before. Aborting play.');
    }
  };

  storyHandler.pause = function(){
    internalTimer.stop();
  };

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
    idPool.update();
    if(checkIfFinished()){
      storyHandler.stop();
    }
  };

  function handler(time){
    storyHandler.timePassed += time;

    tellStory();
  }

  return storyHandler;
}
