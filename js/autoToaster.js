var autoToaster = (function() {

  var output = function() {
    state.set({
      path: "autoToaster.inventory.output",
      value: helper.operator({
        type: "multiply",
        value: state.get({
          path: "autoToaster.inventory.current"
        }),
        by: state.get({
          path: "autoToaster.efficiency.current"
        }),
        integer: true
      })
    });
  };

  var make = function() {
    var amount = state.get({
      path: "autoToaster.inventory.current"
    }) * state.get({
      path: "autoToaster.efficiency.current"
    });
    toast.make(amount);
  };

  return {
    make: make,
    output: output
  };

})();
