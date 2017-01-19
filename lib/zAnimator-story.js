(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.zAnimatorStory = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _storyHandler = require(3);

var _storyHandler2 = _interopRequireDefault(_storyHandler);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function create(options) {

  var sHandler = (0, _storyHandler2.default)();
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


},{"3":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  read: function read(storyPart) {
    console.log(storyPart);
  }
};


},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var internalTimer = (0, _timer2.default)(handler);
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
        _storyReader2.default.read(storyHandler.story.timeSlots[i][timeSlotIndex]);
      }
    }
    storyHandler.lastFrame = Math.floor(storyHandler.timePassed / storyHandler.interval);

    if (checkIfFinished()) {
      storyHandler.stop();
    }
  };

  return storyHandler;
};

var _timer = require(4);

var _timer2 = _interopRequireDefault(_timer);

var _storyReader = require(2);

var _storyReader2 = _interopRequireDefault(_storyReader);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}


},{"2":2,"4":4}],4:[function(require,module,exports){
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


},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wXFxtYWluLmpzIiwiLnRtcFxcc3RvcnktcmVhZGVyLmpzIiwiLnRtcFxcdGltZXJcXHN0b3J5LWhhbmRsZXIuanMiLCIudG1wXFx0aW1lclxcdGltZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFFQSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0MsU0FBTztBQURvQyxDQUE3QztBQUdBLFFBQVEsTUFBUixHQUFpQixNQUFqQjs7QUFFQSxJQUFJLGdCQUFnQixRQUFRLHVCQUFSLENBQXBCOztBQUVBLElBQUksaUJBQWlCLHVCQUF1QixhQUF2QixDQUFyQjs7QUFFQSxTQUFTLHNCQUFULENBQWdDLEdBQWhDLEVBQXFDO0FBQUUsU0FBTyxPQUFPLElBQUksVUFBWCxHQUF3QixHQUF4QixHQUE4QixFQUFFLFNBQVMsR0FBWCxFQUFyQztBQUF3RDs7QUFFL0YsU0FBUyxNQUFULENBQWdCLE9BQWhCLEVBQXlCOztBQUV2QixNQUFJLFdBQVcsQ0FBQyxHQUFHLGVBQWUsT0FBbkIsR0FBZjtBQUNBLE1BQUksUUFBUSxRQUFaLEVBQXNCO0FBQ3BCLGFBQVMsUUFBVCxHQUFvQixRQUFRLFFBQTVCO0FBQ0Q7O0FBRUQsU0FBTztBQUNMLFVBQU0sU0FBUyxJQUFULENBQWMsS0FBZCxFQUFxQjtBQUN6QixlQUFTLEtBQVQsR0FBaUIsS0FBakI7QUFDQSxlQUFTLEtBQVQ7QUFDRCxLQUpJO0FBS0wsVUFBTSxTQUFTLElBQVQsR0FBZ0I7QUFDcEIsZUFBUyxJQUFUO0FBQ0Q7QUFQSSxHQUFQO0FBU0Q7QUFDRDs7O0FDOUJBOztBQUVBLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQyxTQUFPO0FBRG9DLENBQTdDO0FBR0EsUUFBUSxPQUFSLEdBQWtCO0FBQ2hCLFFBQU0sU0FBUyxJQUFULENBQWMs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UUFBUSxTQUFSLENBQWI7O0FBRUEsSUFBSSxVQUFVLHVCQUF1QixNQUF2QixDQUFkOztBQUVBLElBQUksZUFBZSxRQUFRLGlCQUFSLENBQW5COztBQUVBLElBQUksZ0JBQWdCLHVCQUF1QixZQUF2QixDQUFwQjs7QUFFQSxTQUFTLHNCQUFULENBQWdDLEdBQWhDLEVBQXFDO0FBQUUsU0FBTyxPQUFPLElBQUksVUFBWCxHQUF3QixHQUF4QixHQUE4QixFQUFFLFNBQVMsR0FBWCxFQUFyQztBQUF3RDtBQUMvRjs7O0FDcEZBOztBQUVBLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQyxTQUFPO0FBRG9DLENBQTdDOztBQUlBLFFBQVEsT0FBUixHQUFrQixVQUFVLFFBQVYsRUFBb0I7QUFDcEMsTUFBSSxRQUFRLEVBQVo7O0FBRUEsUUFBTSxLQUFOLEdBQWMsWUFBWTtBQUN4QixhQUFTLE1BQVQsQ0FBZ0IsZ0JBQWhCLENBQWlDLE1BQWpDLEVBQXlDLE1BQU0sTUFBL0M7QUFDRCxHQUZEOztBQUlBLFFBQU0sSUFBTixHQUFhLFlBQVk7QUFDdkIsYUFBUyxNQUFULENBQWdCLG1CQUFoQixDQUFvQyxNQUFwQyxFQUE0QyxNQUFNLE1BQWxEO0FBQ0QsR0FGRDs7QUFJQSxRQUFNLE1BQU4sR0FBZSxVQUFVLEtBQVYsRUFBaUI7QUFDOUIsYUFBUyxNQUFNLEtBQWY7QUFDRCxHQUZEOztBQUlBLFNBQU8sS0FBUDtBQUNELENBaEJEO0FBaUJBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY3JlYXRlID0gY3JlYXRlO1xuXG52YXIgX3N0b3J5SGFuZGxlciA9IHJlcXVpcmUoJy4vdGltZXIvc3RvcnktaGFuZGxlcicpO1xuXG52YXIgX3N0b3J5SGFuZGxlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdG9yeUhhbmRsZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBjcmVhdGUob3B0aW9ucykge1xuXG4gIHZhciBzSGFuZGxlciA9ICgwLCBfc3RvcnlIYW5kbGVyMi5kZWZhdWx0KSgpO1xuICBpZiAob3B0aW9ucy5pbnRlcnZhbCkge1xuICAgIHNIYW5kbGVyLmludGVydmFsID0gb3B0aW9ucy5pbnRlcnZhbDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcGxheTogZnVuY3Rpb24gcGxheShzdG9yeSkge1xuICAgICAgc0hhbmRsZXIuc3RvcnkgPSBzdG9yeTtcbiAgICAgIHNIYW5kbGVyLnN0YXJ0KCk7XG4gICAgfSxcbiAgICBzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgc0hhbmRsZXIuc3RvcCgpO1xuICAgIH1cbiAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1haW4uanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHtcbiAgcmVhZDogZnVuY3Rpb24gcmVhZChzdG9yeVBhcnQpIHtcbiAgICBjb25zb2xlLmxvZyhzdG9yeVBhcnQpO1xuICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RvcnktcmVhZGVyLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpbnRlcm5hbFRpbWVyID0gKDAsIF90aW1lcjIuZGVmYXVsdCkoaGFuZGxlcik7XG4gIHZhciBzdG9yeUhhbmRsZXIgPSB7fTtcbiAgc3RvcnlIYW5kbGVyLnRpbWVQYXNzZWQgPSAwO1xuICBzdG9yeUhhbmRsZXIuaW50ZXJ2YWwgPSAxMDA7IC8vIH42MCBmcHNcbiAgc3RvcnlIYW5kbGVyLmxhc3RGcmFtZSA9IC0xO1xuICBzdG9yeUhhbmRsZXIuc3RvcnkgPSBmYWxzZTtcblxuICBzdG9yeUhhbmRsZXIuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgc3RvcnlIYW5kbGVyLnRpbWVQYXNzZWQgPSAwO1xuICAgIHN0b3J5SGFuZGxlci5wbGF5KCk7XG4gIH07XG5cbiAgc3RvcnlIYW5kbGVyLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgc3RvcnlIYW5kbGVyLnBhdXNlKCk7XG4gICAgc3RvcnlIYW5kbGVyLnRpbWVQYXNzZWQgPSAwO1xuICAgIGNvbnNvbGUubG9nKCdzdG9wcGVkJyk7XG4gIH07XG5cbiAgc3RvcnlIYW5kbGVyLnBsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHN0b3J5SGFuZGxlci5zdG9yeSkge1xuICAgICAgaW50ZXJuYWxUaW1lci5zdGFydCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oJ05vIHN0b3J5IHdhcyBzZXQgYmVmb3JlLiBBYm9ydGluZyBwbGF5LicpO1xuICAgIH1cbiAgfTtcblxuICBzdG9yeUhhbmRsZXIucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgaW50ZXJuYWxUaW1lci5zdG9wKCk7XG4gIH07XG5cbiAgZnVuY3Rpb24gaGFuZGxlcih0aW1lKSB7XG4gICAgc3RvcnlIYW5kbGVyLnRpbWVQYXNzZWQgKz0gdGltZTtcblxuICAgIHRlbGxTdG9yeSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tJZkZpbmlzaGVkKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RvcnlIYW5kbGVyLnN0b3J5LnRpbWVTbG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRpbWVTbG90SW5kZXggPSBNYXRoLmZsb29yKHN0b3J5SGFuZGxlci50aW1lUGFzc2VkIC8gc3RvcnlIYW5kbGVyLmludGVydmFsIC8gTWF0aC5wb3coMiwgaSkpO1xuICAgICAgaWYgKHRpbWVTbG90SW5kZXggPCBzdG9yeUhhbmRsZXIuc3RvcnkudGltZVNsb3RzW2ldLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdmFyIHRlbGxTdG9yeSA9IGZ1bmN0aW9uIHRlbGxTdG9yeSgpIHtcblxuICAgIC8vIEhhbmRsZSBlYWNoIHRpbWVzbG90c1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RvcnlIYW5kbGVyLnN0b3J5LnRpbWVTbG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRpbWVTbG90SW5kZXggPSBNYXRoLmZsb29yKHN0b3J5SGFuZGxlci50aW1lUGFzc2VkIC8gc3RvcnlIYW5kbGVyLmludGVydmFsIC8gTWF0aC5wb3coMiwgaSkpO1xuICAgICAgaWYgKHRpbWVTbG90SW5kZXggPiBzdG9yeUhhbmRsZXIubGFzdEZyYW1lIC8gTWF0aC5wb3coMiwgaSkpIHtcbiAgICAgICAgaWYgKHRpbWVTbG90SW5kZXggPj0gc3RvcnlIYW5kbGVyLnN0b3J5LnRpbWVTbG90c1tpXS5sZW5ndGgpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBfc3RvcnlSZWFkZXIyLmRlZmF1bHQucmVhZChzdG9yeUhhbmRsZXIuc3RvcnkudGltZVNsb3RzW2ldW3RpbWVTbG90SW5kZXhdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3RvcnlIYW5kbGVyLmxhc3RGcmFtZSA9IE1hdGguZmxvb3Ioc3RvcnlIYW5kbGVyLnRpbWVQYXNzZWQgLyBzdG9yeUhhbmRsZXIuaW50ZXJ2YWwpO1xuXG4gICAgaWYgKGNoZWNrSWZGaW5pc2hlZCgpKSB7XG4gICAgICBzdG9yeUhhbmRsZXIuc3RvcCgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gc3RvcnlIYW5kbGVyO1xufTtcblxudmFyIF90aW1lciA9IHJlcXVpcmUoJy4vdGltZXInKTtcblxudmFyIF90aW1lcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90aW1lcik7XG5cbnZhciBfc3RvcnlSZWFkZXIgPSByZXF1aXJlKCcuLi9zdG9yeS1yZWFkZXInKTtcblxudmFyIF9zdG9yeVJlYWRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdG9yeVJlYWRlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdG9yeS1oYW5kbGVyLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgdmFyIHRpbWVyID0ge307XG5cbiAgdGltZXIuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgY3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoJ3RpY2snLCB0aW1lci5oYW5kbGUpO1xuICB9O1xuXG4gIHRpbWVyLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgY3JlYXRlanMuVGlja2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RpY2snLCB0aW1lci5oYW5kbGUpO1xuICB9O1xuXG4gIHRpbWVyLmhhbmRsZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIGNhbGxiYWNrKGV2ZW50LmRlbHRhKTtcbiAgfTtcblxuICByZXR1cm4gdGltZXI7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGltZXIuanMubWFwXG4iXX0=
