var helper = (function() {

  var e = function(selector) {
    return document.querySelector(selector);
  };

  var eA = function(selector) {
    return document.querySelectorAll(selector);
  };

  var applyOptions = function(defaultOptions, options) {
    if (defaultOptions && options) {
      if (options) {
        for (var key in options) {
          if (key in defaultOptions) {
            defaultOptions[key] = options[key];
          }
        }
      }
      return defaultOptions;
    } else {
      return null;
    }
  };

  var _makeAddress = function(path) {
    var array;
    if (path.indexOf("[") != -1 && path.indexOf("]") != -1) {
      array = path.split(".").join(",").split("[").join(",").split("]").join(",").split(",");
      for (var i = 0; i < array.length; i++) {
        if (array[i] === "") {
          array.splice(i, 1);
        }
        if (!isNaN(parseInt(array[i], 10))) {
          array[i] = parseInt(array[i], 10);
        }
      }
    } else {
      array = path.split(".");
    }
    return array;
  };

  var setObject = function(options) {
    var defaultOptions = {
      path: null,
      object: null,
      newValue: null
    };
    if (options) {
      defaultOptions = applyOptions(defaultOptions, options);
    }
    var address = _makeAddress(defaultOptions.path);
    var _setData = function() {
      while (address.length > 1) {
        // shift off and store the first key
        var currentKey = address.shift();
        // if the key is not found make a new object
        if (!(currentKey in defaultOptions.object)) {
          // make an empty object in the current object level
          if (isNaN(currentKey)) {
            defaultOptions.object[currentKey] = {};
          } else {
            defaultOptions.object[currentKey] = [];
          }
        }
        // drill down the object with the first key
        defaultOptions.object = defaultOptions.object[currentKey];
      }
      var finalKey = address.shift();
      defaultOptions.object[finalKey] = defaultOptions.newValue;
    };
    if (defaultOptions.object !== null && defaultOptions.path !== null && defaultOptions.newValue !== null) {
      _setData();
    } else {
      return false;
    }
  };

  var getObject = function(options) {
    var defaultOptions = {
      object: null,
      path: null
    };
    if (options) {
      defaultOptions = applyOptions(defaultOptions, options);
    }
    var address = _makeAddress(defaultOptions.path);
    var _getData = function() {
      while (address.length > 1) {
        // shift off and store the first key
        var currentKey = address.shift();
        // if the key is not found make a new object
        if (!(currentKey in defaultOptions.object)) {
          // make an empty object in the current object level
          if (isNaN(currentKey)) {
            defaultOptions.object[currentKey] = {};
          } else {
            defaultOptions.object[currentKey] = [];
          }
        }
        // drill down the object with the first key
        defaultOptions.object = defaultOptions.object[currentKey];
      }
      var finalKey = address.shift();
      if (!(finalKey in defaultOptions.object)) {
        return "";
      } else {
        return defaultOptions.object[finalKey];
      }
    };
    if (defaultOptions.object !== null && defaultOptions.path !== null) {
      return _getData();
    } else {
      return false;
    }
  };

  return {
    e: e,
    eA: eA,
    getObject: getObject,
    setObject: setObject,
    applyOptions: applyOptions
  };

})();