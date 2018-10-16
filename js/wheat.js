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
    game.set({
      path: "wheat.consume.rate",
      value: helper.operator({
        type: "decrease",
        value: game.get({
          path: "wheat.consume.rate"
        }),
        by: helper.operator({
          type: "percentage",
          value: game.get({
            path: "wheat.consume.rate"
          }),
          percentage: game.get({
            path: "wheat.consume.decrease"
          }),
          integer: true
        })
      })
    });
    game.set({
      path: "wheat.consume.cost.cycles",
      value: helper.operator({
        type: "multiply",
        value: game.get({
          path: "wheat.consume.cost.cycles"
        }),
        by: game.get({
          path: "wheat.consume.cost.multiply"
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
