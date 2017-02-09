import prepareOptions from './options-preparer';
import idPool from '../id-pool';

export default function(options){
  var handler = {};

  handler.handle = function(data){
    var path = options.zAnimator;
    for(var typePart of data.type.split('.')){
      path = path[typePart];
    }
    prepareOptions(data.options);
    idPool.set(data.id, path(data.options));
  };

  return handler;
}
