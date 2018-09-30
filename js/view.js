var view = (function() {

  var render = function() {
    var allDataReadouts = helper.eA("[data-toast-readout]");
    allDataReadouts.forEach(function(arrayItem, index) {
      var options = helper.makeObject(arrayItem.dataset.toastReadout);
      var data = toaster.state.get({
        path: options.path
      });
      var format = {
        suffix: function() {
          data = numberSuffix({
            number: data,
            decimals: options.decimals
          });
        },
        local: function() {
          data = data.toLocaleString();
        },
        divide: function() {
          data = helper.operator({
            type: "divide",
            value: data,
            by: options.by
          })
        }
      };
      if (options.modify != null) {
        format[options.modify]();
      }
      if (options.format != null) {
        format[options.format]();
      }
      arrayItem.textContent = data;
    });
  };

  return {
    render: render
  }

})();
