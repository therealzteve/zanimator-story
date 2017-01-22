(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.zAnimatorStory = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options) {
  var handler = {};

  handler.handle = function (data) {
    console.log(data);
  };

  return handler;
};


},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options) {
  var handler = {};

  handler.handle = function (data) {
    console.log(data);

    var path = options.zAnimator;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data.type.split('.')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var typePart = _step.value;

        path = path[typePart];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    prepareOptions(data.options);
    options.idPool[data.id] = path(data.options);
  };

  function prepareOptions(ops) {
    for (var parameter in ops) {
      if (typeof ops[parameter] === 'string' && ops[parameter].substring(0, 1) === '$') {
        ops[parameter] = options.idPool[ops[parameter].substring(1)];
      }
    }
  }

  return handler;
};


},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _storyHandler = require(5);

var _storyHandler2 = _interopRequireDefault(_storyHandler);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function create(options) {
  var zAnimator = options.zAnimator;
  var sHandler = (0, _storyHandler2.default)({ zAnimator: zAnimator });
  if (options.interval) {
    sHandler.interval = options.interval;
  }

  return {
    play: function play(story) {
      sHandler.story = story;
      sHandler.start();
    },
    stop: function stop() {
      sHandler.stop();
    }
  };
}


},{"5":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options) {
  var storyReader = {};
  var idPool = {};

  storyReader.handlers = {};
  storyReader.handlers.create = (0, _createHandler2.default)({ 'idPool': idPool, zAnimator: options.zAnimator });
  storyReader.handlers.add = (0, _addHandler2.default)({ 'idPool': idPool, zAnimator: options.zAnimator });

  storyReader.read = function (storyPart) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = storyPart[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var command = _step.value;

        storyReader.handlers[command.action].handle(command.data);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  return storyReader;
};

var _createHandler = require(2);

var _createHandler2 = _interopRequireDefault(_createHandler);

var _addHandler = require(1);

var _addHandler2 = _interopRequireDefault(_addHandler);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}


},{"1":1,"2":2}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (options) {
  var internalTimer = (0, _timer2.default)(handler);
  var storyReader = (0, _storyReader2.default)({ zAnimator: options.zAnimator });
  var storyHandler = {};
  storyHandler.timePassed = 0;
  storyHandler.interval = 100; // ~60 fps
  storyHandler.lastFrame = -1;
  storyHandler.story = false;

  storyHandler.start = function () {
    storyHandler.timePassed = 0;
    storyHandler.play();
  };

  storyHandler.stop = function () {
    storyHandler.pause();
    storyHandler.timePassed = 0;
    console.log('stopped');
  };

  storyHandler.play = function () {
    if (storyHandler.story) {
      internalTimer.start();
    } else {
      console.warn('No story was set before. Aborting play.');
    }
  };

  storyHandler.pause = function () {
    internalTimer.stop();
  };

  function handler(time) {
    storyHandler.timePassed += time;

    tellStory();
  }

  function checkIfFinished() {
    for (var i = 0; i < storyHandler.story.timeSlots.length; i++) {
      var timeSlotIndex = Math.floor(storyHandler.timePassed / storyHandler.interval / Math.pow(2, i));
      if (timeSlotIndex < storyHandler.story.timeSlots[i].length) {
        return false;
      }
    }
    return true;
  }

  var tellStory = function tellStory() {

    // Handle each timeslots
    for (var i = 0; i < storyHandler.story.timeSlots.length; i++) {
      var timeSlotIndex = Math.floor(storyHandler.timePassed / storyHandler.interval / Math.pow(2, i));
      if (timeSlotIndex > storyHandler.lastFrame / Math.pow(2, i)) {
        if (timeSlotIndex >= storyHandler.story.timeSlots[i].length) {
          continue;
        }
        storyReader.read(storyHandler.story.timeSlots[i][timeSlotIndex]);
      }
    }
    storyHandler.lastFrame = Math.floor(storyHandler.timePassed / storyHandler.interval);

    if (checkIfFinished()) {
      storyHandler.stop();
    }
  };

  return storyHandler;
};

