var autoToast = (function() {

  var output = function() {
    game.set({
      path: "autoToaster.output",
      value: helper.operator({
        type: "multiply",
        value: game.get({
          path: "autoToaster.count"
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
      path: "autoToaster.count"
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
