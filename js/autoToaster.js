var autoToaster = (function() {

  var output = function() {
    game.set({
      path: "autoToaster.inventory.output",
      value: helper.operator({
        type: "multiply",
        value: game.get({
          path: "autoToaster.inventory.current"
        }),
        by: game.get({
          path: "autoToaster.efficiency.current"
        }),
        integer: true
      })
    });
  };

  var make = function() {
    var amount = game.get({
      path: "autoToaster.inventory.current"
    }) * game.get({
      path: "autoToaster.efficiency.current"
    });
    toast.make(amount);
  };

  return {
    make: make,
    output: output
  };

})();
