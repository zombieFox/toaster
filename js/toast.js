var toast = (function() {

  var make = function(amount) {
    if (helper.operator({
        type: "divide",
        value: amount,
        by: state.get({
          path: "wheat.consume.rate"
        })
      }) <= state.get({
        path: "wheat.inventory.current"
      })) {
      wheat.consume(amount);
      state.set({
        path: "toast.lifetime",
        value: helper.operator({
          type: "increase",
          value: state.get({
            path: "toast.lifetime"
          }),
          by: amount
        })
      });
      state.set({
        path: "toast.inventory",
        value: helper.operator({
          type: "increase",
          value: state.get({
            path: "toast.inventory"
          }),
          by: amount
        })
      });
    } else {
      message.render({
        type: "error",
        message: ["wheat inventory low"],
        format: "normal"
      });
    }
  };

  return {
    make: make
  };

})();
