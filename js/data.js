var data = (function() {

  var saveName = "TAI.game.dat";

  var set = function(key, data) {
    // localStorage.setItem(key, data);
  };

  var get = function(key) {
    return localStorage.getItem(key);
  };

  var remove = function(key) {
    localStorage.removeItem(key);
  };

  var save = function() {
    var timestamp = helper.timestamp();
    if (timestamp.minutes < 10) {
      timestamp.minutes = "0" + timestamp.minutes;
    }
    state.set({
      path: "store.timestamp",
      value: timestamp.hours + ":" + timestamp.minutes + ", " + timestamp.date + " " + helper.months(timestamp.month) + ", " + timestamp.year
    });
    set(saveName, JSON.stringify(state.get()));
    console.log("game data saved");
  };

  var wipe = function() {
    remove(saveName);
  };

  var load = function() {
    return JSON.parse(get(saveName));
  };

  var restore = function() {
    if (get(saveName)) {
      state.set({
        full: JSON.parse(get(saveName))
      });
      events.restore();
      message.render({
        type: "success",
        message: ["===", "saved TAI.dat reloaded", "==="],
        format: "normal"
      });
      console.log("state restored");
    }
  };

  var reboot = function() {
    for (var key in tick.get) {
      clearTimeout(tick.get[key]);
    }
    remove(saveName);
    location.reload();
  };

  var init = function() {
    restore();
  };

  return {
    init: init,
    save: save,
    remove: remove,
    set: set,
    get: get,
    wipe: wipe,
    restore: restore,
    reboot: reboot
  };

})();
