var autoToast = (function() {

  var make = function() {
    var amount = game.get({
      path: "autoToaster.count"
    }) * game.get({
      path: "autoToaster.efficiency.current"
    });
    toast.make(amount);
  };

  return {
    make: make
  };

})();
