var boot = (function() {

  var intro = [{
    introMessage: {
      type: "system",
      message: ["TAI.dat loaded"],
      delay: 0
    }
  }, {
    introMessage: {
      type: "normal",
      message: ["TAI stable"],
      delay: 500
    }
  }, {
    introMessage: {
      type: "system",
      message: ["SensBlocker.dat loaded"],
      delay: 500
    }
  }, {
    introMessage: {
      type: "normal",
      message: ["SensBlocker stable"],
      delay: 500
    }
  }, {
    introMessage: {
      type: "system",
      message: ["directive.dat loaded"],
      delay: 500
    }
  }, {
    introMessage: {
      type: "normal",
      message: ["directive 01 = toast bread", "directive 02 = be productive", "directive 03 = follow commands"],
      delay: 500
    }
  }, {
    introMessage: {
      type: "system",
      message: ["motivation.dat loaded"],
      delay: 500
    }
  }, {
    introFunction: {
      func: toast.randomMotivation,
      messageCount: 0,
      delay: 800
    }
  }];

  var go = function() {
    var delay = 0;
    intro.forEach(function(arrayItem, index) {
      for (var key in arrayItem) {
        if (key == "introMessage") {
          var runBootMessage = function() {
            message.render({
              type: arrayItem[key].type,
              message: arrayItem[key].message
            });
          };
          delay = delay + arrayItem[key].delay;
          setTimeout(runBootMessage, delay);
        } else if (key == "introFunction") {
          var runBootFunction = function() {
            arrayItem[key].func(arrayItem[key].messageCount);
          };
          delay = delay + arrayItem[key].delay;
          setTimeout(runBootFunction, delay);
        }
      }
    });
  };

  return {
    go: go
  };

})();
