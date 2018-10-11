var wheat = (function() {

  var output = function() {
    game.set({
      path: "wheat.drones.inventory.output",
      value: helper.operator({
        type: "multiply",
        value: game.get({
          path: "wheat.drones.inventory.current"
        }),
        by: game.get({
          path: "wheat.drones.efficiency.current"
        })
      })
    });
  };

  var make = function() {
    game.set({
      path: "wheat.inventory.current",
      value: helper.operator({
        type: "increase",
        value: game.get({
          path: "wheat.inventory.current"
        }),
        by: game.get({
          path: "wheat.drones.inventory.output"
        })
      })
    });
  };

  var consume = function(amount) {
    if (amount > 0) {
      var amount = amount / game.get({
        path: "wheat.consume.rate"
      });
      game.set({
        path: "wheat.inventory.current",
        value: helper.operator({
          type: "decrease",
          value: game.get({
            path: "wheat.inventory.current"
          }),
          by: amount
        })
      });
    }
  };

  var increase = function() {
    game.set({
      path: "wheat.consume.rate",
      value: helper.operator({
        type: "multiply",
        value: game.get({
          path: "wheat.consume.rate"
        }),
        by: game.get({
          path: "wheat.consume.multiply"
        })
      })
    });
  };

  var init = function() {
    game.set({
      path: "wheat.consume.rate",
      value: game.get({
        path: "wheat.consume.starting"
      })
    });
  };

  return {
    init: init,
    make: make,
    output: output,
    consume: consume,
    increase: increase
  };

})();
