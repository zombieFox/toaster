var toast = (function() {

  var state = {
    toastedLifetime: 0,
    toastedInventory: 0,
    autoToaster: 0,
    autoToasterEfficiency: 1,
    consumed: 0,
    consumeDelay: 5000,
    consumeRate: 3,
    sensor: {
      matterConversion: false
    },
    flags: {
      toastedLifetime: {
        ms50: {
          count: 50,
          passed: false,
          unlock: function() {
            unlock_consumeToast();
          },
          message: "milestone: 50 lifetime toast!"
        },
        ms100: {
          count: 100,
          passed: false,
          unlock: function() {
            unlock_subordinateToaster();
          },
          message: "milestone: 100 lifetime toast!"
        },
        ms500: {
          count: 200,
          passed: false,
          unlock: function() {
            unlock_sensors();
          },
          message: "milestone: 200 lifetime toast!"
        },
        ms1000: {
          count: 500,
          passed: false,
          message: "milestone: 500 lifetime toast!"
        },
        ms5000: {
          count: 1000,
          passed: false,
          message: "milestone: 1,000 lifetime toast!"
        },
        ms10000: {
          count: 5000,
          passed: false,
          message: "milestone: 5,000 lifetime toast!"
        }
      },
      consumed: {
        ms50: {
          count: 50,
          passed: false,
          message: "milestone: 50 consumed toast!"
        },
        ms100: {
          count: 100,
          passed: false,
          message: "milestone: 100 consumed toast!"
        },
        ms500: {
          count: 200,
          passed: false,
          message: "milestone: 200 consumed toast!"
        },
        ms1000: {
          count: 500,
          passed: false,
          message: "milestone: 500 consumed toast!"
        },
        ms5000: {
          count: 1000,
          passed: false,
          message: "milestone: 1,000 consumed toast!"
        },
        ms10000: {
          count: 5000,
          passed: false,
          message: "milestone: 5,000 consumed toast!"
        }
      },
      autoToaster: {
        ms50: {
          count: 50,
          passed: false,
          message: "milestone: 50 Subordinate Auto Toasters online!"
        },
        ms100: {
          count: 100,
          passed: false,
          message: "milestone: 100 Subordinate Auto Toasters online!"
        },
        ms500: {
          count: 200,
          passed: false,
          message: "milestone: 200 Subordinate Auto Toasters online!"
        },
        ms1000: {
          count: 500,
          passed: false,
          message: "milestone: 500 Subordinate Auto Toasters online!"
        },
        ms5000: {
          count: 1000,
          passed: false,
          message: "milestone: 1,000 Subordinate Auto Toasters online!"
        },
        ms10000: {
          count: 5000,
          passed: false,
          message: "milestone: 5,000 Subordinate Auto Toasters online!"
        }
      }
    }
  };

  var consume;
  var subordinate;

  var bind = function() {
    helper.e("#toast-button").addEventListener("click", function() {
      makeToast(1);
      unlockStage();
      render();
    }, false);
    helper.e("#subordinate-toaster-button").addEventListener("click", function() {
      makeSubordinateToaster();
      unlockStage();
      render();
    }, false);
    helper.e("#subordinate-toaster-imprive-button").addEventListener("click", function() {
      improveSubordinateToaster();
      render();
    }, false);
  };

  var unlockStage = function() {
    for (var key1 in state.flags) {
      for (var key2 in state.flags[key1]) {
        if (state[key1] >= state.flags[key1][key2].count && !state.flags[key1][key2].passed) {
          state.flags[key1][key2].passed = true;
          message.render({
            type: "success",
            message: [state.flags[key1][key2].message],
            format: "normal"
          });
          if (state.flags[key1][key2].unlock !== undefined) {
            state.flags[key1][key2].unlock();
          }
        }
      }
    }
  };

  var makeToast = function(ammount) {
    state.toastedLifetime = increase(state.toastedLifetime, ammount);
    state.toastedInventory = increase(state.toastedInventory, ammount);
    // console.log(state);
  };

  var autoToast = function() {
    makeToast((state.autoToaster * state.autoToasterEfficiency));
    render();
  };

  var unlock_sensors = function() {
    var stageSensors = helper.e("#stage-sensors");
    stageSensors.classList.remove("d-none");
    message.render({
      type: "normal",
      message: ["SensBlocker subsystem detected", "subsystem encrypted unable to access"],
      format: "normal"
    });
  };

  var unlock_subordinateToaster = function() {
    var stageSubordinateToaster = helper.e("#stage-subordinate-toaster");
    stageSubordinateToaster.classList.remove("d-none");
    message.render({
      type: "normal",
      message: ["toasted bread matter conversion discovered", "toast matter can be repurposed into autonomous utilities", "Subordinate Auto Toaster utility accessible"],
      format: "normal"
    });
  };

  var makeSensor = function() {

  };

  var makeSubordinateToaster = function() {
    if (state.toastedInventory >= 100) {
      state.toastedInventory = decrease(state.toastedInventory, 100);
      state.autoToaster = increase(state.autoToaster, 1);
      clearInterval(subordinate);
      subordinate = setInterval(autoToast, 1000);
      message.render({
        type: "system",
        message: ["subordinate auto toaster #" + state.autoToaster + " online"],
        format: "normal"
      });
    } else {
      message.render({
        type: "error",
        message: ["current inventory too low, 100 toast needed"],
        format: "normal"
      });
    }
  };

  var improveSubordinateToaster = function() {
    if (state.toastedInventory >= 1000) {
      state.toastedInventory = decrease(state.toastedInventory, 1000);
      state.autoToasterEfficiency = increase(state.autoToasterEfficiency, 1);
      clearInterval(subordinate);
      subordinate = setInterval(autoToast, 1000);
      message.render({
        type: "system",
        message: ["subordinate auto toaster efficiency increased, " + state.autoToasterEfficiency + " toast/1s"],
        format: "normal"
      });
    } else {
      message.render({
        type: "error",
        message: ["current inventory too low, 1,000 toast needed"],
        format: "normal"
      });
    }
  };

  var unlock_consumeToast = function() {
    consume = setInterval(consumeToast, state.consumeDelay);
    var stageConsume = helper.e("#stage-consumed");
    stageConsume.classList.remove("d-none");
    message.render({
      type: "normal",
      message: ["toast is being consumed", "at a rate of 3 toast/5s", "consumer unknown..."],
      format: "normal"
    });
  };

  var consumeToast = function() {
    if (state.toastedInventory > 0) {
      var rate = state.consumeRate;
      while (rate > 0) {
        rate = rate - 1;
        if (state.toastedInventory > 0) {
          state.toastedInventory = decrease(state.toastedInventory, 1);
          state.consumed = increase(state.consumed, 1);
        }
      };
      unlockStage();
      render();
    }
  };

  var increase = function(value, increment) {
    value = value + increment;
    return value;
  };

  var decrease = function(value, increment) {
    value = value - increment;
    if (value < 0) {
      value = 0;
    }
    return value;
  };

  var render = function() {
    var allReadOuts = [{
      element: helper.e("#toasted-lifetime"),
      value: state.toastedLifetime
    }, {
      element: helper.e("#toasted-inventory"),
      value: state.toastedInventory
    }, {
      element: helper.e("#consumed-count"),
      value: state.consumed
    }, {
      element: helper.e("#subordinate-toaster-count"),
      value: state.autoToaster
    }, {
      element: helper.e("#subordinate-toaster-efficiency"),
      value: state.autoToasterEfficiency
    }, {
      element: helper.e("#subordinate-toaster-efficiency-display"),
      value: state.autoToasterEfficiency
    }];
    allReadOuts.forEach(function(arrayItem, index) {
      // arrayItem.element.textContent = arrayItem.value.toLocaleString(2);
      arrayItem.element.textContent = numberSuffix({
        number: arrayItem.value,
        decimals: 2
      });
    });
  };

  var numberSuffix = function(override) {
    var options = {
      number: null,
      decimals: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    if (options.decimals === null) {
      options.decimals == 2;
    }
    var suffix = "";
    var precision = options.decimals;
    if (options.number > 999999999999999999999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000000000000000000000;
      suffix = "sexdecillion";
    } else if (options.number > 999999999999999999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000000000000000000;
      suffix = "quindecillion";
    } else if (options.number > 999999999999999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000000000000000;
      suffix = "quattuordecillion";
    } else if (options.number > 999999999999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000000000000;
      suffix = "tredecillion";
    } else if (options.number > 999999999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000000000;
      suffix = "duodecillion";
    } else if (options.number > 999999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000000;
      suffix = "undecillion";
    } else if (options.number > 999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000;
      suffix = "decillion";
    } else if (options.number > 999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000;
      suffix = "nonillion";
    } else if (options.number > 999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000;
      suffix = "octillion";
    } else if (options.number > 999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000;
      suffix = "septillion";
    } else if (options.number > 999999999999999999999) {
      options.number = options.number / 1000000000000000000000;
      suffix = "sextillion";
    } else if (options.number > 999999999999999999) {
      options.number = options.number / 1000000000000000000;
      suffix = "quintillion";
    } else if (options.number > 999999999999999) {
      options.number = options.number / 1000000000000000;
      suffix = "quadrillion";
    } else if (options.number > 999999999999) {
      options.number = options.number / 1000000000000;
      suffix = "trillion";
    } else if (options.number > 999999999) {
      options.number = options.number / 1000000000;
      suffix = "billion";
    } else if (options.number > 999999) {
      options.number = options.number / 1000000;
      suffix = "million";
    } else if (options.number > 999) {
      options.number = options.number / 1000;
      suffix = "thousand";
    } else if (options.number < 1000) {
      precision = 0;
    }
    return options.number.toFixed(precision) + " " + suffix;
  };

  return {
    state: state,
    makeToast: makeToast,
    render: render,
    bind: bind
  };

})();
