var tick = (function() {

  var current = {};

  var set = function(override) {
    var options = {
      tickName: null,
      func: null,
      interval: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    current[options.tickName] = window.setTimeout(function() {
      options.func();
      set(options);
    }, state.get({
      path: options.interval
    }));
  };

  var get = function() {
    return current;
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
