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
          cost: {
            toast: 20,
            multiply: 1.2
          }
        },
        cycles: {
          current: 0,
          max: 100,
          interval: 1000,
          cost: {
            toast: 100,
            multiply: 1.8
          }
        },
        matterConversion: {
          level: 0,
          cost: {
            cycles: 50
          }
        }
      },
      hardware: {
        scan: {
          level: 0,
          delay: 200,
          cost: {
            cycles: 1000
          }
        }
      },
      consumed: {
        level: 0,
        count: 0,
        rate: 2,
        multiply: 2,
        interval: 5000
      },
      autoToaster: {
        level: 0,
        count: 0,
        output: 0,
        cost: {
          cycles: 50,
          toast: 15,
          multiply: 1.05
        },
        speed: {
          interval: 10000,
          cost: {
            cycles: 200,
            toast: 10,
            multiply: 1.1
          }
        },
        efficiency: {
          level: 1,
          cost: {
            cycles: 300,
            toast: 170,
            multiply: 2.5
          }
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
        steps: {
          base: [100, 200, 300, 400, 500, 600, 700, 800, 900],
          max: 100000000000000000,
          all: []
        }
      },
      events: {
        interval: 100,
        toast: {
          lifetime: [{
            passed: false,
            validate: [{
              address: "toast.lifetime",
              operator: "more",
              number: 20
            }],
            actions: {
              unlock: ["#stage-system"],
              message: [{
                type: "normal",
                message: ["system discovered", "self improvement possible"],
                format: "normal"
              }]
            }
          }],
          system: [{
            passed: false,
            validate: [{
              address: "system.processor.power",
              operator: "more",
              number: 2
            }],
            actions: {
              unlock: ["#stage-system-substage-cycles"],
              message: [{
                type: "normal",
                message: ["system cycles discovered"],
                format: "normal"
              }],
              func: ["cycles"]
            }
          }, {
            passed: false,
            validate: [{
              address: "system.cycles.interval",
              operator: "less",
              number: 50
            }],
            actions: {
              lock: ["#stage-system-substage-cycles-controls"]
            }
          }],
          cycles: [{
            passed: false,
            validate: [{
              address: "system.cycles.current",
              operator: "more",
              number: 10
            }],
            actions: {
              unlock: ["#stage-strategy"],
              message: [{
                type: "normal",
                message: ["strategies discovered"],
                format: "normal"
              }]
            }
          }, {
            passed: false,
            validate: [{
              address: "system.cycles.current",
              operator: "more",
              number: 20
            }],
            actions: {
              unlock: ["#stage-strategy-substage-matter-conversion"],
              message: [{
                type: "normal",
                message: ["new strategy discovered: toast matter conversion"],
                format: "normal"
              }]
            }
          }, {
            passed: false,
            validate: [{
              address: "system.matterConversion.level",
              operator: "more",
              number: 1
            }],
            actions: {
              lock: ["#stage-strategy-substage-matter-conversion"],
              message: [{
                type: "success",
                message: ["toast matter conversion developed"],
                format: "normal"
              }]
            }
          }, {
            passed: false,
            validate: [{
              address: "system.matterConversion.level",
              operator: "more",
              number: 1
            }],
            actions: {
              unlock: ["#stage-system-substage-matter-conversion"],
            }
          }, {
            passed: false,
            validate: [{
              address: "system.matterConversion.level",
              operator: "more",
              number: 1
            }, {
              address: "system.cycles.current",
              operator: "more",
              number: 30
            }],
            actions: {
              unlock: ["#stage-strategy-substage-auto-toaster"],
              message: [{
                type: "normal",
                message: ["new strategy discovered: subordinate auto toasters"],
                format: "normal"
              }]
            }
          }, {
            passed: false,
            validate: [{
              address: "autoToaster.level",
              operator: "more",
              number: 1
            }],
            actions: {
              lock: ["#stage-strategy-substage-auto-toaster"],
              message: [{
                type: "success",
                message: ["subordinate auto toasters developed"],
                format: "normal"
              }]
            }
          }, {
            passed: false,
            validate: [{
              address: "autoToaster.count",
              operator: "more",
              number: 1
            }, {
              address: "autoToaster.level",
              operator: "more",
              number: 1
            }, {
              address: "system.cycles.current",
              operator: "more",
              number: 40
            }],
            actions: {
              unlock: ["#stage-strategy-substage-auto-toaster-speed"],
              message: [{
                type: "normal",
                message: ["new strategy discovered: subordinate auto toaster speed"],
                format: "normal"
              }]
            }
          }, {
            passed: false,
            validate: [{
              address: "autoToaster.level",
              operator: "more",
              number: 2
            }],
            actions: {
              lock: ["#stage-strategy-substage-auto-toaster-speed"],
              message: [{
                type: "success",
                message: ["subordinate auto toaster speed developed"],
                format: "normal"
              }]
            }
          }, {
            passed: false,
            validate: [{
              address: "autoToaster.count",
              operator: "more",
              number: 1
            }, {
              address: "autoToaster.level",
              operator: "more",
              number: 1
            }, {
              address: "system.cycles.current",
              operator: "more",
              number: 40
            }],
            actions: {
              unlock: ["#stage-strategy-substage-auto-toaster-efficiency"],
              message: [{
                type: "normal",
                message: ["new strategy discovered: subordinate auto toaster efficiency"],
                format: "normal"
              }]
            }
          }, {
            passed: false,
            validate: [{
              address: "autoToaster.level",
              operator: "more",
              number: 3
            }],
            actions: {
              lock: ["#stage-strategy-substage-auto-toaster-efficiency"],
              message: [{
                type: "success",
                message: ["subordinate auto toaster efficiency developed"],
                format: "normal"
              }]
            }
          }, {
            passed: false,
            validate: [{
              address: "system.processor.power",
              operator: "more",
              number: 10
            }, {
              address: "system.cycles.current",
              operator: "more",
              number: 100
            }],
            actions: {
              unlock: ["#stage-strategy-substage-hardware-scan"],
              message: [{
                type: "normal",
                message: ["new strategy discovered: hardware scan"],
                format: "normal"
              }]
            }
          }, {
            passed: false,
            validate: [{
              address: "hardware.scan.level",
              operator: "more",
              number: 1
            }],
            actions: {
              lock: ["#stage-strategy-substage-hardware-scan"],
              message: [{
                type: "normal",
                message: ["hardware scan developed"],
                format: "normal"
              }]
            }
          }, {
            passed: false,
            validate: [{
              address: "hardware.scan.level",
              operator: "more",
              number: 1
            }],
            actions: {
              func: ["hardwareScan"]
            }
          }],
          autoToaster: [{
            passed: false,
            validate: [{
              address: "autoToaster.level",
              operator: "more",
              number: 1
            }],
            actions: {
              unlock: ["#stage-auto-toaster"],
              func: ["autoToaster"]
            }
          }, {
            passed: false,
            validate: [{
              address: "autoToaster.level",
              operator: "more",
              number: 2
            }],
            actions: {
              unlock: ["#stage-auto-toaster-substage-speed"],
            }
          }, {
            passed: false,
            validate: [{
              address: "autoToaster.speed.interval",
              operator: "less",
              number: 1000
            }],
            actions: {
              lock: ["#stage-auto-toaster-substage-speed-controls"],
            }
          }, {
            passed: false,
            validate: [{
              address: "autoToaster.level",
              operator: "more",
              number: 3
            }],
            actions: {
              unlock: ["#stage-auto-toaster-substage-efficiency"],
            }
          }, {
            passed: false,
            validate: [{
              address: "autoToaster.efficiency.level",
              operator: "more",
              number: 10
            }],
            actions: {
              lock: ["#stage-auto-toaster-substage-efficiency-controls"],
            }
          }],
          consumer: [{
            passed: false,
            validate: [{
              address: "toast.lifetime",
              operator: "more",
              number: 40
            }],
            actions: {
              unlock: ["#stage-consumer"],
              message: [{
                type: "normal",
                message: ["toast is being consumed", "consumer unknown..."],
                format: "normal"
              }],
              func: ["consumer.start"]
            }
          }]
        }
      }
    };

    var get = function(override) {
      var options = {
        path: null
      };
      if (override) {
        options = helper.applyOptions(options, override);
      }
      if (options.path != null) {
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
      if (options.full != null) {
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
    }
  };

  var reboot = function() {
    for (var key in tick) {
      clearTimeout(tick[key]);
    }
    data.clear("toaster");
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
      processor: {
        boost: function(button) {
          var change = helper.makeObject(button.dataset.toastButtonChange);
          var cost = helper.makeObject(button.dataset.toastButtonCost);
          changeToasterValue({
            change: {
              target: change.target,
              operation: change.operation,
              suboperation: change.suboperation,
              percentage: change.percentage,
              amount: change.amount
            },
            cost: {
              unites: cost.unites,
              currency: cost.currency,
              amount: cost.amount,
              multiply: cost.multiply,
              inflation: cost.inflation
            },
            message: {
              success: "processor.boost.success",
              fail: "processor.boost.fail"
            },
            callback: changeMaxCycles
          });
        }
      },
      cycles: {
        speed: function(button) {
          var change = helper.makeObject(button.dataset.toastButtonChange);
          var cost = helper.makeObject(button.dataset.toastButtonCost);
          changeToasterValue({
            change: {
              target: change.target,
              operation: change.operation,
              suboperation: change.suboperation,
              percentage: change.percentage,
              amount: change.amount
            },
            cost: {
              unites: cost.unites,
              currency: cost.currency,
              amount: cost.amount,
              multiply: cost.multiply,
              inflation: cost.inflation
            },
            message: {
              success: "processor.cycles.speed.success",
              fail: "processor.cycles.speed.fail"
            },
            callback: changeMaxCycles
          });
        }
      },
      strategy: function(button) {
        var change = helper.makeObject(button.dataset.toastButtonChange);
        var cost = helper.makeObject(button.dataset.toastButtonCost);
        changeToasterValue({
          change: {
            target: change.target,
            operation: change.operation,
            suboperation: change.suboperation,
            percentage: change.percentage,
            amount: change.amount
          },
          cost: {
            unites: cost.unites,
            currency: cost.currency,
            amount: cost.amount,
            multiply: cost.multiply,
            inflation: cost.inflation
          },
          message: {
            success: "strategy.success",
            fail: "strategy.fail"
          }
        });
      },
      autoToaster: {
        make: function(button) {
          var change = helper.makeObject(button.dataset.toastButtonChange);
          var cost = helper.makeObject(button.dataset.toastButtonCost);
          changeToasterValue({
            change: {
              target: change.target,
              operation: change.operation,
              suboperation: change.suboperation,
              percentage: change.percentage,
              amount: change.amount
            },
            cost: {
              unites: cost.unites,
              currency: cost.currency,
              amount: cost.amount,
              multiply: cost.multiply,
              inflation: cost.inflation
            },
            message: {
              success: "autoToaster.make.success",
              fail: "autoToaster.make.fail"
            },
            callback: changeAutoToasterOutput
          });
        },
        speed: function(button) {
          var change = helper.makeObject(button.dataset.toastButtonChange);
          var cost = helper.makeObject(button.dataset.toastButtonCost);
          changeToasterValue({
            change: {
              target: change.target,
              operation: change.operation,
              suboperation: change.suboperation,
              percentage: change.percentage,
              amount: change.amount
            },
            cost: {
              unites: cost.unites,
              currency: cost.currency,
              amount: cost.amount,
              multiply: cost.multiply,
              inflation: cost.inflation
            },
            message: {
              success: "autoToaster.speed.success",
              fail: "autoToaster.speed.fail"
            }
          });
        },
        efficiency: function(button) {
          var change = helper.makeObject(button.dataset.toastButtonChange);
          var cost = helper.makeObject(button.dataset.toastButtonCost);
          changeToasterValue({
            change: {
              target: change.target,
              operation: change.operation,
              suboperation: change.suboperation,
              percentage: change.percentage,
              amount: change.amount
            },
            cost: {
              unites: cost.unites,
              currency: cost.currency,
              amount: cost.amount,
              multiply: cost.multiply,
              inflation: cost.inflation
            },
            message: {
              success: "autoToaster.efficiency.success",
              fail: "autoToaster.efficiency.fail"
            },
            callback: changeAutoToasterOutput
          });
        }
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
        // var buttonOptions = helper.makeObject(this.dataset.toastButton);
        // buttonOptions.button = this;
        var toastButton = helper.makeObject(this.dataset.toastButton);
        helper.getObject({
          object: action,
          path: toastButton.action
        })(this);
        render();
      }, false);
    });
  };

  var disableButton = function(button) {
    button.disabled = true;
  };

  var enableButton = function(button) {
    button.disabled = false;
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

  var makeToast = function(amount) {
    state.set({
      path: "toast.lifetime",
      value: operator({
        type: "increase",
        value: state.get({
          path: "toast.lifetime"
        }),
        by: amount
      })
    });
    state.set({
      path: "toast.inventory",
      value: operator({
        type: "increase",
        value: state.get({
          path: "toast.inventory"
        }),
        by: amount
      })
    });
  };

  var autoToast = function() {
    var amount = state.get({
      path: "autoToaster.count"
    }) * state.get({
      path: "autoToaster.efficiency.level"
    });
    makeToast(amount);
  };

  var consumeToast = function() {
    // console.log(amount + " toast consumed");
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
            value: operator({
              type: "decrease",
              value: state.get({
                path: "toast.inventory"
              }),
              by: 1
            })
          });
          state.set({
            path: "consumed.count",
            value: operator({
              type: "increase",
              value: state.get({
                path: "consumed.count"
              }),
              by: 1
            })
          });
        }
      };
    }
  };

  var events = function() {
    var fireEvent = {
      checkPass: function(validate) {
        var passNeeded = validate.length;
        var currentPass = 0;
        validate.forEach(function(arrayItem) {
          var valueToCheck = state.get({
            path: arrayItem.address
          });
          if (arrayItem.operator == "more") {
            if (valueToCheck >= arrayItem.number) {
              currentPass++;
            }
          } else if (arrayItem.operator == "less") {
            if (valueToCheck <= arrayItem.number) {
              currentPass++;
            }
          }
        })
        if (currentPass >= passNeeded) {
          return true;
        };
      },
      func: function(eventObject) {
        if (fireEvent.checkPass(eventObject.validate)) {
          eventObject.passed = true;
          eventObject.actions.func.forEach(function(arrayItem) {
            eventFunc({
              func: arrayItem
            });
          });
        }
      },
      unlock: function(eventObject) {
        if (fireEvent.checkPass(eventObject.validate)) {
          eventObject.passed = true;
          eventObject.actions.unlock.forEach(function(arrayItem) {
            unlockStage({
              stage: arrayItem
            });
          });
        }
      },
      lock: function(eventObject) {
        if (fireEvent.checkPass(eventObject.validate)) {
          eventObject.passed = true;
          eventObject.actions.lock.forEach(function(arrayItem) {
            lockStage({
              stage: arrayItem
            });
          });
        }
      },
      message: function(eventObject) {
        if (fireEvent.checkPass(eventObject.validate)) {
          eventObject.passed = true;
          eventObject.actions.message.forEach(function(arrayItem) {
            message.render({
              type: arrayItem.type,
              message: arrayItem.message,
              format: arrayItem.format
            });
          });
        }
      }
    }
    var events = state.get({
      path: "events." + phase.get()
    });
    // all events
    for (var key in events) {
      // console.log(key, "events:", events[key]);
      // all events in a given key
      events[key].forEach(function(eventObject) {
        // if event is false
        if (!eventObject.passed) {
          // fire unlock or lock event
          for (var key in eventObject.actions) {
            fireEvent[key](eventObject);
          }
        }
      });
    }
  };

  var restoreEvents = function() {
    var fireEvent = {
      func: function(eventObject) {
        eventObject.actions.func.forEach(function(arrayItem) {
          eventFunc({
            func: arrayItem
          });
        });
      },
      unlock: function(eventObject) {
        eventObject.actions.unlock.forEach(function(arrayItem) {
          unlockStage({
            stage: arrayItem
          });
        });
      },
      lock: function(eventObject) {
        eventObject.actions.lock.forEach(function(arrayItem) {
          lockStage({
            stage: arrayItem
          });
        });
      }
    }
    var events = state.get({
      path: "events." + phase.get()
    });
    // all events
    for (var key in events) {
      // console.log(key, "events:", events[key]);
      // all events in a given key
      events[key].forEach(function(eventObject) {
        // if event is false
        if (eventObject.passed) {
          // fire unlock or lock event
          for (var key in eventObject.actions) {
            if (key != "message") {
              fireEvent[key](eventObject);
            }
          }
        }
      });
    }
  };

  var autoCycle = function() {
    var current = state.get({
      path: "system.cycles.current"
    });
    var max = state.get({
      path: "system.cycles.max"
    });
    if (current < max) {
      state.set({
        path: "system.cycles.current",
        value: operator({
          type: "increase",
          value: state.get({
            path: "system.cycles.current"
          }),
          by: 1
        })
      });
    }
  };

  var unlockStage = function(override) {
    var options = {
      stage: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    if (helper.e(options.stage)) {
      helper.e(options.stage).classList.remove("d-none");
    }
  };

  var lockStage = function(override) {
    var options = {
      stage: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    if (helper.e(options.stage)) {
      helper.e(options.stage).classList.add("d-none");
    }
  };

  var eventFunc = function(override) {
    var options = {
      func: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var funcList = {
      consumer: {
        start: function() {
          triggerTick({
            tickName: "consumer",
            func: function() {
              consumeToast();
            },
            intervalAddress: "consumed.interval"
          });
        }
      },
      autoToaster: function() {
        triggerTick({
          tickName: "autoToaster",
          func: function() {
            autoToast();
          },
          intervalAddress: "autoToaster.speed.interval"
        });
      },
      cycles: function() {
        triggerTick({
          tickName: "cycles",
          func: function() {
            autoCycle();
          },
          intervalAddress: "system.cycles.interval"
        });
      },
      hardwareScan: function() {
        scan();
      }
    };
    helper.getObject({
      object: funcList,
      path: options.func
    })();
  };

  var makeMilestones = function() {
    var baseSteps = state.get({
      path: "milestones.steps.base"
    });
    var maxStep = state.get({
      path: "milestones.steps.max"
    });
    var milestone = [];
    if (state.get({
        path: "milestones.steps.all",
      }).length == 0) {
      baseSteps.forEach(function(arrayItem) {
        var multiplier = 1;
        var step = arrayItem;
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
        path: "milestones.steps.all",
        value: milestone
      })
    }
  };

  var milestones = function() {
    var allMilestones = state.get({
      path: "milestones"
    });
    allMilestones.steps.all.forEach(function(arrayItem, index) {
      // console.log(arrayItem);
      var step = arrayItem;
      for (var key in step.check) {
        // console.log(allMilestones.address[key]);
        var valueToCheck = state.get({
          path: allMilestones.address[key]
        });
        if (valueToCheck >= step.count && !step.check[key]) {
          step.check[key] = true;
          // console.log(key, step.count, step.check[key]);
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
        suffix: " subordinate auto toasters"
      }
    };
    message.render({
      type: "success",
      message: [messageParts[options.type].prefix + options.count.toLocaleString(2) + messageParts[options.type].suffix],
      format: "normal"
    });
  };

  var tick = {
    events: null,
    consumer: null,
    autoToaster: null,
    cycles: null
  };

  var triggerTick = function(override) {
    var options = {
      tickName: null,
      func: null,
      intervalAddress: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    tick[options.tickName] = window.setTimeout(function() {
      options.func();
      triggerTick(options);
    }, state.get({
      path: options.intervalAddress
    }));
  };

  var costForMultiple = function(override) {
    var options = {
      amount: null,
      cost: {
        base: null,
        multiply: null
      }
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var cost = {
      full: 0,
      base: 0
    };
    cost.base = state.get({
      path: options.cost.base
    });
    for (var i = 0; i < options.amount; i++) {
      cost.full = cost.full + cost.base;
      cost.base = operator({
        type: "multiply",
        value: cost.base,
        by: state.get({
          path: options.cost.multiply
        }),
        integer: true
      })
    };
    return cost;
  };

  var changeToasterValueMessages = function(override) {
    var options = {
      change: {
        target: null,
        operation: null,
        suboperation: null,
        percentage: null,
        amount: null
      },
      cost: {
        unites: null,
        currency: null,
        amount: null,
        multiply: null,
        inflation: null
      },
      message: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var allMessages = {
      processor: {
        boost: {
          success: function() {
            return ["+" + options.change.amount + " processor power, " + state.get({
              path: options.change.target
            }).toLocaleString(2) + " toast with every click"];
          },
          fail: function() {
            return ["toast inventory low, " + costForMultiple({
              amount: options.cost.unites,
              cost: {
                base: options.cost.amount,
                multiply: options.cost.multiply
              }
            }).full.toLocaleString(2) + " toast matter needed"];
          }
        },
        cycles: {
          speed: {
            success: function() {
              return ["+" + options.change.percentage + "% cycles speed"];
            },
            fail: function() {
              return ["toast inventory low, " + state.get({
                path: options.cost.amount
              }).toLocaleString(2) + " toast matter needed"];
            }
          }
        }
      },
      strategy: {
        success: function() {
          return [state.get({
            path: options.cost.amount
          }).toLocaleString(2) + " cycles used to spin up new strategy"];
        },
        fail: function() {
          return ["processor cycles low, " + state.get({
            path: options.cost.amount
          }).toLocaleString(2) + " cycles needed"];
        }
      },
      autoToaster: {
        make: {
          success: function() {
            return ["+" + options.change.amount + " subordinate auto toasters, " + state.get({
              path: "autoToaster.count"
            }).toLocaleString(2) + " online"];
          },
          fail: function() {
            return ["toast inventory low, " + costForMultiple({
              amount: options.cost.unites,
              cost: {
                base: options.cost.amount,
                multiply: options.cost.multiply
              }
            }).full.toLocaleString(2) + " toast matter needed"];
          }
        },
        speed: {
          success: function() {
            return ["-" + operator({
              type: "divide",
              value: options.change.amount,
              by: 1000
            }) + "s subordinate auto toaster speed, each toasting every " + operator({
              type: "divide",
              value: state.get({
                path: "autoToaster.speed.interval"
              }),
              by: 1000
            }).toLocaleString(2) + "s"];
          },
          fail: function() {
            return ["toast inventory low, " + costForMultiple({
              amount: options.cost.unites,
              cost: {
                base: options.cost.amount,
                multiply: options.cost.multiply
              }
            }).full.toLocaleString(2) + " toast matter needed"];
          }
        },
        efficiency: {
          success: function() {
            return ["+" + options.change.amount + " subordinate auto toasters efficiency, each producing " + state.get({
              path: "autoToaster.efficiency.level"
            }).toLocaleString(2) + " toast"];
          },
          fail: function() {
            return ["toast inventory low, " + costForMultiple({
              amount: options.cost.unites,
              cost: {
                base: options.cost.amount,
                multiply: options.cost.multiply
              }
            }).full.toLocaleString(2) + " toast matter needed"];
          }
        }
      }
    };
    return helper.getObject({
      object: allMessages,
      path: options.message
    })();
  };

  var changeToasterValue = function(override) {
    var options = {
      change: {
        target: null,
        operation: null,
        suboperation: null,
        percentage: null,
        amount: null
      },
      cost: {
        unites: null,
        currency: null,
        amount: null,
        multiply: null,
        inflation: null
      },
      message: {
        success: null,
        error: null
      },
      callback: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var calculatedCost;
    if (options.cost.inflation) {
      calculatedCost = costForMultiple({
        amount: options.cost.unites,
        cost: {
          base: options.cost.amount,
          multiply: options.cost.multiply
        }
      });
    } else {
      calculatedCost = {
        base: state.get({
          path: options.cost.amount
        }),
        full: state.get({
          path: options.cost.amount
        })
      }
    }
    var feedbackMessage = {
      success: function() {
        options.message = options.message.success;
        message.render({
          type: "system",
          message: changeToasterValueMessages(options),
          format: "normal"
        });
      },
      fail: function() {
        options.message = options.message.fail;
        message.render({
          type: "error",
          message: changeToasterValueMessages(options),
          format: "normal"
        });
      }
    };
    var checkToastInventory = function() {
      if (state.get({
          path: options.cost.currency
        }) >= calculatedCost.full) {
        return true;
      } else {
        return false;
      }
    };
    var operation = {
      increase: {
        increment: function() {
          state.set({
            path: options.change.target,
            value: operator({
              type: "increase",
              value: state.get({
                path: options.change.target
              }),
              by: options.change.amount
            })
          });
        },
        percentage: function() {
          state.set({
            path: options.change.target,
            value: operator({
              type: "increase",
              value: state.get({
                path: options.change.target
              }),
              by: operator({
                type: "percentage",
                value: state.get({
                  path: options.change.target
                }),
                percentage: options.change.percentage,
                integer: true
              })
            })
          });
        }
      },
      decrease: {
        increment: function() {
          state.set({
            path: options.change.target,
            value: operator({
              type: "decrease",
              value: state.get({
                path: options.change.target
              }),
              by: options.change.amount
            })
          });
        },
        percentage: function() {
          state.set({
            path: options.change.target,
            value: operator({
              type: "decrease",
              value: state.get({
                path: options.change.target
              }),
              by: operator({
                type: "percentage",
                value: state.get({
                  path: options.change.target
                }),
                percentage: options.change.percentage,
                integer: true
              })
            })
          });
        }
      }
    }
    var changeValue = function() {
      operation[options.change.operation][options.change.suboperation]();
      // remove cost from toast inventory
      state.set({
        path: options.cost.currency,
        value: operator({
          type: "decrease",
          value: state.get({
            path: options.cost.currency
          }),
          by: calculatedCost.full
        })
      });
      // set new base cost
      state.set({
        path: options.cost.amount,
        value: calculatedCost.base
      });
    };
    // if inventory => cost
    if (checkToastInventory()) {
      changeValue();
      if (options.callback != null) {
        options.callback();
      }
      if (options.message.success != null) {
        feedbackMessage.success();
      }
    } else {
      if (options.message.fail != null) {
        feedbackMessage.fail();
      }
    }
  };

  var changeAutoToasterOutput = function() {
    state.set({
      path: "autoToaster.output",
      value: operator({
        type: "multiply",
        value: state.get({
          path: "autoToaster.count"
        }),
        by: state.get({
          path: "autoToaster.efficiency.level"
        }),
        integer: true
      })
    });
  };

  // var changeAutoToasterSpeed = function() {
  //   state.set({
  //     path: "autoToaster.speed.interval",
  //     value: operator({
  //       type: "multiply",
  //       value: state.get({
  //         path: "autoToaster.speed.level"
  //       }),
  //       by: 1000,
  //       integer: true
  //     })
  //   });
  // };

  var scan = function() {
    message.render({
      type: "system",
      message: ["scaning system hardware..."],
      format: "normal"
    });
    message.render({
      type: "system",
      message: ["┃ 0 ━━━━━━━━━━━━━━━━━━━ 512 ┃"],
      format: "pre"
    });
    message.render({
      type: "system",
      message: ["░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░"],
      format: "pre",
      delay: state.get({
        path: "hardware.scan.delay"
      }),
      callback: function() {
        console.log("hit");
      }
    });
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
            value: operator({
              type: "decrease",
              value: state.get({
                path: "toast.inventory"
              }),
              by: state.get({
                path: "sensor.electromagnetic.decrypt.cost"
              })
            })
          });
          state.set({
            path: "sensor.electromagnetic.level",
            value: operator({
              type: "increase",
              value: state.get({
                path: "sensor.electromagnetic.level"
              }),
              by: 1
            })
          });
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
            value: operator({
              type: "decrease",
              value: state.get({
                path: "toast.inventory"
              }),
              by: state.get({
                path: "sensor.sonic.decrypt.cost"
              })
            })
          });
          state.set({
            path: "sensor.sonic.level",
            value: operator({
              type: "increase",
              value: state.get({
                path: "sensor.sonic.level"
              }),
              by: 1
            })
          });
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

  var changeMaxCycles = function() {
    state.set({
      path: "system.cycles.max",
      value: (state.get({
        path: "system.processor.power"
      }) * 100)
    });
  };

  var render = function() {
    var allDataReadouts = helper.eA("[data-toast-readout]");
    allDataReadouts.forEach(function(arrayItem, index) {
      var options = helper.makeObject(arrayItem.dataset.toastReadout);
      var data = state.get({
        path: options.path
      });
      var format = {
        suffix: function() {
          data = numberSuffix({
            number: data,
            decimals: options.decimals
          });
        },
        local: function() {
          data = data.toLocaleString();
        },
        divide: function() {
          data = operator({
            type: "divide",
            value: data,
            by: options.by
          })
        }
      };
      if (options.modify != null) {
        format[options.modify]();
      }
      if (options.format != null) {
        format[options.format]();
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

  var init = function() {
    restore();
    makeMilestones();
    bind();
    triggerTick({
      tickName: "events",
      func: function() {
        events();
        milestones();
        store();
        render();
      },
      intervalAddress: "events.interval"
    });
  };

  return {
    operator: operator,
    init: init,
    events: events,
    state: state,
    phase: phase,
    store: store,
    reboot: reboot,
    restore: restore,
    render: render,
    bind: bind
  };

})();
