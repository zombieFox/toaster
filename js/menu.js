var menu = (function() {

  var state = {
    open: false
  };

  var open = function() {
    state.open = false;
    render();
  };

  var close = function() {
    state.open = false;
    render();
  };

  var toggle = function() {
    if (state.open) {
      state.open = false;
    } else {
      state.open = true;
    }
    render();
  };

  var render = function() {
    var toaster = helper.e("#toaster");
    if (state.open) {
      toaster.classList.add("menu-open");
    } else {
      toaster.classList.remove("menu-open");
    }
  };

  return {
    open: open,
    close: close,
    toggle: toggle
  };

})();
