var data = (function() {

  var save = function(key, data) {
    localStorage.setItem(key, data);
  };

  var load = function(key) {
    return localStorage.getItem(key);
  };

  var clear = function(key) {
    localStorage.removeItem(key);
  };

  var store = function() {
    console.log("game saved");
    var timestamp = helper.timestamp();
    game.set({
      path: "store.timestamp",
      value: timestamp.hours + ":" + timestamp.minutes + ", " + timestamp.date + " " + helper.months(timestamp.month) + ", " + timestamp.year
    });
    save("toaster", JSON.stringify(game.get()));
  };

  var restore = function() {
    if (load("toaster")) {
      console.log("state restore");
      game.set({
        full: JSON.parse(load("toaster"))
      });
      message.render({
        type: "success",
        message: ["reboot complete", "TAI.dat state restored"],
        format: "normal"
      });
      events.restore();
    }
  };

  var reboot = function() {
    for (var key in tick.get) {
      clearTimeout(tick.get[key]);
    }
    clear("toaster");
    location.reload();
  };

  var init = function() {
    restore();
  };

  return {
    init: init,
    save: save,
    load: load,
    clear: clear,
    store: store,
    restore: restore,
    reboot: reboot
  };

})();
