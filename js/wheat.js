var wheat = (function() {

  var init = function() {
    game.set({
      path: "wheat.loaf.max",
      value: game.get({
        path: "wheat.loaf.starting"
      })
    });
  };

  var increase = function() {
    game.set({
      path: "wheat.loaf.max",
      value: helper.operator({
        type: "multiply",
        value: game.get({
          path: "wheat.loaf.max"
        }),
        by: game.get({
          path: "wheat.loaf.multiply"
        }),
        integer: true
      })
    });
  };

  return {
    init: init,
    increase: increase
  };

})();
