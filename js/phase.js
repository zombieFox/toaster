var phase = (function() {

  var get = function() {
    return game.get({
      path: "phase.current"
    });
  };

  var set = function(override) {
    var options = {
      phase: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var allPhases = game.get({
      path: "phase.all"
    });
    if (allPhases.includes(options.phase)) {
      game.set({
        path: "phase.current",
        value: options.phase
      });
    }
  };

  return {
    set: set,
    get: get
  };

})();
