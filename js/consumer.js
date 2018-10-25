var consumer = (function() {

  var consume = function() {
    if (game.get({
        path: "toast.inventory"
      }) > 0) {
      var amount = game.get({
        path: "consumed.rate"
      });
      if (amount > game.get({
          path: "toast.inventory"
        })) {
        amount = game.get({
          path: "toast.inventory"
        });
      };
      game.set({
        path: "toast.inventory",
        value: helper.operator({
          type: "decrease",
          value: game.get({
            path: "toast.inventory"
          }),
          by: amount
        })
      });
      game.set({
        path: "consumed.count",
        value: helper.operator({
          type: "increase",
          value: game.get({
            path: "consumed.count"
          }),
          by: amount
        })
      });
      // message.render({
      //   type: "error",
      //   message: [game.get({
      //     path: "consumed.rate"
      //   }) + " toast was just consumed, nom!"],
      //   format: "normal"
      // });
    }
  };

  var increase = function() {
    game.set({
      path: "consumed.rate",
      value: helper.operator({
        type: "multiply",
        value: game.get({
          path: "consumed.rate"
        }),
        by: game.get({
          path: "consumed.multiply"
        }),
        integer: true
      })
    });
  };

  var init = function() {
    game.set({
      path: "consumed.rate",
      value: game.get({
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