var _timer = require(6);

var _timer2 = _interopRequireDefault(_timer);

var _storyReader = require(4);

var _storyReader2 = _interopRequireDefault(_storyReader);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}


},{"4":4,"6":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (callback) {
  var timer = {};

  timer.start = function () {
    createjs.Ticker.addEventListener('tick', timer.handle);
  };

  timer.stop = function () {
    createjs.Ticker.removeEventListener('tick', timer.handle);
  };

  timer.handle = function (event) {
    callback(event.delta);
  };

  return timer;
};


},{}]},{},[3])(3)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wXFxoYW5kbGVyXFxhZGQtaGFuZGxlci5qcyIsIi50bXBcXGhhbmRsZXJcXGNyZWF0ZS1oYW5kbGVyLmpzIiwiLnRtcFxcbWFpbi5qcyIsIi50bXBcXHN0b3J5LXJlYWRlci5qcyIsIi50bXBcXHRpbWVyXFxzdG9yeS1oYW5kbGVyLmpzIiwiLnRtcFxcdGltZXJcXHRpbWVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFNBQU87QUFEb0MsQ0FBN0M7O0FBSUEsUUFBUSxPQUFSLEdBQWtCLFVBQVUsT0FBVixFQUFtQjtBQUNuQyxNQUFJLFVBQVUsRUFBZDs7QUFFQSxVQUFRLE1BQVIsR0FBaUIsVUFBVSxJQUFWLEVBQWdCO0FBQy9CLFlBQVEsR0FBUixDQUFZLElBQVo7QUFDRCxHQUZEOztBQUlBLFNBQU8sT0FBUDtBQUNELENBUkQ7QUFTQTs7O0FDZkE7O0FBRUEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDLFNBQU87QUFEb0MsQ0FBN0M7O0FBSUEsUUFBUSxPQUFSLEdBQWtCLFVBQVUsT0FBVixFQUFtQjtBQUNuQyxNQUFJLFVBQVUsRUFBZDs7QUFFQSxVQUFRLE1BQVIsR0FBaUIsVUFBVSxJQUFWLEVBQWdCO0FBQy9CLFlBQVEsR0FBUixDQUFZLElBQVo7O0FBRUEsUUFBSSxPQUFPLFFBQVEsU0FBbkI7QUFDQSxRQUFJLDRCQUE0QixJQUFoQztBQUNBLFFBQUksb0JBQW9CLEtBQXhCO0FBQ0EsUUFBSSxpQkFBaUIsU0FBckI7O0FBRUEsUUFBSTtBQUNGLFdBQUssSUFBSSxZQUFZLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsR0FBaEIsRUFBcUIsT0FBTyxRQUE1QixHQUFoQixFQUF5RCxLQUE5RCxFQUFxRSxFQUFFLDRC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USxTQUFSLENBQWI7O0FBRUEsSUFBSSxVQUFVLHVCQUF1QixNQUF2QixDQUFkOztBQUVBLElBQUksZUFBZSxRQUFRLGlCQUFSLENBQW5COztBQUVBLElBQUksZ0JBQWdCLHVCQUF1QixZQUF2QixDQUFwQjs7QUFFQSxTQUFTLHNCQUFULENBQWdDLEdBQWhDLEVBQXFDO0FBQUUsU0FBTyxPQUFPLElBQUksVUFBWCxHQUF3QixHQUF4QixHQUE4QixFQUFFLFNBQVMsR0FBWCxFQUFyQztBQUF3RDtBQUMvRjs7O0FDckZBOztBQUVBLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQyxTQUFPO0FBRG9DLENBQTdDOztBQUlBLFFBQVEsT0FBUixHQUFrQixVQUFVLFFBQVYsRUFBb0I7QUFDcEMsTUFBSSxRQUFRLEVBQVo7O0FBRUEsUUFBTSxLQUFOLEdBQWMsWUFBWTtBQUN4QixhQUFTLE1BQVQsQ0FBZ0IsZ0JBQWhCLENBQWlDLE1BQWpDLEVBQXlDLE1BQU0sTUFBL0M7QUFDRCxHQUZEOztBQUlBLFFBQU0sSUFBTixHQUFhLFlBQVk7QUFDdkIsYUFBUyxNQUFULENBQWdCLG1CQUFoQixDQUFvQyxNQUFwQyxFQUE0QyxNQUFNLE1BQWxEO0FBQ0QsR0FGRDs7QUFJQSxRQUFNLE1BQU4sR0FBZSxVQUFVLEtBQVYsRUFBaUI7QUFDOUIsYUFBUyxNQUFNLEtBQWY7QUFDRCxHQUZEOztBQUlBLFNBQU8sS0FBUDtBQUNELENBaEJEO0FBaUJBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB2YXIgaGFuZGxlciA9IHt9O1xuXG4gIGhhbmRsZXIuaGFuZGxlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgfTtcblxuICByZXR1cm4gaGFuZGxlcjtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hZGQtaGFuZGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgdmFyIGhhbmRsZXIgPSB7fTtcblxuICBoYW5kbGVyLmhhbmRsZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICB2YXIgcGF0aCA9IG9wdGlvbnMuekFuaW1hdG9yO1xuICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gZGF0YS50eXBlLnNwbGl0KCcuJylbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgIHZhciB0eXBlUGFydCA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgIHBhdGggPSBwYXRoW3R5cGVQYXJ0XTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcmVwYXJlT3B0aW9ucyhkYXRhLm9wdGlvbnMpO1xuICAgIG9wdGlvbnMuaWRQb29sW2RhdGEuaWRdID0gcGF0aChkYXRhLm9wdGlvbnMpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHByZXBhcmVPcHRpb25zKG9wcykge1xuICAgIGZvciAodmFyIHBhcmFtZXRlciBpbiBvcHMpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3BzW3BhcmFtZXRlcl0gPT09ICdzdHJpbmcnICYmIG9wc1twYXJhbWV0ZXJdLnN1YnN0cmluZygwLCAxKSA9PT0gJyQnKSB7XG4gICAgICAgIG9wc1twYXJhbWV0ZXJdID0gb3B0aW9ucy5pZFBvb2xbb3BzW3BhcmFtZXRlcl0uc3Vic3RyaW5nKDEpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gaGFuZGxlcjtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcmVhdGUtaGFuZGxlci5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY3JlYXRlID0gY3JlYXRlO1xuXG52YXIgX3N0b3J5SGFuZGxlciA9IHJlcXVpcmUoJy4vdGltZXIvc3RvcnktaGFuZGxlcicpO1xuXG52YXIgX3N0b3J5SGFuZGxlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdG9yeUhhbmRsZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBjcmVhdGUob3B0aW9ucykge1xuICB2YXIgekFuaW1hdG9yID0gb3B0aW9ucy56QW5pbWF0b3I7XG4gIHZhciBzSGFuZGxlciA9ICgwLCBfc3RvcnlIYW5kbGVyMi5kZWZhdWx0KSh7IHpBbmltYXRvcjogekFuaW1hdG9yIH0pO1xuICBpZiAob3B0aW9ucy5pbnRlcnZhbCkge1xuICAgIHNIYW5kbGVyLmludGVydmFsID0gb3B0aW9ucy5pbnRlcnZhbDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGxheTogZnVuY3Rpb24gcGxheShzdG9yeSkge1xuICAgICAgc0hhbmRsZXIuc3RvcnkgPSBzdG9yeTtcbiAgICAgIHNIYW5kbGVyLnN0YXJ0KCk7XG4gICAgfSxcbiAgICBzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgc0hhbmRsZXIuc3RvcCgpO1xuICAgIH1cbiAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1haW4uanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIHZhciBzdG9yeVJlYWRlciA9IHt9O1xuICB2YXIgaWRQb29sID0ge307XG5cbiAgc3RvcnlSZWFkZXIuaGFuZGxlcnMgPSB7fTtcbiAgc3RvcnlSZWFkZXIuaGFuZGxlcnMuY3JlYXRlID0gKDAsIF9jcmVhdGVIYW5kbGVyMi5kZWZhdWx0KSh7ICdpZFBvb2wnOiBpZFBvb2wsIHpBbmltYXRvcjogb3B0aW9ucy56QW5pbWF0b3IgfSk7XG4gIHN0b3J5UmVhZGVyLmhhbmRsZXJzLmFkZCA9ICgwLCBfYWRkSGFuZGxlcjIuZGVmYXVsdCkoeyAnaWRQb29sJzogaWRQb29sLCB6QW5pbWF0b3I6IG9wdGlvbnMuekFuaW1hdG9yIH0pO1xuXG4gIHN0b3J5UmVhZGVyLnJlYWQgPSBmdW5jdGlvbiAoc3RvcnlQYXJ0KSB7XG4gICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBzdG9yeVBhcnRbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgIHZhciBjb21tYW5kID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgc3RvcnlSZWFkZXIuaGFuZGxlcnNbY29tbWFuZC5hY3Rpb25dLmhhbmRsZShjb21tYW5kLmRhdGEpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gc3RvcnlSZWFkZXI7XG59O1xuXG52YXIgX2NyZWF0ZUhhbmRsZXIgPSByZXF1aXJlKCcuL2hhbmRsZXIvY3JlYXRlLWhhbmRsZXInKTtcblxudmFyIF9jcmVhdGVIYW5kbGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZUhhbmRsZXIpO1xuXG52YXIgX2FkZEhhbmRsZXIgPSByZXF1aXJlKCcuL2hhbmRsZXIvYWRkLWhhbmRsZXInKTtcblxudmFyIF9hZGRIYW5kbGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FkZEhhbmRsZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RvcnktcmVhZGVyLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICB2YXIgaW50ZXJuYWxUaW1lciA9ICgwLCBfdGltZXIyLmRlZmF1bHQpKGhhbmRsZXIpO1xuICB2YXIgc3RvcnlSZWFkZXIgPSAoMCwgX3N0b3J5UmVhZGVyMi5kZWZhdWx0KSh7IHpBbmltYXRvcjogb3B0aW9ucy56QW5pbWF0b3IgfSk7XG4gIHZhciBzdG9yeUhhbmRsZXIgPSB7fTtcbiAgc3RvcnlIYW5kbGVyLnRpbWVQYXNzZWQgPSAwO1xuICBzdG9yeUhhbmRsZXIuaW50ZXJ2YWwgPSAxMDA7IC8vIH42MCBmcHNcbiAgc3RvcnlIYW5kbGVyLmxhc3RGcmFtZSA9IC0xO1xuICBzdG9yeUhhbmRsZXIuc3RvcnkgPSBmYWxzZTtcblxuICBzdG9yeUhhbmRsZXIuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgc3RvcnlIYW5kbGVyLnRpbWVQYXNzZWQgPSAwO1xuICAgIHN0b3J5SGFuZGxlci5wbGF5KCk7XG4gIH07XG5cbiAgc3RvcnlIYW5kbGVyLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgc3RvcnlIYW5kbGVyLnBhdXNlKCk7XG4gICAgc3RvcnlIYW5kbGVyLnRpbWVQYXNzZWQgPSAwO1xuICAgIGNvbnNvbGUubG9nKCdzdG9wcGVkJyk7XG4gIH07XG5cbiAgc3RvcnlIYW5kbGVyLnBsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHN0b3J5SGFuZGxlci5zdG9yeSkge1xuICAgICAgaW50ZXJuYWxUaW1lci5zdGFydCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oJ05vIHN0b3J5IHdhcyBzZXQgYmVmb3JlLiBBYm9ydGluZyBwbGF5LicpO1xuICAgIH1cbiAgfTtcblxuICBzdG9yeUhhbmRsZXIucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgaW50ZXJuYWxUaW1lci5zdG9wKCk7XG4gIH07XG5cbiAgZnVuY3Rpb24gaGFuZGxlcih0aW1lKSB7XG4gICAgc3RvcnlIYW5kbGVyLnRpbWVQYXNzZWQgKz0gdGltZTtcblxuICAgIHRlbGxTdG9yeSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tJZkZpbmlzaGVkKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RvcnlIYW5kbGVyLnN0b3J5LnRpbWVTbG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRpbWVTbG90SW5kZXggPSBNYXRoLmZsb29yKHN0b3J5SGFuZGxlci50aW1lUGFzc2VkIC8gc3RvcnlIYW5kbGVyLmludGVydmFsIC8gTWF0aC5wb3coMiwgaSkpO1xuICAgICAgaWYgKHRpbWVTbG90SW5kZXggPCBzdG9yeUhhbmRsZXIuc3RvcnkudGltZVNsb3RzW2ldLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdmFyIHRlbGxTdG9yeSA9IGZ1bmN0aW9uIHRlbGxTdG9yeSgpIHtcblxuICAgIC8vIEhhbmRsZSBlYWNoIHRpbWVzbG90c1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RvcnlIYW5kbGVyLnN0b3J5LnRpbWVTbG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRpbWVTbG90SW5kZXggPSBNYXRoLmZsb29yKHN0b3J5SGFuZGxlci50aW1lUGFzc2VkIC8gc3RvcnlIYW5kbGVyLmludGVydmFsIC8gTWF0aC5wb3coMiwgaSkpO1xuICAgICAgaWYgKHRpbWVTbG90SW5kZXggPiBzdG9yeUhhbmRsZXIubGFzdEZyYW1lIC8gTWF0aC5wb3coMiwgaSkpIHtcbiAgICAgICAgaWYgKHRpbWVTbG90SW5kZXggPj0gc3RvcnlIYW5kbGVyLnN0b3J5LnRpbWVTbG90c1tpXS5sZW5ndGgpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBzdG9yeVJlYWRlci5yZWFkKHN0b3J5SGFuZGxlci5zdG9yeS50aW1lU2xvdHNbaV1bdGltZVNsb3RJbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICBzdG9yeUhhbmRsZXIubGFzdEZyYW1lID0gTWF0aC5mbG9vcihzdG9yeUhhbmRsZXIudGltZVBhc3NlZCAvIHN0b3J5SGFuZGxlci5pbnRlcnZhbCk7XG5cbiAgICBpZiAoY2hlY2tJZkZpbmlzaGVkKCkpIHtcbiAgICAgIHN0b3J5SGFuZGxlci5zdG9wKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBzdG9yeUhhbmRsZXI7XG59O1xuXG52YXIgX3RpbWVyID0gcmVxdWlyZSgnLi90aW1lcicpO1xuXG52YXIgX3RpbWVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RpbWVyKTtcblxudmFyIF9zdG9yeVJlYWRlciA9IHJlcXVpcmUoJy4uL3N0b3J5LXJlYWRlcicpO1xuXG52YXIgX3N0b3J5UmVhZGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N0b3J5UmVhZGVyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0b3J5LWhhbmRsZXIuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICB2YXIgdGltZXIgPSB7fTtcblxuICB0aW1lci5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjcmVhdGVqcy5UaWNrZXIuYWRkRXZlbnRMaXN0ZW5lcigndGljaycsIHRpbWVyLmhhbmRsZSk7XG4gIH07XG5cbiAgdGltZXIuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjcmVhdGVqcy5UaWNrZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGljaycsIHRpbWVyLmhhbmRsZSk7XG4gIH07XG5cbiAgdGltZXIuaGFuZGxlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgY2FsbGJhY2soZXZlbnQuZGVsdGEpO1xuICB9O1xuXG4gIHJldHVybiB0aW1lcjtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aW1lci5qcy5tYXBcbiJdfQ==
