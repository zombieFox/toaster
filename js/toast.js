var toast = (function() {

  var store = function() {
    data.save("toast", JSON.stringify(toast.state.get()));
  };

  var restore = function() {
    if (data.load("toast")) {
      toast.state.set({
        full: JSON.parse(data.load("toast"))
      });
      restoreMilestones();
      checkMilestones();
      render();
    }
  };

  var state = (function() {
    var gameState = {
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
            unlock: {
            unlock: function() {
              unlockStage({
                stage: ["#stage-consumed"],
                func: function() {
                  repeat_consume = setInterval(consumeToast, get({
                    path: "consumed.interval"
                  }));
                },
                message: {
                  type: "normal",
                  message: ["toast is being consumed", "at a rate of " + get({
                    path: "consumed.rate"
                  }).toLocaleString(2) + " toast/" + get({
                    path: "consumed.level"
                  }).toLocaleString(2) + "s", "consumer unknown..."],
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
                  message: ["toast matter conversion discovered", "toast matter can be repurposed into utilities and self improvement", "subordinate auto toasters discovered"],
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

  var bind = function() {
    var allButtons = [{
      element: "#stage-toast-button-toast",
      func: function() {
        makeToast(state.get({
          path: "system.processor.power"
        }));
        checkMilestones();
        render();
        store();
      }
    }, {
      element: "#stage-system-button-processor-boost",
      func: function() {
        boostProcessor();
        checkMilestones();
        render();
        store();
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
        store();
      }
    }, {
      element: "#stage-auto-toaster-button-speed",
      func: function() {
        autoToasterSpeed();
        checkMilestones();
        render();
        store();
      }
    }, {
      element: "#stage-auto-toaster-button-efficiency",
      func: function() {
        autoToasterEfficiency();
        render();
        store();
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
    state.set({
      path: "toasted.lifetime",
      value: increase(state.get({
        path: "toasted.lifetime"
      }), ammount)
    });
    state.set({
      path: "toasted.inventory",
      value: increase(state.get({
        path: "toasted.inventory"
      }), ammount)
    });
  };

  var autoToast = function() {
    makeToast((state.get({
      path: "autoToaster.count"
    }) * state.get({
      path: "autoToaster.efficiency.level"
    })));
    render();
  };

  var consumeToast = function() {
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
      checkMilestones();
      render();
    }
  };

  var restoreMilestones = function() {
    var allMilestones = state.get({
      path: "milestones"
    });
    for (var key in allMilestones) {
      allMilestones[key].all.forEach(function(arrayItem, index) {
        if (arrayItem.passed) {
          if (arrayItem.unlock !== undefined) {
            arrayItem.unlock();
          }
        };
      });
    }
  };

  var checkMilestones = function() {
    var allMilestones = state.get({
      path: "milestones"
    });
    for (var key in allMilestones) {
      allMilestones[key].all.forEach(function(arrayItem, index) {
        var valueToCheck = state.get({
          path: arrayItem.address
        });
        if (valueToCheck >= arrayItem.count && !arrayItem.passed) {
          arrayItem.passed = true;
          message.render({
            type: "success",
            message: [state.get({
              path: "milestones[" + key + "].message.prefix"
            }) + arrayItem.count.toLocaleString(2) + state.get({
              path: "milestones[" + key + "].message.suffix"
            })],
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
    if (state.get({
        path: "toasted.inventory"
      }) >= state.get({
        path: "system.probe.cost"
      })) {
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
      state.set({
        path: "toasted.inventory",
        value: decrease(state.get({
          path: "toasted.inventory"
        }), state.get({
          path: "system.probe.cost"
        }))
      });
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
        delay: state.get({
          path: "system.probe.delay"
        }),
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
        message: ["current inventory too low, " + state.get({
          path: "system.probe.cost"
        }).toLocaleString(2) + " toast matter needed"],
        format: "normal"
      });
    }
  };

  var boostProcessor = function() {
    if (state.get({
        path: "toasted.inventory"
      }) >= state.get({
        path: "system.processor.cost"
      })) {
      state.set({
        path: "toasted.inventory",
        value: decrease(state.get({
          path: "toasted.inventory"
        }), state.get({
          path: "system.processor.cost"
        }))
      });
      state.set({
        path: "system.processor.power",
        value: increase(state.get({
          path: "system.processor.power"
        }), 1)
      });
      state.set({
        path: "system.processor.cost",
        value: increase(state.get({
          path: "system.processor.cost"
        }), state.get({
          path: "system.processor.increase"
        }))
      });
      message.render({
        type: "system",
        message: ["processor power increased, +" + state.get({
          path: "system.processor.power"
        }).toLocaleString(2) + " toast with every click"],
        format: "normal"
      });
    } else {
      message.render({
        type: "error",
        message: ["current inventory too low, " + state.get({
          path: "system.processor.cost"
        }).toLocaleString(2) + " toast matter needed"],
        format: "normal"
      });
    }
  };

  var autoToasterMake = function() {
    if (state.get({
        path: "toasted.inventory"
      }) >= state.get({
        path: "autoToaster.cost"
      })) {
      state.set({
        path: "toasted.inventory",
        value: decrease(state.get({
          path: "toasted.inventory"
        }), state.get({
          path: "autoToaster.cost"
        }))
      });
      state.set({
        path: "autoToaster.count",
        value: increase(state.get({
          path: "autoToaster.count"
        }), 1)
      });
      clearInterval(repeat_autoToast);
      repeat_autoToast = setInterval(autoToast, state.get({
        path: "autoToaster.speed.interval"
      }));
      message.render({
        type: "system",
        message: ["subordinate auto toaster built, #" + state.get({
          path: "autoToaster.count"
        }).toLocaleString(2) + " online"],
        format: "normal"
      });
    } else {
      message.render({
        type: "error",
        message: ["current inventory too low, " + state.get({
          path: "autoToaster.cost"
        }).toLocaleString(2) + " toast matter needed"],
        format: "normal"
      });
    }
  };

  var autoToasterEfficiency = function() {
    if (state.get({
        path: "toasted.inventory"
      }) >= state.get({
        path: "autoToaster.efficiency.cost"
      })) {
      state.set({
        path: "toasted.inventory",
        value: decrease(state.get({
          path: "toasted.inventory"
        }), state.get({
          path: "autoToaster.efficiency.cost"
        }))
      });
      state.set({
        path: "autoToaster.efficiency.level",
        value: increase(state.get({
          path: "autoToaster.efficiency.level"
        }), 1)
      });
      state.set({
        path: "autoToaster.efficiency.cost",
        value: increase(state.get({
          path: "autoToaster.efficiency.cost"
        }), state.get({
          path: "autoToaster.efficiency.increase"
        }))
      });
      clearInterval(repeat_autoToast);
      repeat_autoToast = setInterval(autoToast, state.get({
        path: "autoToaster.speed.interval"
      }));
      message.render({
        type: "system",
        message: ["subordinate auto toaster efficiency increased, " + state.get({
          path: "autoToaster.efficiency.level"
        }).toLocaleString(2) + " toast/" + state.get({
          path: "autoToaster.speed.level"
        }).toLocaleString(2) + "s"],
        format: "normal"
      });
    } else {
      message.render({
        type: "error",
        message: ["current inventory too low, " + state.get({
          path: "autoToaster.efficiency.cost"
        }).toLocaleString(2) + " toast matter needed"],
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
      clearInterval(repeat_autoToast);
      repeat_autoToast = setInterval(autoToast, state.get({
        path: "autoToaster.speed.interval"
      }));
      message.render({
        type: "system",
        message: ["subordinate auto toaster speed increased, " + state.get({
          path: "autoToaster.efficiency.level"
        }).toLocaleString(2) + " toast/" + state.get({
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
    if (state.get({
        path: "autoToaster.speed.level"
      }) == 1) {
      helper.e("#stage-auto-toaster-substage-speed-controls").classList.add("d-none");
    }
  };

  var render = function() {
    // console.log(toast.state.get().toasted.lifetime);
    // console.log(state.get().toasted.lifetime);
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
    restore: restore,
    render: render,
    bind: bind
  };

})();
