import idPool from '../id-pool';

export default function(){
  var handler = {};

  handler.handle = function(data){
    idPool[data.id].start();
  };

  return handler;
}
