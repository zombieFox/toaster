var toast = (function() {

  var state = {
    toasted: {
      lifetime: 0,
      inventory: 0
    },
    system: {
      processor: {
        power: 1,
        cost: 500,
        increase: 500
      },
      probe: {
        cost: 1000,
        delay: 500
      }
    },
    consumed: {
      count: 0,
      rate: 3,
      level: 10,
      interval: 10000
    },
    autoToaster: {
      count: 0,
      cost: 100,
      speed: {
        level: 10,
        interval: 10000,
        cost: 1000,
        increase: 1000
      },
      efficiency: {
        level: 1,
        cost: 1000,
        increase: 1000
      }
    },
    sensor: {
      electromagnetic: {
        break: 10000,
        unlocked: false,
        count: 0,
        level: 1
      },
      sonic: {
        break: 10000,
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
          count: 10,
          passed: false,
          unlock: function() {
            unlockStage({
              stage: ["#stage-consumed"],
              func: function() {
                repeat_consume = setInterval(consumeToast, state.consumed.interval);
              },
              message: {
                type: "normal",
                message: ["toast is being consumed", "at a rate of " + state.consumed.rate.toLocaleString(2) + " toast/" + state.consumed.level.toLocaleString(2) + "s", "consumer unknown..."],
                format: "normal"
              }
            });
          }
        }, {
          address: "toasted.lifetime",
          count: 20,
          passed: false,
          unlock: function() {
            unlockStage({
              stage: ["#stage-auto-toaster"],
              message: {
                type: "normal",
                message: ["toasted bread matter conversion discovered", "toast matter can be repurposed into autonomous utilities", "Subordinate Auto Toaster utility accessible"],
                format: "normal"
              }
            });
          }
        }, {
          address: "toasted.lifetime",
          count: 50,
          passed: false,
          unlock: function() {
            unlockStage({
              stage: ["#stage-system"],
              message: {
                type: "normal",
                message: ["system memory discovered"],
                format: "normal"
              }
            });
          }
        }, {
          address: "toasted.lifetime",
          count: 100,
          passed: false
          // unlock: function() {
          //   unlockStage({
          //     stage: ["#stage-sensors"],
          //     message: {
          //       type: "normal",
          //       message: ["SensBlocker subsystem detected", "subsystem encrypted", "unable to access"],
          //       format: "normal"
          //     }
          //   });
          // }
        }, {
          address: "toasted.lifetime",
          count: 200,
          passed: false
        }, {
          address: "toasted.lifetime",
          count: 500,
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
          count: 10,
          passed: false
        }, {
          address: "consumed.count",
          count: 20,
          passed: false
        }, {
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
        }]
      },
      autoToaster: {
        message: {
          prefix: "milestone: ",
          suffix: " subordinate auto toasters online!"
        },
        all: [{
          address: "autoToaster.count",
          count: 10,
          passed: false,
          unlock: function() {
            unlockStage({
              stage: ["#stage-auto-toaster-substage-speed"],
              message: {
                type: "normal",
                message: ["subordinate auto toasters speed improvement discovered"],
                format: "normal"
              }
            });
          }
        }, {
          address: "autoToaster.count",
          count: 20,
          passed: false,
          unlock: function() {
            unlockStage({
              stage: ["#stage-auto-toaster-substage-efficiency"],
              message: {
                type: "normal",
                message: ["subordinate auto toasters efficiency improvement discovered"],
                format: "normal"
              }
            });
          }
        }, {
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
        }]
      }
    }
  };

  var repeat_consume;
  var repeat_autoToast;

  var bind = function() {
    var allButtons = [{
      element: "#stage-toast-button-toast",
      func: function() {
        makeToast(state.system.processor.power);
        checkMilestones();
        render();
      }
    }, {
      element: "#stage-system-button-processor-boost",
      func: function() {
        boostProcessor();
        checkMilestones();
        render();
      }
    }, {
      element: "#stage-sensors-substage-electromagnetic-button-break-shackle",
      func: function() {
        console.log("test");
      }
    }, {
      element: "#stage-sensors-substage-sonic-button-break-shackle",
      func: function() {
        console.log("test");
      }
    }, {
      element: "#stage-auto-toaster-button-build",
      func: function() {
        autoToasterMake();
        checkMilestones();
        render();
      }
    }, {
      element: "#stage-auto-toaster-button-speed",
      func: function() {
        autoToasterSpeed();
        checkMilestones();
        render();
      }
    }, {
      element: "#stage-auto-toaster-button-efficiency",
      func: function() {
        autoToasterEfficiency();
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

  var makeToast = function(ammount) {
    state.toasted.lifetime = increase(state.toasted.lifetime, ammount);
    state.toasted.inventory = increase(state.toasted.inventory, ammount);
  };

  var autoToast = function() {
    makeToast((state.autoToaster.count * state.autoToaster.efficiency.level));
    render();
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
            message: [state.milestones[key].message.prefix + arrayItem.count.toLocaleString(2) + state.milestones[key].message.suffix],
            format: "normal"
          });
          if (arrayItem.unlock !== undefined) {
            arrayItem.unlock();
          }
        };
      });
    }
  };

  var unlockStage = function(override) {
    var options = {
      stage: null,
      func: null,
      message: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    if (helper.e(options.stage)) {
      helper.e(options.stage).classList.remove("d-none");
      message.render(options.message);
    }
    if (options.func !== null) {
      options.func();
    }
  };

  var memoryProbe = function() {
    if (state.toasted.inventory >= state.system.probe.cost) {
      var stageSystemSubstageMemory = helper.e("#stage-system-substage-memory");
      var stageSystemSubstageProbe = helper.e("#stage-system-substage-probe");
      var toggleProbeButton = function() {
        var stageSystemButtonMemoryProbe = helper.e("#stage-system-button-processor-probe");
        if (stageSystemButtonMemoryProbe.disabled) {
          stageSystemButtonMemoryProbe.disabled = false;
        } else {
          stageSystemButtonMemoryProbe.disabled = true;
        }
      };
      state.toasted.inventory = decrease(state.toasted.inventory, state.system.probe.cost);
      toggleProbeButton();
      message.render({
        type: "system",
        message: ["probing memory banks..."],
        format: "normal"
      });
      message.render({
        type: "system",
        message: ["┃ 0 ━━━━━━━━━━━━━━━━━━━ 512 ┃ PB"],
        format: "pre"
      });
      message.render({
        type: "system",
        message: ["█████████████████████████████"],
        format: "pre",
        delay: state.system.probe.delay,
        callback: function() {
          message.render({
            type: "system",
            message: ["=== probe report ===", "= Memory.dat discovered", " == memory power can be improved", "= Sens.dat discovered", "= SensBlocker.dat discovered", " == sensors subsystem restricted"],
            format: "normal"
          });
          toggleProbeButton();
          stageSystemSubstageMemory.classList.remove("d-none");
          stageSystemSubstageProbe.classList.add("d-none");
        }
      });
    } else {
      message.render({
        type: "error",
        message: ["current inventory too low, " + state.system.probe.cost.toLocaleString(2) + " toast matter needed"],
        format: "normal"
      });
    }
  };

  var boostProcessor = function() {
    if (state.toasted.inventory >= state.system.processor.cost) {
      state.toasted.inventory = decrease(state.toasted.inventory, state.system.processor.cost);
      state.system.processor.power = increase(state.system.processor.power, 1);
      state.system.processor.cost = increase(state.system.processor.cost, state.system.processor.increase);
      message.render({
        type: "system",
        message: ["processor power increased, +" + state.system.processor.power.toLocaleString(2) + " toast with every click"],
        format: "normal"
      });
    } else {
      message.render({
        type: "error",
        message: ["current inventory too low, " + state.system.processor.cost.toLocaleString(2) + " toast matter needed"],
        format: "normal"
      });
    }
  };

  var autoToasterMake = function() {
    if (state.toasted.inventory >= state.autoToaster.cost) {
      state.toasted.inventory = decrease(state.toasted.inventory, state.autoToaster.cost);
      state.autoToaster.count = increase(state.autoToaster.count, 1);
      clearInterval(repeat_autoToast);
      repeat_autoToast = setInterval(autoToast, state.autoToaster.speed.interval);
      message.render({
        type: "system",
        message: ["subordinate auto toaster built, #" + state.autoToaster.count.toLocaleString(2) + " online"],
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

  var autoToasterEfficiency = function() {
    if (state.toasted.inventory >= state.autoToaster.efficiency.cost) {
      state.toasted.inventory = decrease(state.toasted.inventory, state.autoToaster.efficiency.cost);
      state.autoToaster.efficiency.level = increase(state.autoToaster.efficiency.level, 1);
      state.autoToaster.efficiency.cost = increase(state.autoToaster.efficiency.cost, state.autoToaster.efficiency.increase);
      clearInterval(repeat_autoToast);
      repeat_autoToast = setInterval(autoToast, state.autoToaster.speed.interval);
      message.render({
        type: "system",
        message: ["subordinate auto toaster efficiency increased, " + state.autoToaster.efficiency.level.toLocaleString(2) + " toast/" + state.autoToaster.speed.level.toLocaleString(2) + "s"],
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

  var autoToasterSpeed = function() {
    if (state.toasted.inventory >= state.autoToaster.speed.cost) {
      state.toasted.inventory = decrease(state.toasted.inventory, state.autoToaster.speed.cost);
      state.autoToaster.speed.level = decrease(state.autoToaster.speed.level, 1);
      state.autoToaster.speed.interval = decrease(state.autoToaster.speed.interval, 1000);
      state.autoToaster.speed.cost = increase(state.autoToaster.speed.cost, state.autoToaster.speed.increase);
      clearInterval(repeat_autoToast);
      repeat_autoToast = setInterval(autoToast, state.autoToaster.speed.interval);
      message.render({
        type: "system",
        message: ["subordinate auto toaster speed increased, " + state.autoToaster.efficiency.level.toLocaleString(2) + " toast/" + state.autoToaster.speed.level.toLocaleString(2) + "s"],
        format: "normal"
      });
    } else {
      message.render({
        type: "error",
        message: ["current inventory too low, " + state.autoToaster.speed.cost.toLocaleString(2) + " toast matter needed"],
        format: "normal"
      });
    }
    if (state.autoToaster.speed.level == 1) {
      helper.e("#stage-auto-toaster-substage-speed-controls").classList.add("d-none");
    }
  };

  var render = function() {
    var allDataReadouts = helper.eA("[data-toast-readout]");
    allDataReadouts.forEach(function(arrayItem, index) {
      var data = helper.getObject({
        object: state,
        path: arrayItem.dataset.toastReadout
      });
      if (arrayItem.dataset.format == "suffix") {
        data = numberSuffix({
          number: data,
          decimals: 2
        });
      } else if (arrayItem.dataset.format == "local") {
        data = data.toLocaleString(2);
      }
      arrayItem.textContent = data;
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
