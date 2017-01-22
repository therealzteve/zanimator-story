import createHandler from './handler/create-handler';
import addHandler from './handler/add-handler';

export default function(options){
  var storyReader = {};
  var idPool = {};

  storyReader.handlers = {};
  storyReader.handlers.create = createHandler({'idPool': idPool, zAnimator: options.zAnimator});
  storyReader.handlers.add = addHandler({'idPool': idPool, zAnimator: options.zAnimator});

  storyReader.read = function(storyPart){
    for(var command of storyPart){
      storyReader.handlers[command.action].handle(command.data);
    }
  };

  return storyReader;
}
