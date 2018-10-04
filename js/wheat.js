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
          path: "wheat.loaf.max.current"
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

  var increase = function() {
    game.set({
      path: "wheat.loaf.max.current",
      value: helper.operator({
        type: "multiply",
        value: game.get({
          path: "wheat.loaf.max.current"
        }),
        by: game.get({
          path: "wheat.loaf.multiply"
        }),
        integer: true
      })
    });
  };

  var init = function() {
    game.set({
      path: "wheat.loaf.max.current",
      value: game.get({
        path: "wheat.loaf.max.starting"
      })
    });
  };

  return {
    init: init,
    consume: consume,
    increase: increase
  };

})();
