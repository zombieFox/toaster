var events = (function() {

  var all = {
    toast: {

      lifetime: [{
          // unlock system
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
      }],

      strategy: [{
          // unlock strategy matter conversion
          passed: false,
          validate: [{
            address: "system.cycles.current",
            operator: "more",
            number: 3
          }],
          actions: {
            append: [strategy.items.processor.matterConversion],
            message: [{
              type: "normal",
              message: ["new strategy discovered:", "toast matter conversion"],
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
            remove: [strategy.items.processor.matterConversion],
            message: [{
              type: "success",
              message: ["toast matter conversion developed"],
              format: "normal"
            }]
          }
        }, {
          // unlock strategy wheat drones
          passed: false,
          validate: [{
            address: "system.matterConversion.level",
            operator: "more",
            number: 1
          }, {
            address: "wheat.inventory.current",
            operator: "less",
            number: 9999999
          }],
          actions: {
            append: [strategy.items.wheat.drones.inventory],
            message: [{
              type: "normal",
              message: ["new strategy discovered:", "wheat drones"],
              format: "normal"
            }]
          }
        }, {
          // lock strategy wheat drones
          passed: false,
          validate: [{
            address: "wheat.drones.inventory.level",
            operator: "more",
            number: 1
          }],
          actions: {
            remove: [strategy.items.wheat.drones.inventory],
            message: [{
              type: "success",
              message: ["collect wheat drones developed"],
              format: "normal"
            }]
          }
        }, {
          // unlock strategy wheat drones speed
          passed: false,
          validate: [{
            address: "wheat.drones.inventory.current",
            operator: "more",
            number: 1
          }, {
            address: "wheat.drones.inventory.level",
            operator: "more",
            number: 1
          }, {
            address: "system.cycles.current",
            operator: "more",
            number: 20
          }],
          actions: {
            append: [strategy.items.wheat.drones.speed],
            message: [{
              type: "normal",
              message: ["new strategy discovered:", "wheat drones speed"],
              format: "normal"
            }]
          }
        }, {
          // lock strategy wheat drones speed
          passed: false,
          validate: [{
            address: "wheat.drones.speed.level",
            operator: "more",
            number: 1
          }],
          actions: {
            remove: [strategy.items.wheat.drones.speed],
            message: [{
              type: "success",
              message: ["wheat drones speed developed"],
              format: "normal"
            }]
          }
        }, {
          // unlock strategy wheat drones efficiency
          passed: false,
          validate: [{
            address: "wheat.drones.inventory.current",
            operator: "more",
            number: 1
          }, {
            address: "wheat.drones.inventory.level",
            operator: "more",
            number: 1
          }, {
            address: "system.cycles.current",
            operator: "more",
            number: 20
          }],
          actions: {
            append: [strategy.items.wheat.drones.efficiency],
            message: [{
              type: "normal",
              message: ["new strategy discovered:", "subordinate wheat drones efficiency"],
              format: "normal"
            }]
          }
        }, {
          // lock strategy wheat drones efficiency
          passed: false,
          validate: [{
            address: "wheat.drones.efficiency.level",
            operator: "more",
            number: 1
          }],
          actions: {
            remove: [strategy.items.wheat.drones.efficiency],
            message: [{
              type: "success",
              message: ["subordinate wheat drones efficiency developed"],
              format: "normal"
            }]
          }
        }, {
          // unlock strategy wheat drones dismantle
          passed: false,
          validate: [{
            address: "wheat.drones.inventory.level",
            operator: "more",
            number: 1
          }, {
            address: "wheat.drones.inventory.current",
            operator: "more",
            number: 1
          }],
          actions: {
            append: [strategy.items.wheat.drones.dismantle],
            message: [{
              type: "normal",
              message: ["new strategy discovered:", "dismantle wheat drones"],
              format: "normal"
            }]
          }
        }, {
          // lock strategy wheat drones dismantle
          passed: false,
          validate: [{
            address: "wheat.drones.dismantle.level",
            operator: "more",
            number: 1
          }],
          actions: {
            remove: [strategy.items.wheat.drones.dismantle],
            message: [{
              type: "success",
              message: ["dismantle wheat drones developed"],
              format: "normal"
            }]
          }
        }, {
          // unlock strategy more toast from wheat
          passed: false,
          validate: [{
            address: "wheat.drones.inventory.level",
            operator: "more",
            number: 1
          }, {
            address: "wheat.consume.level",
            operator: "less",
            number: 0
          }, {
            address: "wheat.drones.inventory.current",
            operator: "more",
            number: 20
          }],
          actions: {
            append: [strategy.items.wheat.more1],
            message: [{
              type: "normal",
              message: ["new strategy discovered:", "15% more toast from wheat"],
              format: "normal"
            }]
          }
        }, {
          // lock strategy more toast from wheat
          passed: false,
          validate: [{
            address: "wheat.consume.level",
            operator: "more",
            number: 1
          }],
          actions: {
            remove: [strategy.items.wheat.more1],
            message: [{
              type: "success",
              message: ["15% more toast from wheat developed"],
              format: "normal"
            }]
          }
        }, {
          // unlock strategy cycles speed
          passed: false,
          validate: [{
            address: "system.matterConversion.level",
            operator: "more",
            number: 1
          }, {
            address: "system.cycles.current",
            operator: "more",
            number: 2
          }],
          actions: {
            append: [strategy.items.processor.cycles.speed],
            message: [{
              type: "normal",
              message: ["new strategy discovered:", "cycles speed"],
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
            remove: [strategy.items.processor.cycles.speed],
            message: [{
              type: "success",
              message: ["cycles speed discovered"],
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
            append: [strategy.items.autoToaster.inventory],
            message: [{
              type: "normal",
              message: ["new strategy discovered:", "subordinate auto toasters"],
              format: "normal"
            }]
          }
        }, {
          // lock strategy auto toaster
          passed: false,
          validate: [{
            address: "autoToaster.inventory.level",
            operator: "more",
            number: 1
          }],
          actions: {
            remove: [strategy.items.autoToaster.inventory],
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
            address: "autoToaster.inventory.current",
            operator: "more",
            number: 1
          }, {
            address: "autoToaster.inventory.level",
            operator: "more",
            number: 1
          }, {
            address: "system.cycles.current",
            operator: "more",
            number: 20
          }],
          actions: {
            append: [strategy.items.autoToaster.speed],
            message: [{
              type: "normal",
              message: ["new strategy discovered:", "subordinate auto toaster speed"],
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
            remove: [strategy.items.autoToaster.speed],
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
            address: "autoToaster.inventory.current",
            operator: "more",
            number: 1
          }, {
            address: "autoToaster.inventory.level",
            operator: "more",
            number: 1
          }, {
            address: "system.cycles.current",
            operator: "more",
            number: 20
          }],
          actions: {
            append: [strategy.items.autoToaster.efficiency],
            message: [{
              type: "normal",
              message: ["new strategy discovered:", "subordinate auto toaster efficiency"],
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
            remove: [strategy.items.autoToaster.efficiency],
            message: [{
              type: "success",
              message: ["subordinate auto toaster efficiency developed"],
              format: "normal"
            }]
          }
        }, {
          // unlock strategy auto toaster dismantle
          passed: false,
          validate: [{
            address: "autoToaster.inventory.level",
            operator: "more",
            number: 1
          }, {
            address: "autoToaster.inventory.current",
            operator: "more",
            number: 1
          }],
          actions: {
            append: [strategy.items.autoToaster.dismantle],
            message: [{
              type: "normal",
              message: ["new strategy discovered:", "dismantle subordinate auto toaster developed"],
              format: "normal"
            }]
          }
        }, {
          // lock strategy auto toaster dismantle
          passed: false,
          validate: [{
            address: "autoToaster.dismantle.level",
            operator: "more",
            number: 1
          }],
          actions: {
            remove: [strategy.items.autoToaster.dismantle],
            message: [{
              type: "success",
              message: ["dismantle subordinate auto toaster developed"],
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
            append: [strategy.items.sensors],
            message: [{
              type: "normal",
              message: ["new strategy discovered:", "sensors"],
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
            remove: [strategy.items.sensors],
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
          // unlock wheat
          passed: false,
          validate: [{
            address: "toast.lifetime",
            operator: "more",
            number: 10
          }],
          actions: {
            unlock: ["#stage-wheat"],
            message: [{
              type: "normal",
              message: ["wheat lump inventory discovered"],
              format: "normal"
            }]
          }
        }, {
          // unlock wheat drones
          passed: false,
          validate: [{
            address: "wheat.drones.inventory.level",
            operator: "more",
            number: 1
          }],
          actions: {
            unlock: ["#stage-wheat-drones"],
            func: ["wheat.drones.init"]
          }
        }, {
          // unlock wheat drones speed
          passed: false,
          validate: [{
            address: "wheat.drones.speed.level",
            operator: "more",
            number: 1
          }],
          actions: {
            unlock: ["#stage-wheat-substage-speed"],
          }
        }, {
          // lock wheat drones speed controls
          passed: false,
          validate: [{
            address: "wheat.drones.speed.interval.current",
            operator: "less",
            number: 1000
          }],
          actions: {
            lock: ["#stage-wheat-substage-speed-controls"],
          }
        }, {
          // unlock wheat drones efficiency
          passed: false,
          validate: [{
            address: "wheat.drones.efficiency.level",
            operator: "more",
            number: 1
          }],
          actions: {
            unlock: ["#stage-wheat-substage-efficiency"],
          }
        }, {
          // lock wheat drones efficiency controls
          passed: false,
          validate: [{
            address: "wheat.drones.efficiency.current",
            operator: "more",
            number: 10
          }],
          actions: {
            lock: ["#stage-wheat-substage-efficiency-controls"],
          }
        }, {
          // lock strategy wheat drones dismantle
          passed: false,
          validate: [{
            address: "wheat.drones.dismantle.level",
            operator: "more",
            number: 1
          }],
          actions: {
            unlock: ["#stage-wheat-substage-dismantle"],
          }
        }, {
          // unlock starting wheat consume
          passed: false,
          validate: [{
            address: "toast.lifetime",
            operator: "more",
            number: 1
          }],
          actions: {
            func: ["wheat.consume.init"]
          }
        }, {
          // unlock more toast from wheat
          passed: false,
          validate: [{
            address: "wheat.consume.level",
            operator: "more",
            number: 1
          }],
          actions: {
            func: ["wheat.consume.decrease"]
          }
        }],

        autoToaster: [{
          // unlock auto toaster
          passed: false,
          validate: [{
            address: "autoToaster.inventory.level",
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
        }, {
          // lock strategy auto toaster dismantle
          passed: false,
          validate: [{
            address: "autoToaster.dismantle.level",
            operator: "more",
            number: 1
          }],
          actions: {
            unlock: ["#stage-auto-toaster-substage-dismantle"],
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
            func: ["consumer.init"]
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
            number: 10000
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
            number: 100000
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
            number: 1000000
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
  };

  var check = function() {
    var fireEvent = {
      validatePass: function(validateObject) {
        var passNeeded = validateObject.length;
        var currentPass = 0;
        validateObject.forEach(function(arrayItem) {
          var valueToCheck = game.get({
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
        if (fireEvent.validatePass(eventObject.validate)) {
          eventObject.passed = true;
          eventObject.actions.func.forEach(function(arrayItem) {
            eventFunc({
              func: arrayItem
            });
          });
        }
      },
      unlock: function(eventObject) {
        if (fireEvent.validatePass(eventObject.validate)) {
          eventObject.passed = true;
          eventObject.actions.unlock.forEach(function(arrayItem) {
            unlockStage({
              stage: arrayItem
            });
          });
        }
      },
      lock: function(eventObject) {
        if (fireEvent.validatePass(eventObject.validate)) {
          eventObject.passed = true;
          eventObject.actions.lock.forEach(function(arrayItem) {
            lockStage({
              stage: arrayItem
            });
          });
        }
      },
      append: function(eventObject) {
        if (fireEvent.validatePass(eventObject.validate)) {
          eventObject.passed = true;
          eventObject.actions.append.forEach(function(arrayItem) {
            appendElement({
              stage: arrayItem
            });
          });
        }
      },
      remove: function(eventObject) {
        if (fireEvent.validatePass(eventObject.validate)) {
          eventObject.passed = true;
          eventObject.actions.remove.forEach(function(arrayItem) {
            removeElement({
              stage: arrayItem
            });
          });
        }
      },
      message: function(eventObject) {
        if (fireEvent.validatePass(eventObject.validate)) {
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
    var allEvents = all[phase.get()];
    // all events
    for (var key in allEvents) {
      // console.log(key, "events:", allEvents[key]);
      // all events in a given key
      allEvents[key].forEach(function(eventObject) {
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

  var restore = function() {
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
      },
      append: function(eventObject) {
        eventObject.actions.append.forEach(function(arrayItem) {
          appendElement({
            stage: arrayItem
          });
        });
      },
      remove: function(eventObject) {
        eventObject.actions.remove.forEach(function(arrayItem) {
          removeElement({
            stage: arrayItem
          });
        });
      }
    }
    var allEvents = all[phase.get()];
    // all events
    for (var key in allEvents) {
      // console.log(key, "events:", events[key]);
      // all events in a given key
      allEvents[key].forEach(function(eventObject) {
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

  var appendElement = function(override) {
    var options = {
      stage: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    strategy.render({
      stage: options.stage
    })
  };

  var removeElement = function(override) {
    var options = {
      stage: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    strategy.destroy({
      stage: options.stage
    })
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
        init: function() {
          consumer.init();
          tick.set({
            tickName: "consumer",
            func: function() {
              consumer.consume();
            },
            interval: "consumed.interval"
          });
        },
        increase: function() {
          consumer.increase();
        }
      },
      autoToaster: function() {
        tick.set({
          tickName: "autoToaster",
          func: function() {
            autoToaster.make();
          },
          interval: "autoToaster.speed.interval.current"
        });
      },
      cycles: function() {
        tick.set({
          tickName: "cycles",
          func: function() {
            cycles.spin();
          },
          interval: "system.cycles.speed.interval.current"
        });
      },
      wheat: {
        drones: {
          init: function() {
            tick.set({
              tickName: "wheatDrones",
              func: function() {
                wheat.make();
              },
              interval: "wheat.drones.speed.interval.current"
            });
          }
        },
        consume: {
          init: function() {
            wheat.init();
          },
          decrease: function() {
            wheat.decrease();
          }
        }
      }
    };
    helper.getObject({
      object: funcList,
      path: options.func
    })();
  };

  return {
    all: all,
    check: check,
    restore: restore
  };

})();
