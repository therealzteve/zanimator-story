import idPool from '../id-pool';

var prepareOptions = function(options){

  for(var parameter in options){
    if( typeof options[parameter] === 'string' && options[parameter].substring(0, 1) === '$'){
      options[parameter] = idPool[options[parameter].substring(1)];
    }
  }

  return options;
};

export default prepareOptions;
