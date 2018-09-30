var cycles = (function() {

  var spin = function() {
    if (game.get({
        path: "system.cycles.current"
      }) < game.get({
        path: "system.cycles.max"
      })) {
      game.set({
        path: "system.cycles.current",
        value: helper.operator({
          type: "increase",
          value: game.get({
            path: "system.cycles.current"
          }),
          by: 1
        })
      });
    }
  };

  var set = function() {
    game.set({
      path: "system.cycles.max",
      value: (game.get({
        path: "system.processor.power"
      }) * 10)
    });
  };

  return {
    spin: spin,
    set: set
  };

})();
