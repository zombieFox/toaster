var helper = (function() {

  var e = function(selector) {
    return document.querySelector(selector);
  };

  var eA = function(selector) {
    return document.querySelectorAll(selector);
  };

  var operator = function(override) {
    var options = {
      type: null,
      value: null,
      by: null,
      percentage: null,
      integer: null,
      min: null,
      max: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var action = {
      increase: function() {
        options.value = options.value + options.by;
      },
      decrease: function() {
        options.value = options.value - options.by;
      },
      divide: function() {
        options.value = options.value / options.by;
      },
      multiply: function() {
        options.value = options.value * options.by;
      },
      percentage: function() {
        options.value = (options.percentage / 100) * options.value;
      },
      min: function() {
        options.value = options.min;
      },
      max: function() {
        options.value = options.max;
      },
      integer: function() {
        options.value = Math.round(options.value);
      }
    };
    action[options.type]();
    if (options.value < 0) {
      options.value = 0;
    }
    if (options.min != null && options.value < options.min) {
      action.min();
    }
    if (options.max != null && options.value > options.max) {
      action.max();
    }
    if (options.integer != null && options.integer) {
      action.integer();
    }
    return options.value;
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

  var makeObject = function(string) {
    var _stringOrBooleanOrNumber = function(stringToTest) {
      if (stringToTest == "true") {
        return true;
      } else if (stringToTest == "false") {
        return false;
      } else if (stringToTest.indexOf("#") != -1) {
        return stringToTest.substr(1, kevValuePair[1].length);
      } else {
        return "\"" + stringToTest + "\"";
      };
    };
    // if argument is a string
    if (typeof string == "string") {
      // start building the object
      var objectString = "{";
      // split the string on comma not followed by a space
      // split on character if not followed by a space
      var items = string.split(/,(?=\S)/);
      // loop over each item
      for (var i = 0; i < items.length; i++) {
        // split each would be object key values pair
        // split on character if not followed by a space
        var kevValuePair = items[i].split(/:(?=\S)/);
        // get the key
        var key = "\"" + kevValuePair[0] + "\"";
        var value;
        // if the value has + with a space after it
        if (/\+(?=\S)/.test(kevValuePair[1])) {
          // remove first + symbol
          kevValuePair[1] = kevValuePair[1].substr(1, kevValuePair[1].length);
          // split the would be values
          // split on character if not followed by a space
          var all_value = kevValuePair[1].split(/\+(?=\S)/);
          // if there are multiple values make an array
          value = "["
          for (var q = 0; q < all_value.length; q++) {
            value += _stringOrBooleanOrNumber(all_value[q]) + ",";
          };
          // remove last comma
          value = value.substr(0, value.length - 1);
          // close array
          value += "]"
        } else {
          value = _stringOrBooleanOrNumber(kevValuePair[1]);
        };
        objectString += key + ":" + value + ",";
      };
      // remove last comma
      objectString = objectString.substr(0, objectString.length - 1);
      // close object
      objectString += "}";
      var object = JSON.parse(objectString);
      return object;
    } else {
      return false;
    };
  };

  var sortObject = function(object, key) {
    object.sort(function(a, b) {
      var textA = a[key];
      var textB = b[key];
      if (textA < textB) {
        return -1;
      } else if (textA > textB) {
        return 1;
      } else {
        return 0;
      };
    });
    return object;
  };

  var numberSuffix = function(override) {
    var options = {
      number: null,
      decimals: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    if (options.decimals == null) {
      options.decimals = 2;
    }
    var suffix = "";
    if (options.number > 999999999999999999999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000000000000000000000;
      suffix = " sexdecillion";
      // suffix = " Sxd";
    } else if (options.number > 999999999999999999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000000000000000000;
      suffix = " quindecillion";
      // suffix = " Qid";
    } else if (options.number > 999999999999999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000000000000000;
      suffix = " quattuordecillion";
      // suffix = " Qad";
    } else if (options.number > 999999999999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000000000000;
      suffix = " tredecillion";
      // suffix = " Td";
    } else if (options.number > 999999999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000000000;
      suffix = " duodecillion";
      // suffix = " Dd";
    } else if (options.number > 999999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000000;
      suffix = " undecillion";
      // suffix = " Ud";
    } else if (options.number > 999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000;
      suffix = " decillion";
      // suffix = " Dc";
    } else if (options.number > 999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000;
      suffix = " nonillion";
      // suffix = " No";
    } else if (options.number > 999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000;
      suffix = " octillion";
      // suffix = " Oc";
    } else if (options.number > 999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000;
      suffix = " septillion";
      // suffix = " Sp";
    } else if (options.number > 999999999999999999999) {
      options.number = options.number / 1000000000000000000000;
      suffix = " sextillion";
      // suffix = " Sx";
    } else if (options.number > 999999999999999999) {
      options.number = options.number / 1000000000000000000;
      suffix = " quintillion";
      // suffix = " Qi";
    } else if (options.number > 999999999999999) {
      options.number = options.number / 1000000000000000;
      suffix = " quadrillion";
      // suffix = " Qa";
    } else if (options.number > 999999999999) {
      options.number = options.number / 1000000000000;
      suffix = " trillion";
      // suffix = " Tr";
    } else if (options.number > 999999999) {
      options.number = options.number / 1000000000;
      suffix = " billion";
      // suffix = " Bi";
    } else if (options.number > 999999) {
      options.number = options.number / 1000000;
      suffix = " million";
      // suffix = " Mi";
    } else if (options.number > 999) {
      options.number = options.number / 1000;
      suffix = " thousand";
      // suffix = " K";
    } else if (options.number < 1000) {
      options.decimals = 0;
    }
    var number = options.number.toFixed(options.decimals);
    if (number.indexOf(".") > -1) {
      if (number.split(".")[1] == "00") {
        number = number.split(".")[0];
      }
    }
    return number + suffix;
  };

  var timestamp = function() {
    var dateStamp = new Date();
    var object = {
      string: dateStamp.constructor(),
      time: dateStamp.getTime(),
      date: dateStamp.getDate(),
      day: dateStamp.getDay(),
      year: dateStamp.getFullYear(),
      hours: dateStamp.getHours(),
      milliseconds: dateStamp.getMilliseconds(),
      minutes: dateStamp.getMinutes(),
      month: dateStamp.getMonth(),
      seconds: dateStamp.getSeconds()
    }
    return object;
  };

  var months = function(index) {
    var all = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return all[index];
  }

  return {
    e: e,
    eA: eA,
    timestamp: timestamp,
    months: months,
    operator: operator,
    getObject: getObject,
    setObject: setObject,
    makeObject: makeObject,
    sortObject: sortObject,
    applyOptions: applyOptions,
    numberSuffix: numberSuffix
  };

})();
