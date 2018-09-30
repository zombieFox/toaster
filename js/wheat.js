var wheat = (function() {

  var consume = function(amount) {
    while (amount > 0) {
      amount--;
      game.set({
        path: "wheat.loaf.slice",
        value: helper.operator({
          type: "increase",
          value: game.get({
            path: "wheat.loaf.slice"
          }),
          by: 1
        })
      });
      // if slice == max reduce total wheat
      if (game.get({
          path: "wheat.loaf.slice"
        }) == game.get({
          path: "wheat.loaf.max"
        })) {
        game.set({
          path: "wheat.loaf.slice",
          value: 0
        });
        game.set({
          path: "wheat.current",
          value: helper.operator({
            type: "decrease",
            value: game.get({
              path: "wheat.current"
            }),
            by: 1
          })
        });
      }
    }
  };

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
    consume: consume,
    init: init,
    increase: increase
  };

})();
