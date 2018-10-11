var game = (function() {

  var state = {
    store: {
      interval: 120000,
      timestamp: "None"
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
          toast: 10,
          multiply: 1.1
        }
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
        delay: 300,
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
    wheat: {
      inventory: {
        level: 0,
        current: 10000000,
        min: 0,
        cost: {
          cycles: 20
        }
      },
      lump: {
        part: 0
      },
      consume: {
        rate: 10,
        starting: 10,
        multiply: 2
      },
      drones: {
        inventory: {
          level: 0,
          current: 0,
          output: 0,
          cost: {
            cycles: 20,
            toast: {
              starting: 10,
              current: 10,
              spent: 0
            },
            increase: 5,
          }
        },
        dismantle: {
          level: 0,
          cost: {
            cycles: 100
          }
        },
        speed: {
          level: 0,
          interval: {
            current: 10000,
            min: 1000
          },
          cost: {
            cycles: 30,
            toast: 20,
            multiply: 1.6
          }
        },
        efficiency: {
          level: 0,
          current: 1,
          max: 10,
          cost: {
            cycles: 40,
            toast: 30,
            multiply: 2.2
          }
        }
      }
    },
    autoToaster: {
      inventory: {
        level: 0,
        current: 0,
        output: 0,
        cost: {
          cycles: 20,
          toast: {
            starting: 10,
            current: 10,
            increase: 5,
            spent: 0
          },
        }
      },
      dismantle: {
        level: 0,
        cost: {
          cycles: 100
        }
      },
      speed: {
        level: 0,
        interval: {
          current: 10000,
          min: 1000
        },
        cost: {
          cycles: 30,
          toast: 20,
          multiply: 1.6
        }
      },
      efficiency: {
        level: 0,
        current: 1,
        max: 10,
        cost: {
          cycles: 40,
          toast: 30,
          multiply: 2.2
        }
      }
    },
    milestones: {
      address: {
        lifetime: "toast.lifetime",
        consumed: "consumed.count",
        drones: "wheat.drones.inventory.current",
        autoToaster: "autoToaster.inventory.current"
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
            number: 700
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
            address: "wheat.drones.inventory.current",
            operator: "more",
            number: 50
          }, {
            address: "system.cycles.current",
            operator: "more",
            number: 20
          }],
          actions: {
            append: [strategy.items.wheat.more],
            message: [{
              type: "normal",
              message: ["new strategy discovered:", "more toast from wheat"],
              format: "normal"
            }]
          }
        }, {
          // lock strategy more toast from wheat
          passed: false,
          validate: [{
            address: "wheat.inventory.level",
            operator: "more",
            number: 1
          }],
          actions: {
            remove: [strategy.items.wheat.more],
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
            append: [ strategy.items.autoToaster.efficiency],
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
            remove: [ strategy.items.autoToaster.efficiency],
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
            func: ["wheatDrones"]
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
          // unlock more toast from wheat
          passed: false,
          validate: [{
            address: "wheat.inventory.level",
            operator: "more",
            number: 1
          }],
          actions: {
            func: ["wheat.increase"]
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
        object: state,
        path: options.path
      });
    } else {
      return state;
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
      state = options.full;
    } else {
      helper.setObject({
        object: state,
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
