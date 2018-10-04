var wheat = (function() {

  var consume = function(amount) {
    while (amount > 0) {
      amount--;
      game.set({
        path: "wheat.inventory.loaf.slice",
        value: helper.operator({
          type: "increase",
          value: game.get({
            path: "wheat.inventory.loaf.slice"
          }),
          by: 1
        })
      });
      // if slice == max reduce total wheat
      if (game.get({
          path: "wheat.inventory.loaf.slice"
        }) == game.get({
          path: "wheat.inventory.loaf.max.current"
        })) {
        game.set({
          path: "wheat.inventory.loaf.slice",
          value: 0
        });
        game.set({
          path: "wheat.inventory.current",
          value: helper.operator({
            type: "decrease",
            value: game.get({
              path: "wheat.inventory.current"
            }),
            by: 1
          })
        });
      }
    }
  };

  var increase = function() {
    game.set({
      path: "wheat.inventory.loaf.max.current",
      value: helper.operator({
        type: "multiply",
        value: game.get({
          path: "wheat.inventory.loaf.max.current"
        }),
        by: game.get({
          path: "wheat.inventory.loaf.multiply"
        }),
        integer: true
      })
    });
  };

  var init = function() {
    game.set({
      path: "wheat.inventory.loaf.max.current",
      value: game.get({
        path: "wheat.inventory.loaf.max.starting"
      })
    });
  };

  return {
    init: init,
    consume: consume,
    increase: increase
  };

})();
