import idPool from '../id-pool';

export default function(){
  var handler = {};

  handler.handle = function(data){
    idPool.get(data.id).stop();
  };

  return handler;
}
