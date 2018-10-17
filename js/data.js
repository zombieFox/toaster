var data = (function() {

  var set = function(key, data) {
    localStorage.setItem(key, data);
  };

  var get = function(key) {
    return localStorage.getItem(key);
  };

  var clear = function(key) {
    localStorage.removeItem(key);
  };

  var save = function() {
    var timestamp = helper.timestamp();
    if (timestamp.minutes < 10) {
      timestamp.minutes = "0" + timestamp.minutes;
    }
    game.set({
      path: "store.timestamp",
      value: timestamp.hours + ":" + timestamp.minutes + ", " + timestamp.date + " " + helper.months(timestamp.month) + ", " + timestamp.year
    });
    set("TAI.game.dat", JSON.stringify(game.get()));
    console.log("game saved");
  };

  var restore = function() {
    if (get("TAI.game.dat")) {
      console.log("state restored");
      game.set({
        full: JSON.parse(get("TAI.game.dat"))
      });
      events.restore();
      message.render({
        type: "success",
        message: ["reboot complete", "TAI.dat state restored"],
        format: "normal"
      });
    }
  };

  var reboot = function() {
    for (var key in tick.get) {
      clearTimeout(tick.get[key]);
    }
    clear("TAI.game.dat");
    location.reload();
  };

  var init = function() {
    restore();
  };

  return {
    init: init,
    save: save,
    clear: clear,
    set: set,
    get: get,
    restore: restore,
    reboot: reboot
  };

})();
