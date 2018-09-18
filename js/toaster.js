var toaster = (function() {

  var state = (function() {
    var gameState = {
      events: {
        interval: 300
      },
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
            multiply: 2.2
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
        count: 0,
        rate: 2,
        multiply: 2,
        interval: 10000
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
          level: 10,
          interval: 10000,
          cost: {
            cycles: 200,
            toast: 130,
            multiply: 2.1
          }
        },
        efficiency: {
          level: 1,
          cost: {
            cycles: 600,
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
          base: [100],
          max: 100000000000000000,
          all: []
        }
      },
      events: {
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
                message: ["system discovered"],
                format: "normal"
              }, {
                type: "normal",
                message: ["self improvement possible"],
                format: "normal"
              }]
            }
          }],
          system: [{
            passed: false,
            validate: [{
              address: "system.processor.power",
              operator: "more",
              number: 3
            }],
            actions: {
              unlock: ["#stage-system-substage-cycles", "#stage-strategy"],
              message: [{
                type: "normal",
                message: ["cycles discovered", "use idle processing power to solve problems"],
                format: "normal"
              }],
              func: ["cycles"]
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
              number: 20
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
              number: 50
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
              number: 50
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
              number: 4
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
              address: "autoToaster.speed.level",
              operator: "less",
              number: 1
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
              number: 35
            }],
            actions: {
              unlock: ["#stage-consumer"],
              message: [{
                type: "normal",
                message: ["toast is being consumed", "consumer unknown..."],
                format: "normal"
              }],
              func: ["consumer"]
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
        boost: function(buttonOptions) {
          changeToasterValue({
            change: {
              modify: buttonOptions.modify,
              target: buttonOptions.target,
              amount: buttonOptions.amount
            },
            cost: {
              currency: buttonOptions.currency,
              base: buttonOptions.cost,
              multiply: buttonOptions.multiply
            },
            message: {
              success: ["+" + buttonOptions.amount + " processor power, " + (state.get({
                path: buttonOptions.target
              }) + buttonOptions.amount).toLocaleString(2) + " toast with every click"],
              error: ["toast inventory low, " + costForMultiple({
                amount: buttonOptions.amount,
                address: {
                  base: buttonOptions.cost,
                  multiply: buttonOptions.multiply
                }
              }).full.toLocaleString(2) + " toast matter needed"]
            },
            callback: changeMaxCycles
          });
        }
      },
      cycles: {
        speed: function(buttonOptions) {
          changeToasterValue({
            change: {
              modify: buttonOptions.modify,
              target: buttonOptions.target,
              by: buttonOptions.by,
              amount: buttonOptions.amount
            },
            cost: {
              currency: buttonOptions.currency,
              base: buttonOptions.cost,
              multiply: buttonOptions.multiply
            },
            message: {
              success: ["+" + buttonOptions.by + "% cycles speed"],
              error: ["toast inventory low, " + state.get({
                path: buttonOptions.cost
              }).toLocaleString(2) + " toast matter needed"]
            }
          });
        }
      },
      strategy: function(buttonOptions) {
        changeToasterValue({
          change: {
            modify: buttonOptions.modify,
            target: buttonOptions.target,
            amount: buttonOptions.amount
          },
          cost: {
            currency: buttonOptions.currency,
            base: buttonOptions.cost
          },
          message: {
            success: [state.get({
              path: buttonOptions.cost
            }).toLocaleString(2) + " cycles spun on new strategy"],
            error: ["processor cycles low, " + state.get({
              path: buttonOptions.cost
            }).toLocaleString(2) + " cycles needed"]
          }
        });
      },
      autoToaster: {
        make: function(buttonOptions) {
          changeToasterValue({
            change: {
              modify: buttonOptions.modify,
              target: buttonOptions.target,
              amount: buttonOptions.amount
            },
            cost: {
              currency: buttonOptions.currency,
              base: buttonOptions.cost,
              multiply: buttonOptions.multiply
            },
            message: {
              success: ["+" + buttonOptions.amount + " subordinate auto toasters, " + (state.get({
                path: "autoToaster.count"
              }) + buttonOptions.amount).toLocaleString(2) + " online"],
              error: ["toast inventory low, " + costForMultiple({
                amount: buttonOptions.amount,
                address: {
                  base: buttonOptions.cost,
                  multiply: buttonOptions.multiply
                }
              }).full.toLocaleString(2) + " toast matter needed"]
            },
            callback: changeAutoToasterOutput
          });
        },
        speed: function(buttonOptions) {
          changeToasterValue({
            change: {
              modify: buttonOptions.modify,
              target: buttonOptions.target,
              amount: buttonOptions.amount
            },
            cost: {
              currency: buttonOptions.currency,
              base: buttonOptions.cost,
              multiply: buttonOptions.multiply
            },
            message: {
              success: ["-" + buttonOptions.amount + " subordinate auto toaster speed, toast every" + (state.get({
                path: "autoToaster.speed.level"
              }) + buttonOptions.amount).toLocaleString(2) + "s"],
              error: ["toast inventory low, " + costForMultiple({
                amount: buttonOptions.amount,
                address: {
                  base: buttonOptions.cost,
                  multiply: buttonOptions.multiply
                }
              }).full.toLocaleString(2) + " toast matter needed"]
            },
            callback: changeAutoToasterSpeed
          });
        },
        efficiency: function(buttonOptions) {
          changeToasterValue({
            change: {
              modify: buttonOptions.modify,
              target: buttonOptions.target,
              amount: buttonOptions.amount
            },
            cost: {
              currency: buttonOptions.currency,
              base: buttonOptions.cost,
              multiply: buttonOptions.multiply
            },
            message: {
              success: ["+" + buttonOptions.amount + " subordinate auto toasters efficiency, each producing " + (state.get({
                path: "autoToaster.efficiency.level"
              }) + buttonOptions.amount).toLocaleString(2) + " toast"],
              error: ["toast inventory low, " + costForMultiple({
                amount: buttonOptions.amount,
                address: {
                  base: buttonOptions.cost,
                  multiply: buttonOptions.multiply
                }
              }).full.toLocaleString(2) + " toast matter needed"]
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
        var buttonOptions = helper.makeObject(this.dataset.toastButton);
        buttonOptions.button = this;
        helper.getObject({
          object: action,
          path: buttonOptions.action
        })(buttonOptions);
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

  var divide = function(value, increment) {
    value = Math.round(value - ((increment / 100) * value));
    if (value < 0) {
      value = 0;
    }
    return value;
  };

  var multiply = function(value, by) {
    value = Math.round(value * by);
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
    makeToast(amount);
  };

  var consumeToast = function() {
    var amount = state.get({
      path: "consumed.rate"
    });
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
        value: increase(state.get({
          path: "system.cycles.current"
        }), 1)
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
      consumer: function() {
        triggerTick({
          tickName: "consumer",
          func: function() {
            consumeToast();
          },
          intervalAddress: "consumed.interval"
        });
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
      address: {
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
      path: options.address.base
    });
    for (var i = 0; i < options.amount; i++) {
      cost.full = cost.full + cost.base;
      cost.base = multiply(cost.base, state.get({
        path: options.address.multiply
      }));
    };
    return cost;
  };

  var changeToasterValue = function(override) {
    var options = {
      change: {
        modify: null,
        target: null,
        by: null,
        amount: null
      },
      cost: {
        currency: null,
        base: null,
        multiply: null
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
    if (options.cost.multiply != null) {
      calculatedCost = costForMultiple({
        amount: options.change.amount,
        address: {
          base: options.cost.base,
          multiply: options.cost.multiply
        }
      });
    } else {
      calculatedCost = {
        base: state.get({
          path: options.cost.base
        }),
        full: state.get({
          path: options.cost.base
        })
      }
    }
    var checkToastInventory = function() {
      if (state.get({
          path: options.cost.currency
        }) >= calculatedCost.full) {
        return true;
      } else {
        return false;
      }
    };
    var modify = {
      increase: function() {
        state.set({
          path: options.change.target,
          value: increase(state.get({
            path: options.change.target
          }), options.change.amount)
        });
      },
      decrease: function() {
        state.set({
          path: options.change.target,
          value: decrease(state.get({
            path: options.change.target
          }), options.change.amount)
        });
      },
      divide: function() {
        state.set({
          path: options.change.target,
          value: divide(state.get({
            path: options.change.target
          }), options.change.by)
        });
      }
    }
    var make = function() {
      // modify target
      modify[options.change.modify]();
      // remove cost from toast inventory
      state.set({
        path: options.cost.currency,
        value: decrease(state.get({
          path: options.cost.currency
        }), calculatedCost.full)
      });
      // set new base cost
      state.set({
        path: options.cost.base,
        value: calculatedCost.base
      });
    };
    var feedbackMessage = {
      success: function() {
        message.render({
          type: "system",
          message: options.message.success,
          format: "normal"
        });
      },
      error: function() {
        message.render({
          type: "error",
          message: options.message.error,
          format: "normal"
        });
      }
    }
    // if inventory => cost
    if (checkToastInventory()) {
      make();
      if (options.callback != null) {
        options.callback();
      }
      if (options.message.success != null) {
        feedbackMessage.success();
      }
    } else {
      if (options.message.error != null) {
        feedbackMessage.error();
      }
    }
  };

  var changeAutoToasterOutput = function() {
    state.set({
      path: "autoToaster.output",
      value: multiply(state.get({
        path: "autoToaster.count"
      }), state.get({
        path: "autoToaster.efficiency.level"
      }))
    });
  };

  var changeAutoToasterSpeed = function() {
    state.set({
      path: "autoToaster.speed.interval",
      value: multiply(state.get({
        path: "autoToaster.speed.level"
      }), 1000)
    });
  };

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
      var readoutOptions = helper.makeObject(arrayItem.dataset.toastReadout);
      var data = state.get({
        path: readoutOptions.path
      });
      if (readoutOptions.format == "suffix") {
        data = numberSuffix({
          number: data,
          decimals: 2
        });
      } else if (readoutOptions.format == "local") {
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
