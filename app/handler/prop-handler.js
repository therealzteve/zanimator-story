import prepareOptions from './options-preparer';
import idPool from '../id-pool';

export default function(options){
  var handler = {};

  handler.handle = function(data){

    prepareOptions(data.options);

    for(var param in data.options){
      idPool.get(data.id)[param] = data.options[param];
    }
  };

  return handler;
}
