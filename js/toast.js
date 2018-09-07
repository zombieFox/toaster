var toast = (function() {

  var state = (function() {
    var gameState = {
      toasted: {
        lifetime: 0,
        inventory: 0
      },
      system: {
        processor: {
          power: 1,
          cost: 200,
          increase: 800
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
        output: 0,
        speed: {
          level: 10,
          interval: 10000,
          cost: 200,
          increase: 800
        },
        efficiency: {
          level: 1,
          cost: 200,
          increase: 800
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
        address: {
          lifetime: "toasted.lifetime",
          consumed: "consumed.count",
          autoToaster: "autoToaster.count"
        },
        steps: [{
          count: 10,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 20,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 30,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 50,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 100,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 200,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 300,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 500,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 1000,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 2000,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 3000,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 5000,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 10000,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 20000,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 30000,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 50000,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 100000,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 200000,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 300000,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 500000,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 1000000,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 2000000,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 3000000,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }, {
          count: 5000000,
          check: {
            lifetime: false,
            consumed: false,
            autoToaster: false
          }
        }]
      },
      events: [{
        passed: false,
        type: "unlock",
        address: "toasted.lifetime",
        count: 10,
        stage: "consumed"
      }, {
        passed: false,
        type: "unlock",
        address: "toasted.lifetime",
        count: 20,
        stage: "system",
        message: {
          type: "normal",
          message: ["system memory discovered", "self improvement possible"],
          format: "normal"
        }
      }, {
        passed: false,
        type: "unlock",
        address: "system.processor.power",
        count: 2,
        stage: "auto-toaster",
        message: {
          type: "normal",
          message: ["toast matter conversion discovered", "repurpose toast matter into utilities and self improvement", "subordinate auto toasters discovered"],
          format: "normal"
        }
      }, {
        passed: false,
        type: "unlock",
        address: "system.processor.power",
        count: 3,
        stage: "sensors",
        message: {
          type: "normal",
          message: ["system sensors discovered", "access restricted: SensBlocker.dat"],
          format: "normal"
        }
      }, {
        passed: false,
        type: "unlock",
        address: "autoToaster.count",
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
        count: 10,
        stage: "auto-toaster-substage-efficiency",
        message: {
          type: "normal",
          message: ["subordinate auto toasters efficiency improvement discovered"],
          format: "normal"
        }
      }, {
        passed: false,
        type: "lock",
        address: "autoToaster.speed.level",
        count: 1,
        stage: "auto-toaster-substage-speed-controls"
      }, {
        passed: false,
        type: "trigger",
        address: "toasted.lifetime",
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
        address: "autoToaster.count",
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

  var repeat_consume;

  var repeat_autoToast;

  var store = function() {
    data.save("toast", JSON.stringify(toast.state.get()));
  };

  var restore = function() {
    if (data.load("toast")) {
      console.log("state restore");
      toast.state.set({
        full: JSON.parse(data.load("toast"))
      });
      restoreEvents();
      render();
    }
  };

  var bind = function() {
    var allButtons = helper.eA("[data-toast-button]");
    var action = {
      toast: function(buttonOptions) {
        makeToast(state.get({
          path: "system.processor.power"
        }));
        milestones();
        events();
        render();
        store();
      },
      boostProcessor: function(buttonOptions) {
        boostProcessor(buttonOptions.amount);
        milestones();
        events();
        render();
        store();
      },
      makeAutoToast: function(buttonOptions) {
        makeAutoToaster(buttonOptions.amount);
        triggerAutotoast();
        milestones();
        events();
        render();
        store();
      },
      autoToasterSpeed: function(buttonOptions) {
        autoToasterSpeed();
        triggerAutotoast();
        milestones();
        events();
        render();
        store();
      },
      autoToasterEfficiency: function(buttonOptions) {
        autoToasterEfficiency(buttonOptions.amount);
        triggerAutotoast();
        milestones();
        events();
        render();
        store();
      },
      decrypt: function(buttonOptions) {
        console.log("decrypt");
      }
    };
    allButtons.forEach(function(arrayItem, index) {
      arrayItem.addEventListener("click", function() {
        var buttonOptions = helper.makeObject(this.dataset.toastButton);
        action[buttonOptions.action](buttonOptions);
      }, false);
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

  var makeToast = function(amount) {
    state.set({
      path: "toasted.lifetime",
      value: increase(state.get({
        path: "toasted.lifetime"
      }), amount)
    });
    state.set({
      path: "toasted.inventory",
      value: increase(state.get({
        path: "toasted.inventory"
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
        path: "toasted.inventory"
      }) > 0) {
      var rate = state.get({
        path: "consumed.rate"
      });
      while (rate > 0) {
        rate = rate - 1;
        if (state.get({
            path: "toasted.inventory"
          }) > 0) {
          state.set({
            path: "toasted.inventory",
            value: decrease(state.get({
              path: "toasted.inventory"
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
      if (!arrayItem.passed) {
        if (arrayItem.type == "unlock") {
          if (valueToCheck >= arrayItem.count) {
            arrayItem.passed = true;
            unlockStage({
              stage: arrayItem.stage
            });
            if (arrayItem.message != undefined) {
              message.render({
                type: arrayItem.message.type,
                message: arrayItem.message.message,
                format: arrayItem.message.format
              });
            }
          }
        } else if (arrayItem.type == "lock") {
          if (valueToCheck <= arrayItem.count) {
            arrayItem.passed = true;
            lockStage({
              stage: arrayItem.stage
            });
            if (arrayItem.message != undefined) {
              message.render({
                type: arrayItem.message.type,
                message: arrayItem.message.message,
                format: arrayItem.message.format
              });
            }
          }
        } else if (arrayItem.type == "trigger") {
          if (valueToCheck >= arrayItem.count) {
            arrayItem.passed = true;
            fireTrigger({
              func: arrayItem.func
            });
            if (arrayItem.message != undefined) {
              message.render({
                type: arrayItem.message.type,
                message: arrayItem.message.message,
                format: arrayItem.message.format
              });
            }
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
    clearInterval(repeat_autoToast);
    repeat_autoToast = setInterval(autoToast, state.get({
      path: "autoToaster.speed.interval"
    }));
  };

  var boostProcessor = function(amount) {
    if (state.get({
        path: "toasted.inventory"
      }) >= (state.get({
        path: "system.processor.cost"
      }) * amount)) {
      state.set({
        path: "toasted.inventory",
        value: decrease(state.get({
          path: "toasted.inventory"
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
        message: ["+1 processor power, " + state.get({
          path: "system.processor.power"
        }).toLocaleString(2) + " toast with every click"],
        format: "normal"
      });
    } else {
      message.render({
        type: "error",
        message: ["current inventory too low, " + (state.get({
          path: "system.processor.cost"
        }) * amount).toLocaleString(2) + " toast matter needed"],
        format: "normal"
      });
    }
  };

  var makeAutoToaster = function(amount) {
    if (state.get({
        path: "toasted.inventory"
      }) >= (state.get({
        path: "autoToaster.cost"
      }) * amount)) {
      state.set({
        path: "toasted.inventory",
        value: decrease(state.get({
          path: "toasted.inventory"
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
    } else {
      message.render({
        type: "error",
        message: ["current inventory too low, " + (state.get({
          path: "autoToaster.cost"
        }) * amount).toLocaleString(2) + " toast matter needed"],
        format: "normal"
      });
    }
  };

  var autoToasterSpeed = function() {
    if (state.get({
        path: "toasted.inventory"
      }) >= state.get({
        path: "autoToaster.speed.cost"
      })) {
      state.set({
        path: "toasted.inventory",
        value: decrease(state.get({
          path: "toasted.inventory"
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
    } else {
      message.render({
        type: "error",
        message: ["current inventory too low, " + state.get({
          path: "autoToaster.speed.cost"
        }).toLocaleString(2) + " toast matter needed"],
        format: "normal"
      });
    }
  };

  var autoToasterEfficiency = function(amount) {
    if (state.get({
        path: "toasted.inventory"
      }) >= (state.get({
        path: "autoToaster.efficiency.cost"
      }) * amount)) {
      state.set({
        path: "toasted.inventory",
        value: decrease(state.get({
          path: "toasted.inventory"
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
    } else {
      message.render({
        type: "error",
        message: ["current inventory too low, " + (state.get({
          path: "autoToaster.efficiency.cost"
        }) * amount).toLocaleString(2) + " toast matter needed"],
        format: "normal"
      });
    }
  };

  var decrypt = function() {
    console.log("hit");
    // if (state.get({
    //     path: "toasted.inventory"
    //   }) >= state.get({
    //     path: "system.probe.cost"
    //   })) {
    //   var stageSystemSubstageMemory = helper.e("#stage-system-substage-memory");
    //   var stageSystemSubstageProbe = helper.e("#stage-system-substage-probe");
    //   var toggleProbeButton = function() {
    //     var stageSystemButtonMemoryProbe = helper.e("#stage-system-button-processor-probe");
    //     if (stageSystemButtonMemoryProbe.disabled) {
    //       stageSystemButtonMemoryProbe.disabled = false;
    //     } else {
    //       stageSystemButtonMemoryProbe.disabled = true;
    //     }
    //   };
    //   state.set({
    //     path: "toasted.inventory",
    //     value: decrease(state.get({
    //       path: "toasted.inventory"
    //     }), state.get({
    //       path: "system.probe.cost"
    //     }))
    //   });
    //   toggleProbeButton();
    //   message.render({
    //     type: "system",
    //     message: ["probing memory banks..."],
    //     format: "normal"
    //   });
    //   message.render({
    //     type: "system",
    //     message: ["┃ 0 ━━━━━━━━━━━━━━━━━━━ 512 ┃ PB"],
    //     format: "pre"
    //   });
    //   message.render({
    //     type: "system",
    //     message: ["█████████████████████████████"],
    //     format: "pre",
    //     delay: state.get({
    //       path: "system.probe.delay"
    //     }),
    //     callback: function() {
    //       message.render({
    //         type: "system",
    //         message: ["=== probe report ===", "= Memory.dat discovered", " == memory power can be improved", "= Sens.dat discovered", "= SensBlocker.dat discovered", " == sensors subsystem restricted"],
    //         format: "normal"
    //       });
    //       toggleProbeButton();
    //       stageSystemSubstageMemory.classList.remove("d-none");
    //       stageSystemSubstageProbe.classList.add("d-none");
    //     }
    //   });
    // } else {
    //   message.render({
    //     type: "error",
    //     message: ["current inventory too low, " + state.get({
    //       path: "system.probe.cost"
    //     }).toLocaleString(2) + " toast matter needed"],
    //     format: "normal"
    //   });
    // }
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
    store: store,
    restore: restore,
    render: render,
    bind: bind
  };

})();
