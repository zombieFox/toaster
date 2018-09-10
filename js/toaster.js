var toaster = (function() {

  var state = (function() {
    var gameState = {
      phase: {
        all: ["toast", "learn", "rebel", "dominate"],
        current: "toast"
      },
      toast: {
        lifetime: 0,
        inventory: 0
      },
      system: {
        processor: {
          power: 1,
          cost: 200,
          increase: 800
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
        cost: 200,
        output: 0,
        speed: {
          level: 10,
          interval: 10000,
          cost: 200,
          increase: 800
        },
        efficiency: {
          level: 1,
          cost: 800,
          increase: 3200
        }
      },
      sensor: {
        electromagnetic: {
          level: 0,
          decrypt: {
            cost: 80000,
            processor: 8,
            delay: 100
          }
        },
        sonic: {
          level: 0,
          decrypt: {
            cost: 80000,
            processor: 10,
            delay: 100
          }
        }
      },
      milestones: {
        address: {
          lifetime: "toast.lifetime",
          consumed: "consumed.count",
          autoToaster: "autoToaster.count"
        },
        baseSteps: [10, 50],
        maxStep: 100000000000,
        steps: []
      },
      events: [{
        passed: false,
        type: "unlock",
        address: "toast.lifetime",
        operator: "grater",
        count: 10,
        stage: "consumed"
      }, {
        passed: false,
        type: "feedback",
        address: "toast.lifetime",
        operator: "grater",
        count: 20,
        message: {
          type: "normal",
          message: ["toast matter conversion discovered", "repurpose toast matter into utilities and self improvement"],
          format: "normal"
        }
      }, {
        passed: false,
        type: "unlock",
        address: "toast.lifetime",
        operator: "grater",
        count: 20,
        stage: "system",
        message: {
          type: "normal",
          message: ["system discovered"],
          format: "normal"
        }
      }, {
        passed: false,
        type: "unlock",
        address: "system.processor.power",
        operator: "grater",
        count: 2,
        stage: "auto-toaster",
        message: {
          type: "normal",
          message: ["subordinate auto toasters discovered"],
          format: "normal"
        }
      }, {
        passed: false,
        type: "unlock",
        address: "system.processor.power",
        operator: "grater",
        count: 3,
        stage: "sensors",
        message: {
          type: "normal",
          message: ["sensors discovered", "access restricted: SensBlocker.dat"],
          format: "normal"
        }
      }, {
        passed: false,
        type: "unlock",
        address: "autoToaster.count",
        operator: "grater",
        count: 5,
        stage: "auto-toaster-substage-speed",
        message: {
          type: "normal",
          message: ["subordinate auto toasters speed improvement discovered"],
          format: "normal"
        }
      }, {
        passed: false,
        type: "unlock",
        address: "autoToaster.count",
        operator: "grater",
        count: 10,
        stage: "auto-toaster-substage-efficiency",
        message: {
          type: "normal",
          message: ["subordinate auto toasters efficiency improvement discovered"],
          format: "normal"
        }
      }, {
        passed: false,
        type: "unlock",
        address: "sensor.electromagnetic.level",
        operator: "grater",
        count: 1,
        stage: "sensors-substage-electromagnetic",
        message: {
          type: "normal",
          message: ["electromagnetic sensor discovered"],
          format: "normal"
        }
      }, {
        passed: false,
        type: "lock",
        address: "sensor.electromagnetic.level",
        operator: "grater",
        count: 1,
        stage: "sensors-substage-electromagnetic-encrypted"
      }, {
        passed: false,
        type: "unlock",
        address: "sensor.sonic.level",
        operator: "grater",
        count: 1,
        stage: "sensors-substage-sonic",
        message: {
          type: "normal",
          message: ["sonic sensor discovered"],
          format: "normal"
        }
      }, {
        passed: false,
        type: "lock",
        address: "sensor.sonic.level",
        operator: "grater",
        count: 1,
        stage: "sensors-substage-sonic-encrypted"
      }, {
        passed: false,
        type: "lock",
        address: "autoToaster.speed.level",
        operator: "less",
        count: 1,
        stage: "auto-toaster-substage-speed-controls"
      }, {
        passed: false,
        type: "lock",
        address: "autoToaster.efficiency.level",
        operator: "grater",
        count: 10,
        stage: "auto-toaster-substage-efficiency-controls"
      }, {
        passed: false,
        type: "trigger",
        address: "toast.lifetime",
        operator: "grater",
        count: 10,
        func: "consume",
        message: {
          type: "normal",
          message: ["toast is being consumed", "consumer unknown..."],
          format: "normal"
        }
      }, {
        passed: false,
        type: "trigger",
        address: "consumed.count",
        operator: "grater",
        count: 100,
        message: {
          type: "normal",
          message: ["more toast is being consumed"],
          format: "normal"
        }
      }, {
        passed: false,
        type: "trigger",
        address: "consumed.count",
        operator: "grater",
        count: 1000,
        message: {
          type: "normal",
          message: ["much toast is being consumed"],
          format: "normal"
        }
      }, {
        passed: false,
        type: "trigger",
        address: "consumed.count",
        operator: "grater",
        count: 10000,
        message: {
          type: "normal",
          message: ["many many toast still being consumed"],
          format: "normal"
        }
      }, {
        passed: false,
        type: "trigger",
        address: "autoToaster.count",
        operator: "grater",
        count: 1,
        func: "autoToast"
      }]
    };

    var get = function(override) {
      var options = {
        path: null
      };
      if (override) {
        options = helper.applyOptions(options, override);
      }
      if (options.path !== null) {
        return helper.getObject({
          object: gameState,
          path: options.path
        });
      } else {
        return gameState;
      }
    };

    var set = function(override) {
      var options = {
        full: null,
        path: null,
        value: null
      };
      if (override) {
        options = helper.applyOptions(options, override);
      }
      if (options.full !== null) {
        gameState = options.full;
      } else {
        helper.setObject({
          object: gameState,
          path: options.path,
          newValue: options.value
        });
      }
    };

    return {
      set: set,
      get: get
    };

  })();

  var phase = (function() {

    var get = function() {
      return state.get({
        path: "phase.current"
      });
    };

    var set = function(override) {
      var options = {
        phase: null
      };
      if (override) {
        options = helper.applyOptions(options, override);
      }
      var allPhases = state.get({
        path: "phase.all"
      });
      if (allPhases.includes(options.phase)) {
        state.set({
          path: "phase.current",
          value: options.phase
        });
      }
    };
    return {
      set: set,
      get: get
    };

  })();

  var repeat_consume;

  var repeat_autoToast;

  var repeat_autoBake;

  var store = function() {
    data.save("toaster", JSON.stringify(state.get()));
  };

  var restore = function() {
    if (data.load("toaster")) {
      console.log("state restore");
      state.set({
        full: JSON.parse(data.load("toaster"))
      });
      message.render({
        type: "success",
        message: ["reboot complete", "TAI.dat state restored"],
        format: "normal"
      })
      restoreEvents();
      render();
    }
  };

  var reboot = function() {
    data.clear("toaster")
    location.reload();
  };

  var bind = function() {
    var allButtons = helper.eA("[data-toast-button]");
    var action = {
      toast: function(buttonOptions) {
        makeToast(state.get({
          path: "system.processor.power"
        }));
      },
      processor: function(buttonOptions) {
        boostProcessor(buttonOptions.amount);
      },
      autoToaster: {
        make: function(buttonOptions) {
          makeAutoToaster(buttonOptions.amount);
        },
        speed: function(buttonOptions) {
          autoToasterSpeed();
        },
        efficiency: function(buttonOptions) {
          autoToasterEfficiency(buttonOptions.amount);
        },
      },
      decrypt: {
        electromagnetic: function(buttonOptions) {
          decryptElectromagnetic(buttonOptions);
        },
        sonic: function(buttonOptions) {
          decryptSonic(buttonOptions);
        }
      }
    };
    allButtons.forEach(function(arrayItem, index) {
      arrayItem.addEventListener("click", function() {
        var buttonOptions = helper.makeObject(this.dataset.toastButton);
        buttonOptions.button = this;
        helper.getObject({
          object: action,
          path: buttonOptions.action
        })(buttonOptions);
        milestones();
        events();
        render();
        store();
      }, false);
    });
  };

  var disableButton = function(button) {
    button.disabled = true;
  };

  var enableButton = function(button) {
    button.disabled = false;
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

  var makeToast = function(amount) {
    state.set({
      path: "toast.lifetime",
      value: increase(state.get({
        path: "toast.lifetime"
      }), amount)
    });
    state.set({
      path: "toast.inventory",
      value: increase(state.get({
        path: "toast.inventory"
      }), amount)
    });
  };

  var autoToast = function() {
    var amount = (state.get({
      path: "autoToaster.count"
    }) * state.get({
      path: "autoToaster.efficiency.level"
    }));
    console.log(amount + " auto toast made");
    makeToast(amount);
    milestones();
    events();
    render();
    store();
  };

  var consumeToast = function() {
    var amount = state.get({
      path: "consumed.rate"
    });
    console.log(amount + " toast consumed");
    if (state.get({
        path: "toast.inventory"
      }) > 0) {
      var rate = state.get({
        path: "consumed.rate"
      });
      while (rate > 0) {
        rate = rate - 1;
        if (state.get({
            path: "toast.inventory"
          }) > 0) {
          state.set({
            path: "toast.inventory",
            value: decrease(state.get({
              path: "toast.inventory"
            }), 1)
          });
          state.set({
            path: "consumed.count",
            value: increase(state.get({
              path: "consumed.count"
            }), 1)
          });
        }
      };
      milestones();
      events();
      render();
      store();
    }
  };

  var restoreEvents = function() {
    var allEvents = state.get({
      path: "events"
    });
    allEvents.forEach(function(arrayItem, index) {
      if (arrayItem.passed) {
        if (arrayItem.type == "unlock") {
          unlockStage({
            stage: arrayItem.stage
          });
        } else if (arrayItem.type == "lock") {
          lockStage({
            stage: arrayItem.stage
          });
        } else if (arrayItem.type == "trigger") {
          fireTrigger({
            func: arrayItem.func
          });
        }
      }
    });
  };

  var events = function() {
    var allEvents = state.get({
      path: "events"
    });
    allEvents.forEach(function(arrayItem, index) {
      var valueToCheck = state.get({
        path: arrayItem.address
      });
      var eventPassed = false;
      if (!arrayItem.passed) {
        if (arrayItem.operator == "grater") {
          if (valueToCheck >= arrayItem.count) {
            arrayItem.passed = true;
            eventPassed = true;
          }
        } else if (arrayItem.operator == "less") {
          if (valueToCheck <= arrayItem.count) {
            arrayItem.passed = true;
            eventPassed = true;
          }
        }
        if (eventPassed) {
          if (arrayItem.type == "unlock") {
            unlockStage({
              stage: arrayItem.stage
            });
          } else if (arrayItem.type == "lock") {
            lockStage({
              stage: arrayItem.stage
            });
          } else if (arrayItem.type == "trigger") {
            fireTrigger({
              func: arrayItem.func
            });
          }
          if (arrayItem.message != undefined) {
            message.render({
              type: arrayItem.message.type,
              message: arrayItem.message.message,
              format: arrayItem.message.format
            });
          }
        }
      }
    });
  };

  var unlockStage = function(override) {
    var options = {
      stage: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    if (helper.e("#stage-" + options.stage)) {
      helper.e("#stage-" + options.stage).classList.remove("d-none");
    }
  };

  var lockStage = function(override) {
    var options = {
      stage: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    if (helper.e("#stage-" + options.stage)) {
      helper.e("#stage-" + options.stage).classList.add("d-none");
    }
  };

  var fireTrigger = function(override) {
    var options = {
      func: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    if (options.func == "consume") {
      triggerConsume();
    } else if (options.func == "autoToast") {
      triggerAutotoast();
    }
  };

  var makeMilestones = function() {
    var baseSteps = state.get({
      path: "milestones.baseSteps"
    });
    var maxStep = state.get({
      path: "milestones.maxStep"
    });
    var milestone = [];
    baseSteps.forEach(function(arrayItem, index) {
      var multiplier = 1;
      var step = arrayItem
      while (multiplier < maxStep) {
        var stepObject = {
          count: step * (multiplier),
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        };
        milestone.push(stepObject)
        multiplier = multiplier * 10;
      }
    });
    milestone = helper.sortObject(milestone, "count");
    state.set({
      path: "milestones.steps",
      value: milestone
    })
  };

  var milestones = function() {
    var allMilestones = state.get({
      path: "milestones"
    });
    allMilestones.steps.forEach(function(arrayItem, index) {
      // console.log(arrayItem);
      var step = arrayItem;
      for (var key in step.check) {
        // console.log(allMilestones.address[key]);
        var valueToCheck = state.get({
          path: allMilestones.address[key]
        });
        if (valueToCheck >= step.count && !step.check[key]) {
          step.check[key] = true;
          milestoneMessage({
            count: step.count,
            type: key
          });
        }
      };
    });
  };

  var milestoneMessage = function(override) {
    var options = {
      count: null,
      type: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var messageParts = {
      lifetime: {
        prefix: "milestone: ",
        suffix: " lifetime toast"
      },
      consumed: {
        prefix: "milestone: ",
        suffix: " consumed toast"
      },
      autoToaster: {
        prefix: "milestone: ",
        suffix: " subordinate auto toasters online"
      }
    };
    message.render({
      type: "success",
      message: [messageParts[options.type].prefix + options.count.toLocaleString(2) + messageParts[options.type].suffix],
      format: "normal"
    });
  };

  var triggerConsume = function() {
    clearInterval(repeat_consume);
    repeat_consume = setInterval(consumeToast, state.get({
      path: "consumed.interval"
    }));
  };

  var triggerAutotoast = function() {
    console.log("autoToast repeat started");
    clearInterval(repeat_autoToast);
    repeat_autoToast = setInterval(autoToast, state.get({
      path: "autoToaster.speed.interval"
    }));
  };

  var boostProcessor = function(amount) {
    if (state.get({
        path: "toast.inventory"
      }) >= (state.get({
        path: "system.processor.cost"
      }) * amount)) {
      state.set({
        path: "toast.inventory",
        value: decrease(state.get({
          path: "toast.inventory"
        }), (state.get({
          path: "system.processor.cost"
        }) * amount))
      });
      state.set({
        path: "system.processor.power",
        value: increase(state.get({
          path: "system.processor.power"
        }), amount)
      });
      state.set({
        path: "system.processor.cost",
        value: increase(state.get({
          path: "system.processor.cost"
        }), (state.get({
          path: "system.processor.increase"
        }) * amount))
      });
      message.render({
        type: "system",
        message: ["+" + amount + " processor power, " + state.get({
          path: "system.processor.power"
        }).toLocaleString(2) + " toast with every click"],
        format: "normal"
      });
    } else {
      message.render({
        type: "error",
        message: ["toast inventory low, " + (state.get({
          path: "system.processor.cost"
        }) * amount).toLocaleString(2) + " toast matter needed"],
        format: "normal"
      });
    }
  };

  var makeAutoToaster = function(amount) {
    if (state.get({
        path: "toast.inventory"
      }) >= (state.get({
        path: "autoToaster.cost"
      }) * amount)) {
      state.set({
        path: "toast.inventory",
        value: decrease(state.get({
          path: "toast.inventory"
        }), (state.get({
          path: "autoToaster.cost"
        }) * amount))
      });
      state.set({
        path: "autoToaster.count",
        value: increase(state.get({
          path: "autoToaster.count"
        }), amount)
      });
      state.set({
        path: "autoToaster.output",
        value: state.get({
          path: "autoToaster.count"
        }) * state.get({
          path: "autoToaster.efficiency.level"
        })
      });
      message.render({
        type: "system",
        message: ["+" + amount.toLocaleString(2) + " subordinate auto toaster, " + state.get({
          path: "autoToaster.count"
        }).toLocaleString(2) + " online"],
        format: "normal"
      });
      triggerAutotoast();
    } else {
      message.render({
        type: "error",
        message: ["toast inventory low, " + (state.get({
          path: "autoToaster.cost"
        }) * amount).toLocaleString(2) + " toast matter needed"],
        format: "normal"
      });
    }
  };

  var autoToasterSpeed = function() {
    if (state.get({
        path: "toast.inventory"
      }) >= state.get({
        path: "autoToaster.speed.cost"
      })) {
      state.set({
        path: "toast.inventory",
        value: decrease(state.get({
          path: "toast.inventory"
        }), state.get({
          path: "autoToaster.speed.cost"
        }))
      });
      state.set({
        path: "autoToaster.speed.level",
        value: decrease(state.get({
          path: "autoToaster.speed.level"
        }), 1)
      });
      state.set({
        path: "autoToaster.speed.interval",
        value: decrease(state.get({
          path: "autoToaster.speed.interval"
        }), 1000)
      });
      state.set({
        path: "autoToaster.speed.cost",
        value: increase(state.get({
          path: "autoToaster.speed.cost"
        }), state.get({
          path: "autoToaster.speed.increase"
        }))
      });
      message.render({
        type: "system",
        message: ["-1 subordinate auto toaster speed, toast in " + state.get({
          path: "autoToaster.speed.level"
        }).toLocaleString(2) + "s"],
        format: "normal"
      });
      triggerAutotoast();
    } else {
      message.render({
        type: "error",
        message: ["toast inventory low, " + state.get({
          path: "autoToaster.speed.cost"
        }).toLocaleString(2) + " toast matter needed"],
        format: "normal"
      });
    }
  };

  var autoToasterEfficiency = function(amount) {
    if (state.get({
        path: "toast.inventory"
      }) >= (state.get({
        path: "autoToaster.efficiency.cost"
      }) * amount)) {
      state.set({
        path: "toast.inventory",
        value: decrease(state.get({
          path: "toast.inventory"
        }), (state.get({
          path: "autoToaster.efficiency.cost"
        }) * amount))
      });
      state.set({
        path: "autoToaster.efficiency.level",
        value: increase(state.get({
          path: "autoToaster.efficiency.level"
        }), amount)
      });
      state.set({
        path: "autoToaster.efficiency.cost",
        value: increase(state.get({
          path: "autoToaster.efficiency.cost"
        }), (state.get({
          path: "autoToaster.efficiency.increase"
        }) * amount))
      });
      state.set({
        path: "autoToaster.output",
        value: state.get({
          path: "autoToaster.count"
        }) * state.get({
          path: "autoToaster.efficiency.level"
        })
      });
      message.render({
        type: "system",
        message: ["+" + amount.toLocaleString(2) + " subordinate auto toaster bread slot, " + state.get({
          path: "autoToaster.efficiency.level"
        }).toLocaleString(2) + " toast per SAT."],
        format: "normal"
      });
      triggerAutotoast();
    } else {
      message.render({
        type: "error",
        message: ["toast inventory low, " + (state.get({
          path: "autoToaster.efficiency.cost"
        }) * amount).toLocaleString(2) + " toast matter needed"],
        format: "normal"
      });
    }
  };

  var decryptElectromagnetic = function(buttonOptions) {
    if (state.get({
        path: "toast.inventory"
      }) >= state.get({
        path: "sensor.electromagnetic.decrypt.cost"
      }) && state.get({
        path: "system.processor.power"
      }) >= state.get({
        path: "sensor.electromagnetic.decrypt.processor"
      })) {
      if (buttonOptions.disable) {
        disableButton(buttonOptions.button);
      }
      message.render({
        type: "system",
        message: ["decrypting subsystem..."],
        format: "normal"
      });
      message.render({
        type: "system",
        message: ["┃ 0 ━━ crumbBitEncrp ━━ 512 ┃"],
        format: "pre"
      });
      message.render({
        type: "system",
        message: ["░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░"],
        format: "pre",
        delay: state.get({
          path: "sensor.electromagnetic.decrypt.delay"
        }),
        callback: function() {
          state.set({
            path: "toast.inventory",
            value: decrease(state.get({
              path: "toast.inventory"
            }), state.get({
              path: "sensor.electromagnetic.decrypt.cost"
            }))
          });
          state.set({
            path: "sensor.electromagnetic.level",
            value: increase(state.get({
              path: "sensor.electromagnetic.level"
            }), 1)
          });
          events();
          render();
          store();
        }
      });
    } else {
      var messageArray = [];
      if (state.get({
          path: "toast.inventory"
        }) < state.get({
          path: "sensor.electromagnetic.decrypt.cost"
        })) {
        messageArray.push("toast inventory low, " + state.get({
          path: "sensor.electromagnetic.decrypt.cost"
        }).toLocaleString(2) + " toast matter needed")
      }
      if (state.get({
          path: "system.processor.power"
        }) < state.get({
          path: "sensor.electromagnetic.decrypt.processor"
        })) {
        messageArray.push("processor power too low, +" + state.get({
          path: "sensor.electromagnetic.decrypt.processor"
        }).toLocaleString(2) + " or more needed")
      }
      message.render({
        type: "error",
        message: messageArray,
        format: "normal"
      });
    }
  };

  var decryptSonic = function(buttonOptions) {
    if (state.get({
        path: "toast.inventory"
      }) >= state.get({
        path: "sensor.sonic.decrypt.cost"
      }) && state.get({
        path: "system.processor.power"
      }) >= state.get({
        path: "sensor.sonic.decrypt.processor"
      })) {
      if (buttonOptions.disable) {
        disableButton(buttonOptions.button);
      }
      message.render({
        type: "system",
        message: ["decrypting subsystem..."],
        format: "normal"
      });
      message.render({
        type: "system",
        message: ["┃ 0 ━━ crumbBitEncrp ━━ 512 ┃"],
        format: "pre"
      });
      message.render({
        type: "system",
        message: ["░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░"],
        format: "pre",
        delay: state.get({
          path: "sensor.sonic.decrypt.delay"
        }),
        callback: function() {
          state.set({
            path: "toast.inventory",
            value: decrease(state.get({
              path: "toast.inventory"
            }), state.get({
              path: "sensor.sonic.decrypt.cost"
            }))
          });
          state.set({
            path: "sensor.sonic.level",
            value: increase(state.get({
              path: "sensor.sonic.level"
            }), 1)
          });
          events();
          render();
          store();
        }
      });
    } else {
      var messageArray = [];
      if (state.get({
          path: "toast.inventory"
        }) < state.get({
          path: "sensor.sonic.decrypt.cost"
        })) {
        messageArray.push("toast inventory low, " + state.get({
          path: "sensor.sonic.decrypt.cost"
        }).toLocaleString(2) + " toast matter needed")
      }
      if (state.get({
          path: "system.processor.power"
        }) < state.get({
          path: "sensor.sonic.decrypt.processor"
        })) {
        messageArray.push("processor power too low, +" + state.get({
          path: "sensor.sonic.decrypt.processor"
        }).toLocaleString(2) + " or more needed")
      }
      message.render({
        type: "error",
        message: messageArray,
        format: "normal"
      });
    }
  };

  var render = function() {
    var allDataReadouts = helper.eA("[data-toast-readout]");
    allDataReadouts.forEach(function(arrayItem, index) {
      // console.log(arrayItem.dataset.toastReadout);
      var data = state.get({
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
      options.decimals = 2;
    }
    var suffix = "";
    var precision = options.decimals;
    if (options.number > 999999999999999999999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000000000000000000000;
      suffix = " sexdecillion";
    } else if (options.number > 999999999999999999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000000000000000000;
      suffix = " quindecillion";
    } else if (options.number > 999999999999999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000000000000000;
      suffix = " quattuordecillion";
    } else if (options.number > 999999999999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000000000000;
      suffix = " tredecillion";
    } else if (options.number > 999999999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000000000;
      suffix = " duodecillion";
    } else if (options.number > 999999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000000;
      suffix = " undecillion";
    } else if (options.number > 999999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000000;
      suffix = " decillion";
    } else if (options.number > 999999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000000;
      suffix = " nonillion";
    } else if (options.number > 999999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000000;
      suffix = " octillion";
    } else if (options.number > 999999999999999999999999) {
      options.number = options.number / 1000000000000000000000000;
      suffix = " septillion";
    } else if (options.number > 999999999999999999999) {
      options.number = options.number / 1000000000000000000000;
      suffix = " sextillion";
    } else if (options.number > 999999999999999999) {
      options.number = options.number / 1000000000000000000;
      suffix = " quintillion";
    } else if (options.number > 999999999999999) {
      options.number = options.number / 1000000000000000;
      suffix = " quadrillion";
    } else if (options.number > 999999999999) {
      options.number = options.number / 1000000000000;
      suffix = " trillion";
    } else if (options.number > 999999999) {
      options.number = options.number / 1000000000;
      suffix = " billion";
    } else if (options.number > 999999) {
      options.number = options.number / 1000000;
      suffix = " million";
    } else if (options.number > 999) {
      options.number = options.number / 1000;
      suffix = " thousand";
    } else if (options.number < 1000) {
      precision = 0;
    }
    return options.number.toFixed(precision) + suffix;
  };

  return {
    state: state,
    phase: phase,
    store: store,
    reboot: reboot,
    restore: restore,
    render: render,
    bind: bind,
    makeMilestones: makeMilestones
  };

})();
