import storyHandler from './timer/story-handler';

export function create(options) {

  var sHandler = storyHandler();
  if(options.interval){
    sHandler.interval = options.interval;
  }
  
  return {
    play : function(story){
      sHandler.story = story;
      sHandler.start();
    },
    stop: function(){
      sHandler.stop();
    }
  };
}
