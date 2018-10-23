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
    var amount = helper.operator({
      type: "multiply",
      value: game.get({
        path: "wheat.consume.rate"
      }),
      by: amount
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
  };

  var decrease = function() {
    // decrease wheat consume
    if (game.get({
        path: "wheat.consume.rate"
      }) > 8) {
      game.set({
        path: "wheat.consume.rate",
        value: helper.operator({
          type: "decrease",
          value: game.get({
            path: "wheat.consume.rate"
          }),
          by: game.get({
            path: "wheat.consume.decrease"
          }),
        })
      });
    } else {
      game.set({
        path: "wheat.consume.rate",
        value: 1
      });
    }
    // increase strategy cost
    game.set({
      path: "wheat.consume.cost.cycles",
      value: helper.operator({
        type: "increase",
        value: game.get({
          path: "wheat.consume.cost.cycles"
        }),
        by: game.get({
          path: "wheat.consume.cost.increase"
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
    decrease: decrease
  };

})();
