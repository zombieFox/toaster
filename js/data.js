var data = (function() {

  var save = function(key, data) {
    localStorage.setItem(key, data);
  };

  var clear = function(key) {
    localStorage.removeItem(key);
  };

  var load = function(key) {
    return localStorage.getItem(key);
  };

  return {
    save: save,
    load: load,
    clear: clear
  };

})();
