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

  var init = function() {
    tick.set({
      tickName: "events",
      func: function() {
        events.check();
        milestones.check();
        view.render();
      },
      interval: "events.interval"
    });
    tick.set({
      tickName: "store",
      func: function() {
        data.save();
      },
      interval: "store.interval"
    });
  };

  return {
    init: init,
    set: set,
    get: get
  };

})();
