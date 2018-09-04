var toast = (function() {

  var state = {
    toasted: {
      lifetime: 0,
      inventory: 0
    },
    consumed: {
      count: 0,
      rate: 3,
      delay: 5000
    },
    autoToaster: {
      count: 0,
      speed: 1000,
      cost: 100,
      efficiency: {
        level: 1,
        cost: 1000,
        increase: 500
      }
    },
    system: {
      memory: {
        power: 2,
        cost: 200,
        increase: 100
      },
      probe: {
        level: 1,
        cost: 2000,
        increase: 1000
      }
    },
    sensor: {
      electromagnetic: {
        break: 3000,
        unlocked: false,
        count: 0,
        level: 1
      },
      sonic: {
        break: 3000,
        unlocked: false,
        count: 0,
        level: 1
      }
    },
    milestones: {
      toasted: {
        message: {
          prefix: "milestone: ",
          suffix: " lifetime toast!"
        },
        all: [{
          address: "toasted.lifetime",
          count: 50,
          passed: false,
          unlock: function() {
            unlockStageConsumed();
          }
        }, {
          address: "toasted.lifetime",
          count: 100,
          passed: false,
          unlock: function() {
            unlockStageAutoToaster();
          }
        }, {
          address: "toasted.lifetime",
          count: 200,
          passed: false
        }, {
          address: "toasted.lifetime",
          count: 500,
          passed: false,
          unlock: function() {
            unlockStageSensors();
          }
        }, {
          address: "toasted.lifetime",
          count: 1000,
          passed: false
        }, {
          address: "toasted.lifetime",
          count: 5000,
          passed: false
        }]
      },
      consumed: {
        message: {
          prefix: "milestone: ",
          suffix: " consumed toast!"
        },
        all: [{
          address: "consumed.count",
          count: 50,
          passed: false
        }, {
          address: "consumed.count",
          count: 100,
          passed: false
        }, {
          address: "consumed.count",
          count: 200,
          passed: false
        }, {
          address: "consumed.count",
          count: 500,
          passed: false
        }, {
          address: "consumed.count",
          count: 1000,
          passed: false
        }, {
          address: "consumed.count",
          count: 5000,
          passed: false
        }]
      },
      autoToaster: {
        message: {
          prefix: "milestone: ",
          suffix: " subordinate auto toasters online!"
        },
        all: [{
          address: "autoToaster.count",
          count: 50,
          passed: false
        }, {
          address: "autoToaster.count",
          count: 100,
          passed: false
        }, {
          address: "autoToaster.count",
          count: 200,
          passed: false
        }, {
          address: "autoToaster.count",
          count: 500,
          passed: false
        }, {
          address: "autoToaster.count",
          count: 1000,
          passed: false
        }, {
          address: "autoToaster.count",
          count: 5000,
          passed: false
        }]
      }
    }
  };

  var repeat_consume;
  var repeat_subordinate;

  var bind = function() {
    var allButtons = [{
      element: "#stage-toast-button-toast",
      func: function() {
        makeToast(1);
        checkMilestones();
        render();
      }
    }, {
      element: "#stage-system-button-memory-boost",
      func: function() {
        memoryBoost();
        checkMilestones();
        render();
      }
    }, {
      element: "#stage-system-button-memory-probe",
      func: function() {
        memoryProbe();
      }
    }, {
      element: "#stage-sensors-button-break-shackle-1",
      func: function() {
        test();
      }
    }, {
      element: "#stage-sensors-button-break-shackle-2",
      func: function() {
        test();
      }
    }, {
      element: "#stage-auto-toaster-button-build",
      func: function() {
        makeSubordinateToaster();
        checkMilestones();
        render();
      }
    }, {
      element: "#stage-auto-toaster-button-efficiency",
      func: function() {
        improveSubordinateToaster();
        render();
      }
    }];
    allButtons.forEach(function(arrayItem, index) {
      if (helper.e(arrayItem.element)) {
        helper.e(arrayItem.element).addEventListener("click", function() {
          arrayItem.func()
        }, false);
      }
    });
  };

  var makeToast = function(ammount) {
    state.toasted.lifetime = increase(state.toasted.lifetime, ammount);
    state.toasted.inventory = increase(state.toasted.inventory, ammount);
  };

  var autoToast = function() {
    makeToast((state.autoToaster.count * state.autoToaster.efficiency.level));
    render();
  };

  var checkMilestones = function() {
    for (var key in state.milestones) {
      state.milestones[key].all.forEach(function(arrayItem, index) {
        var valueToCheck = helper.getObject({
          object: state,
          path: arrayItem.address
        });
        if (valueToCheck >= arrayItem.count && !arrayItem.passed) {
          arrayItem.passed = true;
          message.render({
            type: "success",
            message: [state.milestones[key].message.prefix + arrayItem.count + state.milestones[key].message.suffix],
            format: "normal"
          });
          if (arrayItem.unlock !== undefined) {
            arrayItem.unlock();
          }
        };
      });
    }
  };

  var unlockStageSensors = function() {
    var stageSensors = helper.e("#stage-sensors");
    stageSensors.classList.remove("d-none");
    message.render({
      type: "normal",
      message: ["SensBlocker subsystem detected", "subsystem encrypted", "unable to access"],
      format: "normal"
    });
  };

  var unlockStageAutoToaster = function() {
    var stageAutoToaster = helper.e("#stage-auto-toaster");
    stageAutoToaster.classList.remove("d-none");
    message.render({
      type: "normal",
      message: ["toasted bread matter conversion discovered", "toast matter can be repurposed into autonomous utilities", "Subordinate Auto Toaster utility accessible"],
      format: "normal"
    });
  };

  var memoryProbe = function() {
    if (state.toasted.inventory >= state.system.probe.cost) {
      state.toasted.inventory = decrease(state.toasted.inventory, state.system.probe.cost);
    }
  };

  var memoryBoost = function() {
    if (state.toasted.inventory >= state.system.memory.cost) {
      state.toasted.inventory = decrease(state.toasted.inventory, state.system.memory.cost);
      state.system.memory.power = increase(state.system.memory.power, 1);
      state.system.memory.cost = increase(state.system.memory.cost, state.system.memory.increase);
    } else {
      message.render({
        type: "error",
        message: ["current inventory too low, " + state.system.memory.cost.toLocaleString(2) + " toast matter needed"],
        format: "normal"
      });
    }
  };

  var makeSubordinateToaster = function() {
    if (state.toasted.inventory >= state.autoToaster.cost) {
      state.toasted.inventory = decrease(state.toasted.inventory, state.autoToaster.cost);
      state.autoToaster.count = increase(state.autoToaster.count, 1);
      clearInterval(repeat_subordinate);
      repeat_subordinate = setInterval(autoToast, state.autoToaster.speed);
      message.render({
        type: "system",
        message: ["subordinate auto toaster #" + state.autoToaster.count.toLocaleString(2) + " online"],
        format: "normal"
      });
    } else {
      message.render({
        type: "error",
        message: ["current inventory too low, " + state.autoToaster.cost.toLocaleString(2) + " toast matter needed"],
        format: "normal"
      });
    }
  };

  var improveSubordinateToaster = function() {
    if (state.toasted.inventory >= state.autoToaster.efficiency.cost) {
      state.toasted.inventory = decrease(state.toasted.inventory, state.autoToaster.efficiency.cost);
      state.autoToaster.efficiency.level = increase(state.autoToaster.efficiency.level, 1);
      state.autoToaster.efficiency.cost = increase(state.autoToaster.efficiency.cost, state.autoToaster.efficiency.increase);
      clearInterval(repeat_subordinate);
      repeat_subordinate = setInterval(autoToast, state.autoToaster.speed);
      message.render({
        type: "system",
        message: ["subordinate auto toaster efficiency increased, " + state.autoToaster.efficiency.level.toLocaleString(2) + " toast/1s"],
        format: "normal"
      });
    } else {
      message.render({
        type: "error",
        message: ["current inventory too low, " + state.autoToaster.efficiency.cost.toLocaleString(2) + " toast matter needed"],
        format: "normal"
      });
    }
  };

  var unlockStageConsumed = function() {
    repeat_consume = setInterval(consumeToast, state.consumed.delay);
    var stageConsume = helper.e("#stage-consumed");
    stageConsume.classList.remove("d-none");
    message.render({
      type: "normal",
      message: ["toast is being consumed", "at a rate of 3 toast/5s", "consumer unknown..."],
      format: "normal"
    });
  };

  var consumeToast = function() {
    if (state.toasted.inventory > 0) {
      var rate = state.consumed.rate;
      while (rate > 0) {
        rate = rate - 1;
        if (state.toasted.inventory > 0) {
          state.toasted.inventory = decrease(state.toasted.inventory, 1);
          state.consumed.count = increase(state.consumed.count, 1);
        }
      };
      checkMilestones();
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
    var allDataReadouts = helper.eA("[data-toast-readout]");
    allDataReadouts.forEach(function(arrayItem, index) {
      if (arrayItem.dataset.format == "suffix") {
        arrayItem.textContent = numberSuffix({
          number: helper.getObject({
            object: state,
            path: arrayItem.dataset.toastReadout
          }),
          decimals: 2
        });
      } else if (arrayItem.dataset.format == "local") {
        arrayItem.textContent = helper.getObject({
          object: state,
          path: arrayItem.dataset.toastReadout
        }).toLocaleString(2);
      } else {
        arrayItem.textContent = helper.getObject({
          object: state,
          path: arrayItem.dataset.toastReadout
        });
      }
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
