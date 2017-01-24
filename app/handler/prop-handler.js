import prepareOptions from './options-preparer';
import idPool from '../id-pool';

export default function(options){
  var handler = {};

  handler.handle = function(data){

    prepareOptions(data.options);

    for(var param in data.options){
      idPool[data.id][param] = data.options[param];
    }
    idPool[data.id].draw();
  };

  return handler;
}
