export default function(options){
  var handler = {};

  handler.handle = function(data){
    console.log(data);
  };

  return handler;
}
