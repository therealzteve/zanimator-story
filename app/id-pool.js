var idPool = function(){
  var poolObject = {};
  var pool = {};

  poolObject.init = function(mainContainer){
    pool['0'] = mainContainer;
  };

  poolObject.clean = function(){
    if(pool['0']){
      pool['0'].removeAll();
      pool = {};
    }
  };

  poolObject.get = function(id){
    console.log('get ' + id);
    return pool[id];
  };

  poolObject.set = function(id, value){
    console.log('set ' + id);
    pool[id] = value;
  };

  poolObject.update = function(){
    for(var id in pool){
      if(pool[id].draw){
        pool[id].draw();
      }
    }
  };

  return poolObject;
};

export default idPool();
