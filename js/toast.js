var toast = (function() {

  var make = function(amount) {
    if (helper.operator({
        type: "divide",
        value: amount,
        by: game.get({
          path: "wheat.loaf.max"
        })
      }) <= game.get({
        path: "wheat.current"
      })) {
      wheat.consume(amount);
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
