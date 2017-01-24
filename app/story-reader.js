import createHandler from './handler/create-handler';
import addHandler from './handler/add-handler';
import propHandler from './handler/prop-handler';
import startHandler from './handler/start-handler';
import stopHandler from './handler/stop-handler';
import idPool from './id-pool';

export default function(options){
  var storyReader = {};

  idPool['0'] = options.zAnimator.mainContainer;

  storyReader.handlers = {};
  storyReader.handlers.create = createHandler({zAnimator: options.zAnimator});
  storyReader.handlers.add = addHandler({zAnimator: options.zAnimator});
  storyReader.handlers.prop = propHandler({});
  storyReader.handlers.start = startHandler();
  storyReader.handlers.stop = stopHandler();

  storyReader.read = function(storyPart){
    for(var command of storyPart){
      storyReader.handlers[command.action].handle(command.data);
    }
  };

  return storyReader;
}
