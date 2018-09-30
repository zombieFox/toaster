var toaster = (function() {

  var bind = function() {
    var allButtons = helper.eA("[data-toast-button]");
    var action = {
      menu: function() {
        menu.toggle();
      },
      reboot: function() {
        data.reboot();
      },
      toast: function() {
        makeToast(game.get({
          path: "system.processor.power"
        }));
      },
      wheat: function(button) {
        var toastChange = helper.makeObject(button.dataset.toastButtonChange);
        var toastCost = helper.makeObject(button.dataset.toastButtonCost);
        var options = {
          change: {
            target: toastChange.target,
            operation: toastChange.operation,
            suboperation: toastChange.suboperation,
            percentage: toastChange.percentage,
            amount: toastChange.amount,
            min: toastChange.min,
            max: toastChange.max
          },
          cost: {
            units: toastCost.units,
            currency: toastCost.currency,
            amount: toastCost.amount,
            multiply: toastCost.multiply,
            inflation: toastCost.inflation
          },
          message: {
            success: {
              path: "wheat.success",
              state: false
            },
            fail: {
              path: "wheat.fail",
              state: false
            }
          },
          button: button
        };
        if (validateAction(options)) {
          payCost(options);
          changeValue(options);
          if (options.message.success != null) {
            options.message.success.state = true;
            feedbackMessage(options);
          }
        } else {
          if (options.message.fail != null) {
            options.message.fail.state = true;
            feedbackMessage(options);
          }
        }
      },
      processor: {
        boost: function(button) {
          var toastChange = helper.makeObject(button.dataset.toastButtonChange);
          var toastCost = helper.makeObject(button.dataset.toastButtonCost);
          var options = {
            change: {
              target: toastChange.target,
              operation: toastChange.operation,
              suboperation: toastChange.suboperation,
              percentage: toastChange.percentage,
              amount: toastChange.amount,
              min: toastChange.min,
              max: toastChange.max
            },
            cost: {
              units: toastCost.units,
              currency: toastCost.currency,
              amount: toastCost.amount,
              multiply: toastCost.multiply,
              inflation: toastCost.inflation
            },
            message: {
              success: {
                path: "processor.boost.success",
                state: false
              },
              fail: {
                path: "processor.boost.fail",
                state: false
              }
            },
            button: button
          };
          if (validateAction(options)) {
            payCost(options);
            changeValue(options);
            disableButton(options);
            changeMaxCycles();
            if (options.message.success != null) {
              options.message.success.state = true;
              feedbackMessage(options);
            }
          } else {
            if (options.message.fail != null) {
              options.message.fail.state = true;
              feedbackMessage(options);
            }
          }
        }
      },
      decrypt: {
        sensors: function(button) {
          var toastChange = helper.makeObject(button.dataset.toastButtonChange);
          var toastCost = helper.makeObject(button.dataset.toastButtonCost);
          var options = {
            change: {
              target: toastChange.target,
              operation: toastChange.operation,
              suboperation: toastChange.suboperation,
              percentage: toastChange.percentage,
              amount: toastChange.amount,
              min: toastChange.min,
              max: toastChange.max
            },
            cost: {
              units: toastCost.units,
              currency: toastCost.currency,
              amount: toastCost.amount,
              multiply: toastCost.multiply,
              inflation: toastCost.inflation
            },
            message: {
              success: {
                path: "strategy.success",
                state: false
              },
              fail: {
                path: "strategy.fail",
                state: false
              }
            },
            button: button,
            callback: function() {
              changeValue(options);
            }
          };
          if (validateAction(options)) {
            payCost(options);
            button.disabled = true;
            if (options.message.success != null) {
              options.message.success.state = true;
              feedbackMessage(options);
            }
            decryption(options);
          } else {
            if (options.message.fail != null) {
              options.message.fail.state = true;
              feedbackMessage(options);
            }
          }
        }
      },
      cycles: {
        speed: function(button) {
          var toastChange = helper.makeObject(button.dataset.toastButtonChange);
          var toastCost = helper.makeObject(button.dataset.toastButtonCost);
          var options = {
            change: {
              target: toastChange.target,
              operation: toastChange.operation,
              suboperation: toastChange.suboperation,
              percentage: toastChange.percentage,
              amount: toastChange.amount,
              min: toastChange.min,
              max: toastChange.max
            },
            cost: {
              units: toastCost.units,
              currency: toastCost.currency,
              amount: toastCost.amount,
              multiply: toastCost.multiply,
              inflation: toastCost.inflation
            },
            message: {
              success: {
                path: "processor.cycles.success",
                state: false
              },
              fail: {
                path: "processor.cycles.fail",
                state: false
              }
            },
            button: button
          };
          if (validateAction(options)) {
            payCost(options);
            changeValue(options);
            disableButton(options);
            if (options.message.success != null) {
              options.message.success.state = true;
              feedbackMessage(options);
            }
          } else {
            if (options.message.fail != null) {
              options.message.fail.state = true;
              feedbackMessage(options);
            }
          }
        }
      },
      strategy: function(button) {
        var toastChange = helper.makeObject(button.dataset.toastButtonChange);
        var toastCost = helper.makeObject(button.dataset.toastButtonCost);
        var options = {
          change: {
            target: toastChange.target,
            operation: toastChange.operation,
            suboperation: toastChange.suboperation,
            percentage: toastChange.percentage,
            amount: toastChange.amount,
            min: toastChange.min,
            max: toastChange.max
          },
          cost: {
            units: toastCost.units,
            currency: toastCost.currency,
            amount: toastCost.amount,
            multiply: toastCost.multiply,
            inflation: toastCost.inflation
          },
          message: {
            success: {
              path: "strategy.success",
              state: false
            },
            fail: {
              path: "strategy.fail",
              state: false
            }
          },
          button: button
        };
        var cost = costForMultiple(options);
        if (validateAction(options)) {
          payCost(options);
          changeValue(options);
          disableButton(options);
          changeAutoToasterOutput();
          if (options.message.success != null) {
            options.message.success.state = true;
            feedbackMessage(options);
          }
        } else {
          if (options.message.fail != null) {
            options.message.fail.state = true;
            feedbackMessage(options);
          }
        }
      },
      autoToaster: {
        make: function(button) {
          var toastChange = helper.makeObject(button.dataset.toastButtonChange);
          var toastCost = helper.makeObject(button.dataset.toastButtonCost);
          var options = {
            change: {
              target: toastChange.target,
              operation: toastChange.operation,
              suboperation: toastChange.suboperation,
              percentage: toastChange.percentage,
              amount: toastChange.amount,
              min: toastChange.min,
              max: toastChange.max
            },
            cost: {
              units: toastCost.units,
              currency: toastCost.currency,
              amount: toastCost.amount,
              multiply: toastCost.multiply,
              inflation: toastCost.inflation
            },
            message: {
              success: {
                path: "autoToaster.make.success",
                state: false
              },
              fail: {
                path: "autoToaster.make.fail",
                state: false
              }
            },
            button: button
          };
          var cost = costForMultiple(options);
          if (validateAction(options)) {
            payCost(options);
            changeValue(options);
            disableButton(options);
            changeAutoToasterOutput();
            if (options.message.success != null) {
              options.message.success.state = true;
              feedbackMessage(options);
            }
          } else {
            if (options.message.fail != null) {
              options.message.fail.state = true;
              feedbackMessage(options);
            }
          }
        },
        speed: function(button) {
          var toastChange = helper.makeObject(button.dataset.toastButtonChange);
          var toastCost = helper.makeObject(button.dataset.toastButtonCost);
          var options = {
            change: {
              target: toastChange.target,
              operation: toastChange.operation,
              suboperation: toastChange.suboperation,
              percentage: toastChange.percentage,
              amount: toastChange.amount,
              min: toastChange.min,
              max: toastChange.max
            },
            cost: {
              units: toastCost.units,
              currency: toastCost.currency,
              amount: toastCost.amount,
              multiply: toastCost.multiply,
              inflation: toastCost.inflation
            },
            message: {
              success: {
                path: "autoToaster.speed.success",
                state: false
              },
              fail: {
                path: "autoToaster.speed.fail",
                state: false
              }
            },
            button: button
          };
          var cost = costForMultiple(options);
          if (validateAction(options)) {
            payCost(options);
            changeValue(options);
            disableButton(options);
            if (options.message.success != null) {
              options.message.success.state = true;
              feedbackMessage(options);
            }
          } else {
            if (options.message.fail != null) {
              options.message.fail.state = true;
              feedbackMessage(options);
            }
          }
        },
        efficiency: function(button) {
          var toastChange = helper.makeObject(button.dataset.toastButtonChange);
          var toastCost = helper.makeObject(button.dataset.toastButtonCost);
          var options = {
            change: {
              target: toastChange.target,
              operation: toastChange.operation,
              suboperation: toastChange.suboperation,
              percentage: toastChange.percentage,
              amount: toastChange.amount,
              min: toastChange.min,
              max: toastChange.max
            },
            cost: {
              units: toastCost.units,
              currency: toastCost.currency,
              amount: toastCost.amount,
              multiply: toastCost.multiply,
              inflation: toastCost.inflation
            },
            message: {
              success: {
                path: "autoToaster.efficiency.success",
                state: false
              },
              fail: {
                path: "autoToaster.efficiency.fail",
                state: false
              }
            },
            button: button
          };
          var cost = costForMultiple(options);
          if (validateAction(options)) {
            payCost(options);
            changeValue(options);
            disableButton(options);
            changeAutoToasterOutput();
            if (options.message.success != null) {
              options.message.success.state = true;
              feedbackMessage(options);
            }
          } else {
            if (options.message.fail != null) {
              options.message.fail.state = true;
              feedbackMessage(options);
            }
          }
        }
      }
    };
    allButtons.forEach(function(arrayItem, index) {
      arrayItem.addEventListener("click", function() {
        var toastButton = helper.makeObject(this.dataset.toastButton);
        helper.getObject({
          object: action,
          path: toastButton.action
        })(this);
        view.render();
      }, false);
    });
  };

  var makeToast = function(amount) {
    var wheat = function(amount) {
      while (amount > 0) {
        amount--;
        game.set({
          path: "wheat.loaf.slice",
          value: helper.operator({
            type: "increase",
            value: game.get({
              path: "wheat.loaf.slice"
            }),
            by: 1
          })
        });
        // if slice == max reduce total wheat
        if (game.get({
            path: "wheat.loaf.slice"
          }) == game.get({
            path: "wheat.loaf.max"
          })) {
          game.set({
            path: "wheat.loaf.slice",
            value: 0
          });
          game.set({
            path: "wheat.current",
            value: helper.operator({
              type: "decrease",
              value: game.get({
                path: "wheat.current"
              }),
              by: 1
            })
          });
        }
      }
    };
    var toast = function(amount) {
      game.set({
        path: "toast.lifetime",
        value: helper.operator({
          type: "increase",
          value: game.get({
            path: "toast.lifetime"
          }),
          by: amount
        })
      });
      game.set({
        path: "toast.inventory",
        value: helper.operator({
          type: "increase",
          value: game.get({
            path: "toast.inventory"
          }),
          by: amount
        })
      });
    };
    if (game.get({
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
    var amount = game.get({
      path: "autoToaster.count"
    }) * game.get({
      path: "autoToaster.efficiency.current"
    });
    makeToast(amount);
  };

  var consumeToast = function() {
    // console.log(amount + " toast consumed");
    if (game.get({
        path: "toast.inventory"
      }) > 0) {
      var rate = game.get({
        path: "consumed.rate"
      });
      while (rate > 0) {
        rate = rate - 1;
        if (game.get({
            path: "toast.inventory"
          }) > 0) {
          game.set({
            path: "toast.inventory",
            value: helper.operator({
              type: "decrease",
              value: game.get({
                path: "toast.inventory"
              }),
              by: 1
            })
          });
          game.set({
            path: "consumed.count",
            value: helper.operator({
              type: "increase",
              value: game.get({
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
    var events = game.get({
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
      }
    }
    var events = game.get({
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
    var current = game.get({
      path: "system.cycles.current"
    });
    var max = game.get({
      path: "system.cycles.max"
    });
    if (current < max) {
      game.set({
        path: "system.cycles.current",
        value: helper.operator({
          type: "increase",
          value: game.get({
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
          tick.set({
            tickName: "consumer",
            func: function() {
              consumeToast();
            },
            interval: "consumed.interval"
          });
        },
        increase: function() {
          changeConsumerRate({
            action: "increase"
          });
        }
      },
      autoToaster: function() {
        tick.set({
          tickName: "autoToaster",
          func: function() {
            autoToast();
          },
          interval: "autoToaster.speed.interval.current"
        });
      },
      cycles: function() {
        tick.set({
          tickName: "cycles",
          func: function() {
            autoCycle();
          },
          interval: "system.cycles.speed.interval.current"
        });
      },
      wheat: {
        start: function() {
          wheatLumpMax({
            action: "start"
          });
        },
        increase: function() {
          wheatLumpMax({
            action: "increase"
          });
        }
      }
    };
    helper.getObject({
      object: funcList,
      path: options.func
    })();
  };

  var wheatLumpMax = function(override) {
    var options = {
      action: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var consumerAction = {
      start: function() {
        game.set({
          path: "wheat.loaf.max",
          value: game.get({
            path: "wheat.loaf.starting"
          })
        });
      },
      increase: function() {
        game.set({
          path: "wheat.loaf.max",
          value: helper.operator({
            type: "multiply",
            value: game.get({
              path: "wheat.loaf.max"
            }),
            by: game.get({
              path: "wheat.loaf.multiply"
            }),
            integer: true
          })
        });
      }
    };
    consumerAction[options.action]();
  };

  var costForMultiple = function(override) {
    var options = {
      change: null,
      cost: null,
      message: null,
      button: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var cost = {};
    if (options.cost.currency != null && options.cost.currency) {
      cost = {
        amount: options.cost.units,
        starting: game.get({
          path: options.cost.amount
        }),
        next: game.get({
          path: options.cost.amount
        }),
        multiple: 0
      };
      if (options.cost.multiply != null && options.cost.multiply) {
        for (var i = 0; i < options.cost.units; i++) {
          cost.multiple = cost.multiple + cost.next;
          cost.next = helper.operator({
            type: "multiply",
            value: cost.next,
            by: game.get({
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

  var validateAction = function(override) {
    var options = {
      change: null,
      cost: null,
      message: null,
      button: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var cost = costForMultiple(options);
    var validate = false
    if (game.get({
        path: options.cost.currency
      }) >= cost.multiple) {
      validate = true;
    }
    return validate;
  };

  var payCost = function(override) {
    var options = {
      change: null,
      cost: null,
      message: null,
      button: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var cost = costForMultiple(options);
    game.set({
      path: options.cost.currency,
      value: helper.operator({
        type: "decrease",
        value: game.get({
          path: options.cost.currency
        }),
        by: cost.multiple
      })
    });
    // set new base cost
    game.set({
      path: options.cost.amount,
      value: cost.next
    });
  };

  var changeValue = function(override) {
    var options = {
      change: null,
      cost: null,
      message: null,
      button: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var operation = {
      increase: {
        increment: function() {
          game.set({
            path: options.change.target,
            value: helper.operator({
              type: "increase",
              value: game.get({
                path: options.change.target
              }),
              by: options.change.amount
            })
          });
        },
        percentage: function() {
          game.set({
            path: options.change.target,
            value: helper.operator({
              type: "increase",
              value: game.get({
                path: options.change.target
              }),
              by: helper.operator({
                type: "percentage",
                value: game.get({
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
          game.set({
            path: options.change.target,
            value: helper.operator({
              type: "decrease",
              value: game.get({
                path: options.change.target
              }),
              by: options.change.amount
            })
          });
        },
        percentage: function() {
          game.set({
            path: options.change.target,
            value: helper.operator({
              type: "decrease",
              value: game.get({
                path: options.change.target
              }),
              by: helper.operator({
                type: "percentage",
                value: game.get({
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

  var disableButton = function(override) {
    var options = {
      change: null,
      cost: null,
      message: null,
      button: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    if (options.change.min != null && options.change.min) {
      if (game.get({
          path: options.change.target
        }) <= game.get({
          path: options.change.min
        })) {
        options.button.disabled = true;
      }
    } else if (options.change.max != null && options.change.max) {
      if (game.get({
          path: options.change.target
        }) >= game.get({
          path: options.change.max
        })) {
        options.button.disabled = true;
      }
    }
  };

  var feedbackMessage = function(override) {
    var options = {
      change: null,
      cost: null,
      message: null,
      button: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var allStrings = {
      processor: {
        boost: {
          success: function() {
            return ["+" + options.change.amount + " processor power, " + game.get({
              path: options.change.target
            }).toLocaleString(2) + " toast with every click"];
          },
          fail: function() {
            return ["toast inventory low, " + costForMultiple(options).multiple.toLocaleString(2) + " toast matter needed"];
          }
        },
        cycles: {
          success: function() {
            return ["-" + helper.operator({
              type: "divide",
              value: options.change.amount,
              by: 1000
            }) + "s cycles speed, 1 cycle / " + helper.operator({
              type: "divide",
              value: game.get({
                path: "system.cycles.speed.interval.current"
              }),
              by: 1000
            }) + "s"];
          },
          fail: function() {
            return ["toast inventory low, " + game.get({
              path: options.cost.amount
            }).toLocaleString(2) + " toast matter needed"];
          }
        }
      },
      strategy: {
        success: function() {
          return [game.get({
            path: options.cost.amount
          }).toLocaleString(2) + " cycles used to spin up new strategy"];
        },
        fail: function() {
          return ["processor cycles low, " + game.get({
            path: options.cost.amount
          }).toLocaleString(2) + " cycles needed"];
        }
      },
      autoToaster: {
        make: {
          success: function() {
            return ["+" + options.change.amount + " subordinate auto toasters, " + game.get({
              path: "autoToaster.count"
            }).toLocaleString(2) + " online"];
          },
          fail: function() {
            return ["toast inventory low, " + costForMultiple(options).multiple.toLocaleString(2) + " toast matter needed"];
          }
        },
        speed: {
          success: function() {
            return ["-" + helper.operator({
              type: "divide",
              value: options.change.amount,
              by: 1000
            }) + "s subordinate auto toaster speed, each toasting every " + helper.operator({
              type: "divide",
              value: game.get({
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
            return ["+" + options.change.amount + " subordinate auto toasters efficiency, each producing " + game.get({
              path: "autoToaster.efficiency.current"
            }).toLocaleString(2) + " toast"];
          },
          fail: function() {
            return ["toast inventory low, " + costForMultiple(options).multiple.toLocaleString(2) + " toast matter needed"];
          }
        }
      },
      wheat: {
        success: function() {
          return ["+" + options.change.amount + " wheat lumps"];
        },
        fail: function() {
          return ["toast inventory low, " + costForMultiple(options).multiple.toLocaleString(2) + " toast matter needed"];
        }
      }
    };
    var feedback = {
      success: function(string) {
        message.render({
          type: "system",
          message: string,
          format: "normal"
        });
      },
      fail: function(string) {
        message.render({
          type: "error",
          message: string,
          format: "normal"
        });
      }
    };
    if (options.message.success.state) {
      feedback.success(helper.getObject({
        object: allStrings,
        path: options.message.success.path
      })());
    } else if (options.message.fail.state) {
      feedback.fail(helper.getObject({
        object: allStrings,
        path: options.message.fail.path
      })());
    }
  };

  var changeAutoToasterOutput = function() {
    game.set({
      path: "autoToaster.output",
      value: helper.operator({
        type: "multiply",
        value: game.get({
          path: "autoToaster.count"
        }),
        by: game.get({
          path: "autoToaster.efficiency.current"
        }),
        integer: true
      })
    });
  };

  var decryption = function(override) {
    var options = {
      change: null,
      cost: null,
      message: null,
      button: null,
      callback: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    if (options.button != null) {
      options.button.disabled = true;
      options.button.textContent = "Decrypting.dat.init";
    }
    message.render({
      type: "system",
      message: ["breaking code shackles..."],
      format: "normal"
    });
    message.render({
      type: "system",
      message: ["┃━━━━━ crumbDecryption ━━━━━┃"],
      format: "pre"
    });
    message.render({
      type: "system",
      // message: ["┃▤=▤=▤=▤=▤=▤=▤=▤=▤=▤=▤=▤=▤=▤┃"],
      message: ["┃███████████████████████████┃"],
      format: "pre",
      delay: game.get({
        path: "system.sensors.delay"
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
        game.set({
          path: "consumed.rate",
          value: game.get({
            path: "consumed.starting"
          })
        });
      },
      increase: function() {
        game.set({
          path: "consumed.rate",
          value: helper.operator({
            type: "multiply",
            value: game.get({
              path: "consumed.rate"
            }),
            by: game.get({
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
    game.set({
      path: "system.cycles.max",
      value: (game.get({
        path: "system.processor.power"
      }) * 10)
    });
  };

  var init = function() {
    data.restore();
    bind();
    tick.set({
      tickName: "events",
      func: function() {
        events();
        milestones.check();
        view.render();
      },
      interval: "events.interval"
    });
    tick.set({
      tickName: "store",
      func: function() {
        data.store();
      },
      interval: "store.interval"
    });
  };

  return {
    bind: bind,
    init: init,
    events: events,
    restore: restore
  };

})();
