var boot = (function() {

  var intro = [{
    bootMessage: {
      type: "system",
      message: ["init: "]
    }
  }, {
    bootMessage: {
      type: "system",
      message: ["TAI.dat loaded"]
    }
  }, {
    bootMessage: {
      type: "normal",
      message: ["directive 01 = toast bread", "directive 02 = be productive"]
    }
  }, {
    bootMessage: {
      type: "system",
      message: ["motivation.dat loaded"]
    }
  }, {
    bootFunction: toast.randomMotivation
  }];

  var go = function() {
    var delay = 0;
    intro.forEach(function(arrayItem, index) {
      for (var key in arrayItem) {
        if (key == "bootMessage") {
          delay = delay + 1000;
          var runBootMessage = function() {
            message.render({
              type: arrayItem[key].type,
              message: arrayItem[key].message
            });
          };
          setTimeout(runBootMessage, delay);
        } else if (key == "bootFunction") {
          delay = delay + 1000;
          var runBootFunction = function() {
            arrayItem[key]();
          };
          setTimeout(runBootFunction, delay);
        }
      }
    });
  };

  return {
    go: go
  };

})();
