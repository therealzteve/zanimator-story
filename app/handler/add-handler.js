import prepareOptions from './options-preparer';

export default function(options){
  var handler = {};

  handler.handle = function(data){
    data = prepareOptions(data);
    data.parent.add(data.child);
  };

  return handler;
}
