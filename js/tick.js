var tick = (function() {

  var state = {};

  var set = function(override) {
    var options = {
      tickName: null,
      func: null,
      interval: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    state[options.tickName] = window.setTimeout(function() {
      options.func();
      set(options);
    }, game.get({
      path: options.interval
    }));
  };

  var get = function() {
    return state;
  };

  return {
    set: set,
    get: get
  };

})();
