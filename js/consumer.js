var consumer = (function() {

  var consume = function() {
    if (state.get({
        path: "toast.inventory"
      }) > 0) {
      var amount = state.get({
        path: "consumed.rate"
      });
      if (amount > state.get({
          path: "toast.inventory"
        })) {
        amount = state.get({
          path: "toast.inventory"
        });
      };
      state.set({
        path: "toast.inventory",
        value: helper.operator({
          type: "decrease",
          value: state.get({
            path: "toast.inventory"
          }),
          by: amount
        })
      });
      state.set({
        path: "consumed.count",
        value: helper.operator({
          type: "increase",
          value: state.get({
            path: "consumed.count"
          }),
          by: amount
        })
      });
      message.render({
        type: "error",
        message: ["toast levels droped, " + state.get({
          path: "consumed.rate"
        }) + " toast were consumed"],
        format: "normal"
      });
    }
  };

  var increase = function() {
    state.set({
      path: "consumed.rate",
      value: helper.operator({
        type: "multiply",
        value: state.get({
          path: "consumed.rate"
        }),
        by: state.get({
          path: "consumed.multiply"
        }),
        integer: true
      })
    });
  };

  var init = function() {
    state.set({
      path: "consumed.rate",
      value: state.get({
        path: "consumed.starting"
      })
    });
  };

  return {
    init: init,
    consume: consume,
    increase: increase
  };

})();
