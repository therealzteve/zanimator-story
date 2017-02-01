import storyHandler from './timer/story-handler';

export function create(options) {
  var zAnimator = options.zAnimator;
  var sHandler = storyHandler({zAnimator: zAnimator});
  if(options.interval){
    sHandler.interval = options.interval;
  }

  return {
    play: function(story){
      sHandler.story = JSON.parse(JSON.stringify(story));
      sHandler.start();
    },
    stop: function(){
      sHandler.stop();
    }
  };
}
