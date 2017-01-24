import prepareOptions from './options-preparer';

export default function(options){
  var handler = {};

  handler.handle = function(data){
    data = prepareOptions(data);
    data.parent.addChild(data.child.view);
  };

  return handler;
}
