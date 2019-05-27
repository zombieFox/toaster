var cycles = (function() {

  var spin = function() {
    if (state.get({
        path: "system.cycles.current"
      }) < state.get({
        path: "system.cycles.max"
      })) {
      state.set({
        path: "system.cycles.current",
        value: helper.operator({
          type: "increase",
          value: state.get({
            path: "system.cycles.current"
          }),
          by: 1
        })
      });
    }
  };

  var set = function() {
    state.set({
      path: "system.cycles.max",
      value: (state.get({
        path: "system.processor.power"
      }) * 10)
    });
  };

  return {
    spin: spin,
    set: set
  };

})();
