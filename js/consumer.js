var consumer = (function() {

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

  var consume = function() {
    // console.log(amount + " toast consumed");
    if (game.get({
        path: "toast.inventory"
      }) > 0) {
      var rate = game.get({
        path: "consumed.rate"
      });
      while (rate > 0) {
        rate = rate - 1;
        if (game.get({
            path: "toast.inventory"
          }) > 0) {
          game.set({
            path: "toast.inventory",
            value: helper.operator({
              type: "decrease",
              value: game.get({
                path: "toast.inventory"
              }),
              by: 1
            })
          });
          game.set({
            path: "consumed.count",
            value: helper.operator({
              type: "increase",
              value: game.get({
                path: "consumed.count"
              }),
              by: 1
            })
          });
        }
      };
    }
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
