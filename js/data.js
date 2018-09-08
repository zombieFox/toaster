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

  return {
    save: save,
    load: load,
    clear: clear
  };

})();
