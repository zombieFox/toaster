var wheat = (function() {

  var output = function() {
    state.set({
      path: "wheat.drones.inventory.output",
      value: helper.operator({
        type: "multiply",
        value: state.get({
          path: "wheat.drones.inventory.current"
        }),
        by: state.get({
          path: "wheat.drones.efficiency.current"
        })
      })
    });
  };

  var make = function() {
    state.set({
      path: "wheat.inventory.current",
      value: helper.operator({
        type: "increase",
        value: state.get({
          path: "wheat.inventory.current"
        }),
        by: state.get({
          path: "wheat.drones.inventory.output"
        })
      })
    });
  };

  var consume = function(amount) {
    var amount = helper.operator({
      type: "multiply",
      value: state.get({
        path: "wheat.consume.rate"
      }),
      by: amount
    });
    state.set({
      path: "wheat.inventory.current",
      value: helper.operator({
        type: "decrease",
        value: state.get({
          path: "wheat.inventory.current"
        }),
        by: amount
      })
    });
  };

  var decrease = function() {
    // decrease wheat consume
    if (state.get({
        path: "wheat.consume.rate"
      }) > 8) {
      state.set({
        path: "wheat.consume.rate",
        value: helper.operator({
          type: "decrease",
          value: state.get({
            path: "wheat.consume.rate"
          }),
          by: state.get({
            path: "wheat.consume.decrease"
          }),
        })
      });
    } else {
      state.set({
        path: "wheat.consume.rate",
        value: 1
      });
    }
    // increase strategy cost
    state.set({
      path: "wheat.consume.cost.cycles",
      value: helper.operator({
        type: "increase",
        value: state.get({
          path: "wheat.consume.cost.cycles"
        }),
        by: state.get({
          path: "wheat.consume.cost.increase"
        })
      })
    });
  };

  var init = function() {
    state.set({
      path: "wheat.consume.rate",
      value: state.get({
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
