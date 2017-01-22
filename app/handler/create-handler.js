export default function(options){
  var handler = {};

  handler.handle = function(data){
    console.log(data);

    var path = options.zAnimator;
    for(var typePart of data.type.split('.')){
      path = path[typePart];
    }
    prepareOptions(data.options);
    options.idPool[data.id] = path(data.options);
  };

  function prepareOptions(ops){
    for(var parameter in ops){
      if( typeof ops[parameter] === 'string' && ops[parameter].substring(0, 1) === '$'){
        ops[parameter] = options.idPool[ops[parameter].substring(1)];
      }
    }
  }

  return handler;
}
