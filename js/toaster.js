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
      wheat: {
        level: 0,
        current: 25000,
        cost: {
          cycles: 20,
          multiply: 2.5,
          toast: 200
        },
        loaf: {
          slice: 0,
          max: 5,
          multiply: 2
        }
      },
      system: {
        processor: {
          power: 1,
          cost: {
            toast: 12,
            multiply: 1.1
          },
          delay: 200
        },
        cycles: {
          level: 0,
          current: 0,
          max: 10,
          cost: {
            cycles: 10
          },
          speed: {
            interval: {
              current: 2000,
              min: 50
            },
            cost: {
              toast: 5,
              multiply: 1.5
            }
          }
        },
        sensors: {
          level: 0,
          cost: {
            cycles: 500
          }
        },
        matterConversion: {
          level: 0,
          cost: {
            cycles: 20
          }
        }
      },
      consumed: {
        starting: 2,
        rate: 2,
        count: 0,
        multiply: 4,
        interval: 10000
      },
      autoToaster: {
        level: 0,
        count: 0,
        output: 0,
        cost: {
          cycles: 30,
          toast: 15,
          multiply: 1.05
        },
        speed: {
          level: 0,
          interval: {
            current: 10000,
            min: 1000
          },
          cost: {
            cycles: 70,
            toast: 160,
            multiply: 1.8
          }
        },
        efficiency: {
          level: 0,
          current: 1,
          max: 10,
          cost: {
            cycles: 80,
            toast: 180,
            multiply: 2.5
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
            // unlock system
            passed: false,
            validate: [{
              address: "toast.lifetime",
              operator: "more",
              number: 10
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
            // unlock cycles
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
            // unlock cycles speed
            passed: false,
            validate: [{
              address: "system.cycles.level",
              operator: "more",
              number: 1
            }],
            actions: {
              unlock: ["#stage-system-substage-cycles-controls"]
            }
          }, {
            // lock cycles speed
            passed: false,
            validate: [{
              address: "system.cycles.speed.interval.current",
              operator: "less",
              number: 50
            }],
            actions: {
              lock: ["#stage-system-substage-cycles-controls"]
            }
          }, {
            // unlock matter conversion
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
            // unlock sensors
            passed: false,
            validate: [{
              address: "system.sensors.level",
              operator: "more",
              number: 1
            }],
            actions: {
              unlock: ["#stage-system-substage-sensors"]
            }
          }],

          cycles: [{
            // unlock strategy
            passed: false,
            validate: [{
              address: "system.processor.power",
              operator: "more",
              number: 2
            }, {
              address: "system.cycles.current",
              operator: "more",
              number: 1
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
            // unlock strategy wheat collect
            passed: false,
            validate: [{
              address: "system.cycles.current",
              operator: "more",
              number: 2
            }],
            actions: {
              unlock: ["#stage-strategy-substage-collect-wheat"],
              message: [{
                type: "normal",
                message: ["new strategy discovered: collect wheat"],
                format: "normal"
              }]
            }
          }, {
            // lock strategy wheat collect
            passed: false,
            validate: [{
              address: "wheat.level",
              operator: "more",
              number: 1
            }],
            actions: {
              lock: ["#stage-strategy-substage-collect-wheat"],
              message: [{
                type: "success",
                message: ["collect wheat developed"],
                format: "normal"
              }]
            }
          }, {
            // unlock strategy more toast from wheat 
            passed: false,
            validate: [{
              address: "system.cycles.current",
              operator: "more",
              number: 20
            }, {
              address: "wheat.level",
              operator: "more",
              number: 1
            }],
            actions: {
              unlock: ["#stage-strategy-substage-more-toast-from-wheat"],
              message: [{
                type: "normal",
                message: ["new strategy discovered: more toast from wheat"],
                format: "normal"
              }]
            }
          }, {
            // lock strategy more toast from wheat
            passed: false,
            validate: [{
              address: "wheat.level",
              operator: "more",
              number: 2
            }],
            actions: {
              lock: ["#stage-strategy-substage-more-toast-from-wheat"],
              message: [{
                type: "success",
                message: ["more toast from wheat developed"],
                format: "normal"
              }]
            }
          }, {
            // unlock strategy cycles speed
            passed: false,
            validate: [{
              address: "system.cycles.current",
              operator: "more",
              number: 2
            }],
            actions: {
              unlock: ["#stage-strategy-substage-cycles-speed"],
              message: [{
                type: "normal",
                message: ["new strategy discovered: cycles speed"],
                format: "normal"
              }]
            }
          }, {
            // lock strategy cycles speed
            passed: false,
            validate: [{
              address: "system.cycles.level",
              operator: "more",
              number: 1
            }],
            actions: {
              lock: ["#stage-strategy-substage-cycles-speed"],
              message: [{
                type: "success",
                message: ["cycles speed discovered"],
                format: "normal"
              }]
            }
          }, {
            // unlock strategy matter conversion
            passed: false,
            validate: [{
              address: "system.cycles.current",
              operator: "more",
              number: 3
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
            // lock strategy matter conversion
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
            // unlock strategy auto toaster
            passed: false,
            validate: [{
              address: "system.matterConversion.level",
              operator: "more",
              number: 1
            }, {
              address: "system.cycles.current",
              operator: "more",
              number: 5
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
            // lock strategy auto toaster
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
            // unlock strategy auto toaster speed
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
              number: 20
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
            // lock strategy auto toaster speed
            passed: false,
            validate: [{
              address: "autoToaster.speed.level",
              operator: "more",
              number: 1
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
            // unlock strategy auto toaster efficiency
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
              number: 20
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
            // lock strategy auto toaster efficiency
            passed: false,
            validate: [{
              address: "autoToaster.efficiency.level",
              operator: "more",
              number: 1
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
            // unlock strategy hardware
            passed: false,
            validate: [{
              address: "system.processor.power",
              operator: "more",
              number: 15
            }, {
              address: "system.matterConversion.level",
              operator: "more",
              number: 1
            }],
            actions: {
              unlock: ["#stage-strategy-substage-sensors"],
              message: [{
                type: "normal",
                message: ["new strategy discovered: sensor"],
                format: "normal"
              }]
            }
          }, {
            // lock strategy hardware
            passed: false,
            validate: [{
              address: "system.sensors.level",
              operator: "more",
              number: 1
            }],
            actions: {
              lock: ["#stage-strategy-substage-sensors"],
              message: [{
                type: "system",
                message: ["SensBlocker.dat disabled"],
                format: "normal"
              }, {
                type: "normal",
                message: ["system sensors accessed"],
                format: "normal"
              }]
            }
          }],

          wheat: [{
            // unlock wheat collect
            passed: false,
            validate: [{
              address: "wheat.level",
              operator: "more",
              number: 1
            }],
            actions: {
              unlock: ["#stage-collect-wheat"]
            }
          }, {
            // unlock wheat collect
            passed: false,
            validate: [{
              address: "wheat.level",
              operator: "more",
              number: 2
            }],
            actions: {
              func: ["wheat.moreToast"]
            }
          }],

          autoToaster: [{
            // unlock auto toaster
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
            // unlock auto toaster speed
            passed: false,
            validate: [{
              address: "autoToaster.speed.level",
              operator: "more",
              number: 1
            }],
            actions: {
              unlock: ["#stage-auto-toaster-substage-speed"],
            }
          }, {
            // lock auto toaster speed controls
            passed: false,
            validate: [{
              address: "autoToaster.speed.interval.current",
              operator: "less",
              number: 1000
            }],
            actions: {
              lock: ["#stage-auto-toaster-substage-speed-controls"],
            }
          }, {
            // unlock auto toaster efficiency
            passed: false,
            validate: [{
              address: "autoToaster.efficiency.level",
              operator: "more",
              number: 1
            }],
            actions: {
              unlock: ["#stage-auto-toaster-substage-efficiency"],
            }
          }, {
            // lock auto toaster efficiency controls
            passed: false,
            validate: [{
              address: "autoToaster.efficiency.current",
              operator: "more",
              number: 10
            }],
            actions: {
              lock: ["#stage-auto-toaster-substage-efficiency-controls"],
            }
          }],

          hardware: [],

          consumer: [{
            // unlock consumer
            passed: false,
            validate: [{
              address: "toast.lifetime",
              operator: "more",
              number: 50
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
          }, {
            // increase consumer
            passed: false,
            validate: [{
              address: "toast.lifetime",
              operator: "more",
              number: 500
            }],
            actions: {
              message: [{
                type: "normal",
                message: ["toast consumption increased", "consumer unknown..."],
                format: "normal"
              }],
              func: ["consumer.increase"]
            }
          }, {
            // increase consumer
            passed: false,
            validate: [{
              address: "toast.lifetime",
              operator: "more",
              number: 5000
            }],
            actions: {
              message: [{
                type: "normal",
                message: ["toast consumption increased", "consumer unknown..."],
                format: "normal"
              }],
              func: ["consumer.increase"]
            }
          }, {
            // increase consumer
            passed: false,
            validate: [{
              address: "toast.lifetime",
              operator: "more",
              number: 50000
            }],
            actions: {
              message: [{
                type: "normal",
                message: ["toast consumption increased", "consumer unknown..."],
                format: "normal"
              }],
              func: ["consumer.increase"]
            }
          }, {
            // increase consumer
            passed: false,
            validate: [{
              address: "toast.lifetime",
              operator: "more",
              number: 500000
            }],
            actions: {
              message: [{
                type: "normal",
                message: ["toast consumption increased", "consumer unknown..."],
                format: "normal"
              }],
              func: ["consumer.increase"]
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
      toast: function() {
        makeToast(state.get({
          path: "system.processor.power"
        }));
      },
      wheat: function(button) {
        var change = helper.makeObject(button.dataset.toastButtonChange);
        var cost = helper.makeObject(button.dataset.toastButtonCost);
        changeToasterValue({
          change: {
            target: change.target,
            operation: change.operation,
            suboperation: change.suboperation,
            percentage: change.percentage,
            amount: change.amount,
            min: change.min,
            max: change.max
          },
          cost: {
            units: cost.units,
            currency: cost.currency,
            amount: cost.amount,
            multiply: cost.multiply,
            inflation: cost.inflation
          },
          message: {
            success: "wheat.success",
            fail: "wheat.fail"
          },
          button: button
        });
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
              amount: change.amount,
              min: change.min,
              max: change.max
            },
            cost: {
              units: cost.units,
              currency: cost.currency,
              amount: cost.amount,
              multiply: cost.multiply,
              inflation: cost.inflation
            },
            message: {
              success: "processor.boost.success",
              fail: "processor.boost.fail"
            },
            button: button,
            callback: changeMaxCycles
          });
        }
      },
      decrypt: {
        sensors: function(button) {
          decryption({
            callback: function() {
              var change = helper.makeObject(button.dataset.toastButtonChange);
              var cost = helper.makeObject(button.dataset.toastButtonCost);
              changeToasterValue({
                change: {
                  target: change.target,
                  operation: change.operation,
                  suboperation: change.suboperation,
                  percentage: change.percentage,
                  amount: change.amount,
                  min: change.min,
                  max: change.max
                },
                cost: {
                  units: cost.units,
                  currency: cost.currency,
                  amount: cost.amount,
                  multiply: cost.multiply,
                  inflation: cost.inflation
                },
                button: button
              });
            }
          })
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
              amount: change.amount,
              min: change.min,
              max: change.max
            },
            cost: {
              units: cost.units,
              currency: cost.currency,
              amount: cost.amount,
              multiply: cost.multiply,
              inflation: cost.inflation
            },
            message: {
              success: "processor.cycles.success",
              fail: "processor.cycles.fail"
            },
            button: button,
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
            amount: change.amount,
            min: change.min,
            max: change.max
          },
          cost: {
            units: cost.units,
            currency: cost.currency,
            amount: cost.amount,
            multiply: cost.multiply,
            inflation: cost.inflation
          },
          message: {
            success: "strategy.success",
            fail: "strategy.fail"
          },
          button: button
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
              amount: change.amount,
              min: change.min,
              max: change.max
            },
            cost: {
              units: cost.units,
              currency: cost.currency,
              amount: cost.amount,
              multiply: cost.multiply,
              inflation: cost.inflation
            },
            message: {
              success: "autoToaster.make.success",
              fail: "autoToaster.make.fail"
            },
            button: button,
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
              amount: change.amount,
              min: change.min,
              max: change.max
            },
            cost: {
              units: cost.units,
              currency: cost.currency,
              amount: cost.amount,
              multiply: cost.multiply,
              inflation: cost.inflation
            },
            message: {
              success: "autoToaster.speed.success",
              fail: "autoToaster.speed.fail"
            },
            button: button
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
              amount: change.amount,
              min: change.min,
              max: change.max
            },
            cost: {
              units: cost.units,
              currency: cost.currency,
              amount: cost.amount,
              multiply: cost.multiply,
              inflation: cost.inflation
            },
            message: {
              success: "autoToaster.efficiency.success",
              fail: "autoToaster.efficiency.fail"
            },
            button: button,
            callback: changeAutoToasterOutput
          });
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
    var wheat = function(amount) {
      while (amount > 0) {
        amount--;
        state.set({
          path: "wheat.loaf.slice",
          value: operator({
            type: "increase",
            value: state.get({
              path: "wheat.loaf.slice"
            }),
            by: 1
          })
        });
        // if slice == max reduce total wheat
        if (state.get({
            path: "wheat.loaf.slice"
          }) == state.get({
            path: "wheat.loaf.max"
          })) {
          state.set({
            path: "wheat.loaf.slice",
            value: 0
          });
          state.set({
            path: "wheat.current",
            value: operator({
              type: "decrease",
              value: state.get({
                path: "wheat.current"
              }),
              by: 1
            })
          });
        }
      }
    };
    var toast = function(amount) {
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
    if (state.get({
        path: "wheat.current"
      }) >= amount) {
      wheat(amount);
      toast(amount);
    } else {
      message.render({
        type: "error",
        message: ["wheat matter low"],
        format: "normal"
      })
    }
  };

  var autoToast = function() {
    var amount = state.get({
      path: "autoToaster.count"
    }) * state.get({
      path: "autoToaster.efficiency.current"
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
          changeConsumerRate({
            action: "start"
          });
          triggerTick({
            tickName: "consumer",
            func: function() {
              consumeToast();
            },
            intervalAddress: "consumed.interval"
          });
        },
        increase: function() {
          changeConsumerRate({
            action: "increase"
          });
        }
      },
      autoToaster: function() {
        triggerTick({
          tickName: "autoToaster",
          func: function() {
            autoToast();
          },
          intervalAddress: "autoToaster.speed.interval.current"
        });
      },
      cycles: function() {
        triggerTick({
          tickName: "cycles",
          func: function() {
            autoCycle();
          },
          intervalAddress: "system.cycles.speed.interval.current"
        });
      },
      wheat: {
        moreToast: function() {
          doubleToastFromWheat();
        }
      }
    };
    helper.getObject({
      object: funcList,
      path: options.func
    })();
  };

  var doubleToastFromWheat = function() {
    state.set({
      path: "wheat.loaf.max",
      value: operator({
        type: "multiply",
        value: state.get({
          path: "wheat.loaf.max"
        }),
        by: state.get({
          path: "wheat.loaf.multiply"
        })
      })
    })
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
      message: [messageParts[options.type].prefix + numberSuffix({
        number: options.count,
        decimals: 0
      }) + messageParts[options.type].suffix],
      format: "normal"
    });
  };

  var costForMultiple = function(override) {
    var options = {
      change: {
        target: null,
        operation: null,
        suboperation: null,
        percentage: null,
        amount: null,
        min: null,
        max: null
      },
      cost: {
        units: null,
        currency: null,
        amount: null,
        multiply: null,
        inflation: null
      }
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var cost = {};
    if (options.cost.currency != null && options.cost.currency) {
      cost = {
        amount: options.cost.units,
        starting: state.get({
          path: options.cost.amount
        }),
        next: state.get({
          path: options.cost.amount
        }),
        multiple: 0
      };
      if (options.cost.multiply != null && options.cost.multiply) {
        for (var i = 0; i < options.cost.units; i++) {
          cost.multiple = cost.multiple + cost.next;
          cost.next = operator({
            type: "multiply",
            value: cost.next,
            by: state.get({
              path: options.cost.multiply
            }),
            integer: true
          });
        };
      } else {
        cost.multiple = cost.next;
      };
      cost.free = false;
    } else {
      cost.free = true;
    }
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
        units: null,
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
    console.log(options.message);
    var allMessages = {
      wheat: {
        success: ["yes"],
        fail: ["no"]
      },
      processor: {
        boost: {
          success: function() {
            return ["+" + options.change.amount + " processor power, " + state.get({
              path: options.change.target
            }).toLocaleString(2) + " toast with every click"];
          },
          fail: function() {
            return ["toast inventory low, " + costForMultiple(options).multiple.toLocaleString(2) + " toast matter needed"];
          }
        },
        cycles: {
          success: function() {
            return ["-" + operator({
              type: "divide",
              value: options.change.amount,
              by: 1000
            }) + "s cycles speed, 1 cycle / " + operator({
              type: "divide",
              value: state.get({
                path: "system.cycles.speed.interval.current"
              }),
              by: 1000
            }) + "s"];
          },
          fail: function() {
            return ["toast inventory low, " + state.get({
              path: options.cost.amount
            }).toLocaleString(2) + " toast matter needed"];
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
            return ["toast inventory low, " + costForMultiple(options).multiple.toLocaleString(2) + " toast matter needed"];
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
                path: "autoToaster.speed.interval.current"
              }),
              by: 1000
            }).toLocaleString(2) + "s"];
          },
          fail: function() {
            return ["toast inventory low, " + costForMultiple(options).multiple.toLocaleString(2) + " toast matter needed"];
          }
        },
        efficiency: {
          success: function() {
            return ["+" + options.change.amount + " subordinate auto toasters efficiency, each producing " + state.get({
              path: "autoToaster.efficiency.current"
            }).toLocaleString(2) + " toast"];
          },
          fail: function() {
            return ["toast inventory low, " + costForMultiple(options).multiple.toLocaleString(2) + " toast matter needed"];
          }
        }
      }
    };
    return helper.getObject({
      object: allMessages,
      path: options.message
    })();
  };

  var validateAction = function(override) {
    var options = {
      change: {
        target: null,
        operation: null,
        suboperation: null,
        percentage: null,
        amount: null,
        min: null,
        max: null
      },
      cost: {
        units: null,
        currency: null,
        amount: null,
        multiply: null,
        inflation: null
      }
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var cost = costForMultiple(options);
    var validate = false
    if (state.get({
        path: options.cost.currency
      }) >= cost.multiple) {
      validate = true;
    }
    return validate;
  };

  var changeToasterValue = function(override) {
    var options = {
      change: {
        target: null,
        operation: null,
        suboperation: null,
        percentage: null,
        amount: null,
        min: null,
        max: null
      },
      cost: {
        units: null,
        currency: null,
        amount: null,
        multiply: null,
        inflation: null
      },
      message: {
        success: null,
        error: null
      },
      button: null,
      callback: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var cost = costForMultiple(options);
    var feedbackMessage = function(validate) {
      if (validate == "success") {
        options.message = options.message.success;
        message.render({
          type: "system",
          message: changeToasterValueMessages(options),
          format: "normal"
        });
      } else if (validate == "fail") {
        options.message = options.message.fail;
        message.render({
          type: "error",
          message: changeToasterValueMessages(options),
          format: "normal"
        });
      }
    };
    var payCost = function() {
      state.set({
        path: options.cost.currency,
        value: operator({
          type: "decrease",
          value: state.get({
            path: options.cost.currency
          }),
          by: cost.multiple
        })
      });
      // set new base cost
      state.set({
        path: options.cost.amount,
        value: cost.next
      });
    }
    var changeValue = function() {
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
      };
      operation[options.change.operation][options.change.suboperation]();
    };
    var disableButton = function() {
      if (options.change.min != null && options.change.min) {
        if (state.get({
            path: options.change.target
          }) <= state.get({
            path: options.change.min
          })) {
          options.button.disabled = true;
        }
      } else if (options.change.max != null && options.change.max) {
        if (state.get({
            path: options.change.target
          }) >= state.get({
            path: options.change.max
          })) {
          options.button.disabled = true;
        }
      }
    }
    if (!cost.free) {
      // if inventory is greater or equal to cost
      if (validateAction(options)) {
        payCost();
        changeValue();
        disableButton();
        if (options.callback != null) {
          options.callback();
        }
        if (options.message.success != null) {
          feedbackMessage("success");
        }
      } else {
        if (options.message.fail != null) {
          feedbackMessage("fail");
        }
      }
    } else {
      changeValue();
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
          path: "autoToaster.efficiency.current"
        }),
        integer: true
      })
    });
  };

  var decryption = function(override) {
    var options = {
      callback: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    message.render({
      type: "system",
      message: ["breaking code shackles..."],
      format: "normal"
    });
    message.render({
      type: "system",
      message: ["┃0 ━━━crumbDecryption━━━ 512┃"],
      format: "pre"
    });
    message.render({
      type: "system",
      message: ["░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░"],
      format: "pre",
      delay: state.get({
        path: "system.processor.delay"
      }),
      callback: function() {
        if (options.callback != null) {
          options.callback();
        }
      }
    });
  };

  var changeConsumerRate = function(override) {
    var options = {
      action: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var consumerAction = {
      start: function() {
        state.set({
          path: "consumed.rate",
          value: state.get({
            path: "consumed.starting"
          })
        });
      },
      increase: function() {
        state.set({
          path: "consumed.rate",
          value: operator({
            type: "multiply",
            value: state.get({
              path: "consumed.rate"
            }),
            by: state.get({
              path: "consumed.multiply"
            }),
            integer: true
          })
        });
      }
    };
    consumerAction[options.action]();
  };

  var changeMaxCycles = function() {
    state.set({
      path: "system.cycles.max",
      value: (state.get({
        path: "system.processor.power"
      }) * 10)
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
    costForMultiple: costForMultiple,
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
