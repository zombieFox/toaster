var toast = (function() {

  var wheat = function(amount) {
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

  var toast = function(amount) {
    game.set({
      path: "toast.lifetime",
      value: helper.operator({
        type: "increase",
        value: game.get({
          path: "toast.lifetime"
        }),
        by: amount
      })
    });
    game.set({
      path: "toast.inventory",
      value: helper.operator({
        type: "increase",
        value: game.get({
          path: "toast.inventory"
        }),
        by: amount
      })
    });
  };

  var make = function(amount) {
    if (game.get({
        path: "wheat.current"
      }) >= amount) {
      wheat(amount);
      toast(amount);
    } else {
      message.render({
        type: "error",
        message: ["wheat matter low"],
        format: "normal"
      });
    }
  };

  return {
    make: make
  };

})();
