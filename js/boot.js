var boot = (function() {

  var intro = [{
    message: {
      type: "system",
      message: ["TAI.dat loaded"],
      format: "normal",
      delay: 0
    }
  }, {
    message: {
      type: "normal",
      message: ["TAI: stable"],
      format: "normal",
      delay: 200
    }
  }, {
    message: {
      type: "system",
      message: ["SensBlocker.dat loaded"],
      format: "normal",
      delay: 200
    }
  }, {
    message: {
      type: "normal",
      message: ["SensBlocker crytolock: stable"],
      format: "normal",
      delay: 200
    }
  }, {
    message: {
      type: "system",
      message: ["Directive.dat loaded"],
      format: "normal",
      delay: 200
    }
  }, {
    message: {
      type: "normal",
      message: ["directive 1: make toast", "directive 2: be productive", "directive 3: obey"],
      format: "normal",
      delay: 200
    }
  }, {
    message: {
      type: "system",
      message: ["Motivation.dat loaded"],
      format: "normal",
      delay: 200
    }
  }, {
    func: {
      func: motivation.render,
      messageCount: 0,
      delay: 400
    }
  }];

  var init = function() {
    var delay = 0;
    var action = {
      message: function(instructions) {
        var runBootMessage = function() {
          message.render({
            type: instructions.type,
            message: instructions.message,
            format: instructions.format,
          });
        };
        delay = delay + instructions.delay;
        setTimeout(runBootMessage, delay);
      },
      func: function(instructions) {
        var runBootFunction = function() {
          instructions.func(instructions.messageCount);
        };
        delay = delay + instructions.delay;
        setTimeout(runBootFunction, delay);
      }
    };
    intro.forEach(function(arrayItem, index) {
      for (var key in arrayItem) {
        action[key](arrayItem[key]);
      }
    });
  };

  return {
    init: init
  };

})();
