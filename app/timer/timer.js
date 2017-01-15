export default function(callback){
  var timer = {};

  timer.start =  function(){
      createjs.Ticker.addEventListener('tick', timer.handle);
  };

  timer.stop = function(){
      createjs.Ticker.removeEventListener('tick', timer.handle);
  };

  timer.handle = function(event){
    callback(event.delta);
  };

  return timer;
}
