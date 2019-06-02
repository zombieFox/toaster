var state = (function() {

  var current = {
    store: {
      interval: 400000,
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
          starting: 0,
          toast: 8,
          increase: 8,
          multiply: 1.05,
          spent: 0
        }
      },
      cycles: {
        level: 0,
        current: 0,
        max: 10,
        cost: {
          cycles: 16
        },
        speed: {
          interval: {
            current: 2000,
            min: 50
          },
          cost: {
            toast: 512,
            starting: 512,
            increase: 512
          }
        }
      },
      sensors: {
        level: 0,
        delay: 300,
        cost: {
          cycles: 1024
        }
      },
      matterConversion: {
        level: 0,
        cost: {
          cycles: 24
        }
      }
    },
    consumed: {
      starting: 8,
      rate: 8,
      count: 0,
      multiply: 2,
      interval: 10000
    },
    wheat: {
      inventory: {
        current: 3000000,
        min: 0,
        cost: {
          cycles: 24
        }
      },
      consume: {
        level: 0,
        rate: 64,
        starting: 64,
        decrease: 8,
        cost: {
          cycles: 8,
          increase: 8
        }
      },
      drones: {
        inventory: {
          level: 0,
          current: 0,
          output: 0,
          cost: {
            cycles: 8,
            toast: {
              starting: 1,
              current: 1,
              increase: 1,
              spent: 0
            }
          }
        },
        speed: {
          level: 0,
          interval: {
            current: 10000,
            min: 1000
          },
          cost: {
            cycles: 16,
            toast: {
              current: 8,
              increase: 8
            }
          }
        },
        efficiency: {
          level: 0,
          current: 1,
          max: 200,
          cost: {
            cycles: 24,
            toast: {
              current: 16,
              increase: 16
            }
          }
        },
        dismantle: {
          level: 0,
          cost: {
            cycles: 32
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
          cycles: 8,
          toast: {
            starting: 8,
            current: 8,
            increase: 8,
            spent: 0
          },
        }
      },
      speed: {
        level: 0,
        interval: {
          current: 10000,
          min: 1000
        },
        cost: {
          cycles: 16,
          toast: {
            current: 16,
            increase: 16
          }
        }
      },
      efficiency: {
        level: 0,
        current: 1,
        max: 200,
        cost: {
          cycles: 24,
          toast: {
            current: 32,
            increase: 32
          }
        }
      },
      dismantle: {
        level: 0,
        cost: {
          cycles: 32
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
      all: {}
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
        object: current,
        path: options.path
      });
    } else {
      return current;
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
      current = options.full;
    } else {
      helper.setObject({
        object: current,
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
