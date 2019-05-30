var toaster = (function() {

  var bind = function(override) {
    var options = {
      button: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var allButtons = helper.eA("[data-toast-button]");
    var action = {
      data: {
        menu: function() {
          menu.toggle();
        },
        reboot: function() {
          data.reboot();
        },
        save: function() {
          data.save();
          message.render({
            type: "system",
            message: ["game data saved"],
            format: "normal"
          });
        }
      },
      toast: function() {
        toast.make(state.get({
          path: "system.processor.power"
        }));
        data.save();
      },
      processor: {
        boost: function(button) {
          var options = {
            change: null,
            cost: null,
            inflation: null,
            max: null,
            prices: null,
            message: null,
            button: null
          };
          options.change = helper.makeObject(button.dataset.toastButtonChange);
          options.cost = helper.makeObject(button.dataset.toastButtonCost);
          options.inflation = helper.makeObject(button.dataset.toastButtonInflation);
          options.max = helper.makeObject(button.dataset.toastButtonMax);
          options.button = button;
          options.prices = costForMultiple(options);
          options.message = {
            success: {
              path: "processor.boost.success",
              state: false
            },
            fail: {
              path: "processor.boost.fail",
              state: false
            }
          };
          if (validateAction(options)) {
            payCost(options);
            setNewCost(options);
            storeSpent(options);
            changeValue(options);
            disableButton(options);
            cycles.set();
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
          data.save();
        },
        dismantle: function(button) {
          var options = {
            change: null,
            cost: null,
            message: null,
            button: null
          };
          options.change = helper.makeObject(button.dataset.toastButtonChange);
          options.cost = helper.makeObject(button.dataset.toastButtonCost);
          options.button = button;
          options.message = {
            success: {
              path: "processor.dismantle.success",
              state: false
            },
            fail: {
              path: "processor.dismantle.fail",
              state: false
            }
          };
          if (validateDismantle(options)) {
            if (options.message.success != null) {
              options.message.success.state = true;
              feedbackMessage(options);
            }
            refundCost(options);
            resetCost(options);
            clearSpent(options);
            dismantleTarget(options);
          } else {
            if (options.message.fail != null) {
              options.message.fail.state = true;
              feedbackMessage(options);
            }
          }
          data.save();
        },
        cycles: function(button) {
          var options = {
            change: null,
            cost: null,
            inflation: null,
            max: null,
            prices: null,
            message: null,
            button: null
          };
          options.change = helper.makeObject(button.dataset.toastButtonChange);
          options.cost = helper.makeObject(button.dataset.toastButtonCost);
          options.inflation = helper.makeObject(button.dataset.toastButtonInflation);
          options.max = helper.makeObject(button.dataset.toastButtonMax);
          options.button = button;
          options.prices = costForMultiple(options);
          options.message = {
            success: {
              path: "processor.cycles.success",
              state: false
            },
            fail: {
              path: "processor.cycles.fail",
              state: false
            }
          };
          console.log(options);
          // if (validateAction(options)) {
          //   payCost(options);
          //   setNewCost(options);
          //   changeValue(options);
          //   disableButton(options);
          //   if (options.message.success != null) {
          //     options.message.success.state = true;
          //     feedbackMessage(options);
          //   }
          // } else {
          //   if (options.message.fail != null) {
          //     options.message.fail.state = true;
          //     feedbackMessage(options);
          //   }
          // }
          // data.save();
        }
      },
      wheat: {
        make: function(button) {
          var options = {
            change: null,
            cost: null,
            inflation: null,
            max: null,
            prices: null,
            message: null,
            button: null
          };
          options.change = helper.makeObject(button.dataset.toastButtonChange);
          options.cost = helper.makeObject(button.dataset.toastButtonCost);
          options.inflation = helper.makeObject(button.dataset.toastButtonInflation);
          options.max = helper.makeObject(button.dataset.toastButtonMax);
          options.button = button;
          options.prices = costForMultiple(options);
          options.message = {
            success: {
              path: "wheat.make.success",
              state: false
            },
            fail: {
              path: "wheat.make.fail",
              state: false
            }
          };
          if (validateAction(options)) {
            payCost(options);
            setNewCost(options);
            storeSpent(options);
            changeValue(options);
            disableButton(options);
            wheat.output();
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
          data.save();
        },
        dismantle: function(button) {
          var options = {
            change: null,
            cost: null,
            message: null,
            button: null
          };
          options.change = helper.makeObject(button.dataset.toastButtonChange);
          options.cost = helper.makeObject(button.dataset.toastButtonCost);
          options.button = button;
          options.message = {
            success: {
              path: "wheat.dismantle.success",
              state: false
            },
            fail: {
              path: "wheat.dismantle.fail",
              state: false
            }
          };
          if (validateDismantle(options)) {
            if (options.message.success != null) {
              options.message.success.state = true;
              feedbackMessage(options);
            }
            refundCost(options);
            resetCost(options);
            clearSpent(options);
            dismantleTarget(options);
            wheat.output();
          } else {
            if (options.message.fail != null) {
              options.message.fail.state = true;
              feedbackMessage(options);
            }
          }
          data.save();
        },
        speed: function(button) {
          var options = {
            change: null,
            cost: null,
            inflation: null,
            max: null,
            prices: null,
            message: null,
            button: null
          };
          options.change = helper.makeObject(button.dataset.toastButtonChange);
          options.cost = helper.makeObject(button.dataset.toastButtonCost);
          options.inflation = helper.makeObject(button.dataset.toastButtonInflation);
          options.max = helper.makeObject(button.dataset.toastButtonMax);
          options.button = button;
          options.prices = costForMultiple(options);
          options.message = {
            success: {
              path: "wheat.speed.success",
              state: false
            },
            fail: {
              path: "wheat.speed.fail",
              state: false
            }
          };
          if (validateAction(options)) {
            payCost(options);
            setNewCost(options);
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
          data.save();
        },
        efficiency: function(button) {
          var options = {
            change: null,
            cost: null,
            inflation: null,
            max: null,
            prices: null,
            message: null,
            button: null
          };
          options.change = helper.makeObject(button.dataset.toastButtonChange);
          options.cost = helper.makeObject(button.dataset.toastButtonCost);
          options.inflation = helper.makeObject(button.dataset.toastButtonInflation);
          options.max = helper.makeObject(button.dataset.toastButtonMax);
          options.button = button;
          options.prices = costForMultiple(options);
          options.message = {
            success: {
              path: "wheat.efficiency.success",
              state: false
            },
            fail: {
              path: "wheat.efficiency.fail",
              state: false
            }
          };
          if (validateAction(options)) {
            payCost(options);
            setNewCost(options);
            changeValue(options);
            disableButton(options);
            wheat.output();
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
          data.save();
        }
      },
      autoToaster: {
        make: function(button) {
          var options = {
            change: null,
            cost: null,
            inflation: null,
            max: null,
            prices: null,
            message: null,
            button: null
          };
          options.change = helper.makeObject(button.dataset.toastButtonChange);
          options.cost = helper.makeObject(button.dataset.toastButtonCost);
          options.inflation = helper.makeObject(button.dataset.toastButtonInflation);
          options.max = helper.makeObject(button.dataset.toastButtonMax);
          options.button = button;
          options.prices = costForMultiple(options);
          options.message = {
            success: {
              path: "autoToaster.make.success",
              state: false
            },
            fail: {
              path: "autoToaster.make.fail",
              state: false
            }
          };
          if (validateAction(options)) {
            payCost(options);
            setNewCost(options);
            storeSpent(options);
            changeValue(options);
            disableButton(options);
            autoToaster.output();
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
          data.save();
        },
        dismantle: function(button) {
          var options = {
            change: null,
            cost: null,
            message: null,
            button: null
          };
          options.change = helper.makeObject(button.dataset.toastButtonChange);
          options.cost = helper.makeObject(button.dataset.toastButtonCost);
          options.button = button;
          options.message = {
            success: {
              path: "autoToaster.dismantle.success",
              state: false
            },
            fail: {
              path: "autoToaster.dismantle.fail",
              state: false
            }
          };
          if (validateDismantle(options)) {
            if (options.message.success != null) {
              options.message.success.state = true;
              feedbackMessage(options);
            }
            refundCost(options);
            resetCost(options);
            clearSpent(options);
            dismantleTarget(options);
            autoToaster.output();
          } else {
            if (options.message.fail != null) {
              options.message.fail.state = true;
              feedbackMessage(options);
            }
          }
          data.save();
        },
        speed: function(button) {
          var options = {
            change: null,
            cost: null,
            inflation: null,
            max: null,
            prices: null,
            message: null,
            button: null
          };
          options.change = helper.makeObject(button.dataset.toastButtonChange);
          options.cost = helper.makeObject(button.dataset.toastButtonCost);
          options.inflation = helper.makeObject(button.dataset.toastButtonInflation);
          options.max = helper.makeObject(button.dataset.toastButtonMax);
          options.button = button;
          options.prices = costForMultiple(options);
          options.message = {
            success: {
              path: "autoToaster.speed.success",
              state: false
            },
            fail: {
              path: "autoToaster.speed.fail",
              state: false
            }
          };
          if (validateAction(options)) {
            payCost(options);
            setNewCost(options);
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
          data.save();
        },
        efficiency: function(button) {
          var options = {
            change: null,
            cost: null,
            inflation: null,
            max: null,
            prices: null,
            message: null,
            button: null
          };
          options.change = helper.makeObject(button.dataset.toastButtonChange);
          options.cost = helper.makeObject(button.dataset.toastButtonCost);
          options.inflation = helper.makeObject(button.dataset.toastButtonInflation);
          options.max = helper.makeObject(button.dataset.toastButtonMax);
          options.button = button;
          options.prices = costForMultiple(options);
          options.message = {
            success: {
              path: "autoToaster.efficiency.success",
              state: false
            },
            fail: {
              path: "autoToaster.efficiency.fail",
              state: false
            }
          };
          if (validateAction(options)) {
            payCost(options);
            setNewCost(options);
            changeValue(options);
            disableButton(options);
            autoToaster.output();
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
          data.save();
        }
      },
      decrypt: {
        sensors: function(button) {
          var options = {
            change: null,
            cost: null,
            inflation: null,
            max: null,
            prices: null,
            message: null,
            button: null
          };
          options.change = helper.makeObject(button.dataset.toastButtonChange);
          options.cost = helper.makeObject(button.dataset.toastButtonCost);
          options.inflation = helper.makeObject(button.dataset.toastButtonInflation);
          options.max = helper.makeObject(button.dataset.toastButtonMax);
          options.button = button;
          options.prices = costForMultiple(options);
          options.message = {
            success: {
              path: "processor.boost.success",
              state: false
            },
            fail: {
              path: "processor.boost.fail",
              state: false
            }
          };
          if (validateAction(options)) {
            payCost(options);
            setNewCost(options);
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
          data.save();
        }
      },
      strategy: {
        unlock: function(button) {
          var options = {
            change: null,
            cost: null,
            inflation: null,
            max: null,
            prices: null,
            message: null,
            button: null
          };
          options.change = helper.makeObject(button.dataset.toastButtonChange);
          options.cost = helper.makeObject(button.dataset.toastButtonCost);
          options.inflation = helper.makeObject(button.dataset.toastButtonInflation);
          options.max = helper.makeObject(button.dataset.toastButtonMax);
          options.button = button;
          options.prices = costForMultiple(options);
          options.message = {
            success: {
              path: "strategy.success",
              state: false
            },
            fail: {
              path: "strategy.fail",
              state: false
            }
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
        },
        decrypt: function(button) {
          var options = {
            change: null,
            cost: null,
            inflation: null,
            max: null,
            prices: null,
            message: null,
            button: null,
            callback: null
          };
          options.change = helper.makeObject(button.dataset.toastButtonChange);
          options.cost = helper.makeObject(button.dataset.toastButtonCost);
          options.inflation = helper.makeObject(button.dataset.toastButtonInflation);
          options.max = helper.makeObject(button.dataset.toastButtonMax);
          options.button = button;
          options.prices = costForMultiple(options);
          options.message = {
            success: {
              path: "strategy.success",
              state: false
            },
            fail: {
              path: "strategy.fail",
              state: false
            }
          };
          options.callback = function() {
            payCost(options);
            changeValue(options);
            disableButton(options);
          };
          if (validateAction(options)) {
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
          data.save();
        }
      }
    };
    var bindButton = function(button) {
      button.addEventListener("click", function() {
        var toastButton = helper.makeObject(button.dataset.toastButton);
        helper.getObject({
          object: action,
          path: toastButton.action
        })(button);
        view.render();
      }, false);
    };
    if (options.button != null) {
      // bindButton(options.button);
    } else {
      allButtons.forEach(function(arrayItem, index) {
        // bindButton(arrayItem);
      });
    }
  };

  var nth = {
    value: function(override) {
      var options = {
        nth: null, // index of the desiered value
        constant: null, // base price/starting/n_1 value
        difference: null // constant difference/price growth rate
      }
      if (override) {
        options = helper.applyOptions(options, override);
      }
      if (options.nth != null && options.constant != null && options.difference != null) {
        return options.constant + (options.difference * (options.nth - 1));
      } else {
        return false;
      }
    },
    sum: function(override) {
      var options = {
        constant: null, // constant = base price/starting/n_1 value
        difference: null, // difference = constant difference/price growth rate
        nthX: null, // starting index to calculate from
        nthY: null //ending index to calculate to
      }
      if (override) {
        options = helper.applyOptions(options, override);
      }
      if (options.constant != null && options.difference != null && options.nthX != null && options.nthY != null) {
        // value of n_x
        var a_x = nth.value({
          nth: options.nthX,
          constant: options.constant,
          difference: options.difference
        });
        // value of n_y
        var a_y = nth.value({
          nth: options.nthY,
          constant: options.constant,
          difference: options.difference
        });
        return (((options.nthY + 1) - options.nthX) * (a_x + a_y)) / 2;
      } else {
        return false;
      }
    },
    max: function(override) {
      var options = {
        money: null, // money/currency available
        level: null, // current nth/level
        a1: null, // first term/sequence starting value
        difference: null // difference = constant difference/price growth rate
      }
      if (override) {
        options = helper.applyOptions(options, override);
      }
      var costBought = options.a1 * options.level + (options.level * (options.level + 1)) / 2 * options.difference;
      var costMax = costBought + options.money;
      var amountMax = Math.floor((Math.sqrt(8 * costMax * options.difference + 4 * options.a1 * options.a1 + 4 * options.a1 * options.difference + options.difference * options.difference) + 2 * options.a1 + options.difference) / (2 * options.difference));
      var amountBuyable = amountMax - options.level;
      console.log("costBought", costBought);
      console.log("costMax", costMax);
      console.log("options.level", options.level);
      console.log("amountMax", amountMax);
      console.log("amountBuyable", amountBuyable);
      return amountBuyable; // the amount to increase the level by
    }
  };

  var costForMultiple = function(options) {
    if (options.inflation.increase) {
      // if (options.max.buy) {} else {
      // the starting cost / constant / c
      var c = state.get({
        path: options.cost.starting
      });
      // inflation amount per nth term / difference / d
      var d = state.get({
        path: options.inflation.amount
      });
      // starting nth
      var n_x = state.get({
        path: options.change.target
      }) + 1;
      // the desiered nth
      var n_y = state.get({
        path: options.change.target
      }) + options.change.amount;
      // sum from ax to ay
      var s_xy = nth.sum({
        constant: c,
        difference: d,
        nthX: n_x,
        nthY: n_y
      });
      // total for the next level
      var n_z = nth.value({
        nth: n_y + 1,
        constant: c,
        difference: d
      });
      options.cost.price.total = s_xy; // sum for ax to ay
      options.cost.price.next = n_z; // cost for level after y
      // }
    } else {
      options.cost.price.total = state.get({
        path: options.cost.amount
      });
    };
    return options;
  };

  var validateAction = function(options) {
    if (state.get({
        path: options.cost.currency
      }) >= options.cost.price.total) {
      return true;
    } else {
      return false;
    }
  };

  var validateDismantle = function(options) {
    if (state.get({
        path: options.change.target
      }) > 0) {
      return true;
    } else {
      return false;
    }
  };

  var payCost = function(options) {
    state.set({
      path: options.cost.currency,
      value: helper.operator({
        type: "decrease",
        value: state.get({
          path: options.cost.currency
        }),
        by: options.cost.price.total
      })
    });
  };

  var setNewCost = function(options) {
    state.set({
      path: options.cost.amount,
      value: options.cost.price.next
    });
  };

  var storeSpent = function(options) {
    state.set({
      path: options.cost.spent,
      value: helper.operator({
        type: "increase",
        value: state.get({
          path: options.cost.spent
        }),
        by: options.cost.price.total
      })
    });
  };

  var refundCost = function(options) {
    state.set({
      path: options.cost.currency,
      value: helper.operator({
        type: "increase",
        value: state.get({
          path: options.cost.currency
        }),
        by: state.get({
          path: options.cost.spent
        })
      })
    });
  };

  var clearSpent = function(options) {
    state.set({
      path: options.cost.spent,
      value: 0
    });
  };

  var dismantleTarget = function(options) {
    state.set({
      path: options.change.target,
      value: 0
    });
  };

  var resetCost = function(options) {
    state.set({
      path: options.cost.amount,
      value: state.get({
        path: options.cost.starting
      })
    });
  };

  var changeValue = function(options) {
    var operation = {
      increase: {
        increment: function() {
          state.set({
            path: options.change.target,
            value: helper.operator({
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
            value: helper.operator({
              type: "increase",
              value: state.get({
                path: options.change.target
              }),
              by: helper.operator({
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
            value: helper.operator({
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
            value: helper.operator({
              type: "decrease",
              value: state.get({
                path: options.change.target
              }),
              by: helper.operator({
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

  var disableButton = function(options) {
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
  };

  var feedbackMessage = function(options) {
    var allStrings = {
      processor: {
        boost: {
          success: function() {
            return ["+" + helper.numberSuffix({
              number: options.change.amount
            }) + " processor power, " + helper.numberSuffix({
              number: state.get({
                path: options.change.target
              })
            }) + " toast with every click"];
          },
          fail: function() {
            return ["toast inventory low, " + helper.numberSuffix({
              number: options.cost.price.total
            }) + " toast matter needed"];
          }
        },
        dismantle: {
          success: function() {
            return ["-" + helper.numberSuffix({
              number: state.get({
                path: options.change.target
              })
            }) + " processor power, " + helper.numberSuffix({
              number: state.get({
                path: options.cost.spent
              })
            }) + " toast matter regained"];
          },
          fail: function() {
            return ["no processor power to dismantled"];
          }
        },
        cycles: {
          success: function() {
            return ["-" + helper.operator({
              type: "divide",
              value: options.change.amount,
              by: 1000
            }) + "s cycles speed, 1 cycle/" + helper.operator({
              type: "divide",
              value: state.get({
                path: "system.cycles.speed.interval.current"
              }),
              by: 1000
            }) + "s"];
          },
          fail: function() {
            return ["toast inventory low, " + helper.numberSuffix({
              number: options.cost.price.total
            }) + " toast matter needed"];
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
          return ["processor cycles low, " + helper.numberSuffix({
            number: options.cost.price.total
          }) + " cycles needed"];
        }
      },
      wheat: {
        make: {
          success: function() {
            return ["+" + helper.numberSuffix({
              number: options.change.amount
            }) + " wheat collection drones, " + helper.numberSuffix({
              number: state.get({
                path: "wheat.drones.inventory.current"
              })
            }) + " online"];
          },
          fail: function() {
            return ["toast inventory low, " + helper.numberSuffix({
              number: options.cost.price.total
            }) + " toast matter needed"];
          }
        },
        dismantle: {
          success: function() {
            return ["-" + helper.numberSuffix({
              number: state.get({
                path: options.change.target
              })
            }) + " wheat collection drones, " + helper.numberSuffix({
              number: state.get({
                path: options.cost.spent
              })
            }) + " toast matter regained"];
          },
          fail: function() {
            return ["no wheat collection drones to dismantled"];
          }
        },
        speed: {
          success: function() {
            return ["-" + helper.operator({
              type: "divide",
              value: options.change.amount,
              by: 1000
            }) + "s wheat collection drone speed, each collecting every " + helper.operator({
              type: "divide",
              value: state.get({
                path: "wheat.drones.speed.interval.current"
              }),
              by: 1000
            }) + "s"];
          },
          fail: function() {
            return ["toast inventory low, " + helper.numberSuffix({
              number: options.cost.price.total
            }) + " toast matter needed"];
          }
        },
        efficiency: {
          success: function() {
            return ["+" + helper.numberSuffix({
              number: options.change.amount
            }) + " wheat collection drone efficiency, each collecting " + helper.numberSuffix({
              number: state.get({
                path: "wheat.drones.efficiency.current"
              })
            }) + " wheat lumps"];
          },
          fail: function() {
            return ["toast inventory low, " + helper.numberSuffix({
              number: options.cost.price.total
            }) + " toast matter needed"];
          }
        }
      },
      autoToaster: {
        make: {
          success: function() {
            return ["+" + helper.numberSuffix({
              number: options.change.amount
            }) + " subordinate auto toasters, " + helper.numberSuffix({
              number: state.get({
                path: "autoToaster.inventory.current"
              })
            }) + " online"];
          },
          fail: function() {
            return ["toast inventory low, " + helper.numberSuffix({
              number: options.cost.price.total
            }) + " toast matter needed"];
          }
        },
        dismantle: {
          success: function() {
            return ["-" + helper.numberSuffix({
              number: state.get({
                path: options.change.target
              })
            }) + " subordinate auto toasters, " + helper.numberSuffix({
              number: state.get({
                path: options.cost.spent
              })
            }) + " toast matter regained"];
          },
          fail: function() {
            return ["no subordinate auto toasters to dismantled"];
          }
        },
        speed: {
          success: function() {
            return ["-" + helper.operator({
              type: "divide",
              value: options.change.amount,
              by: 1000
            }) + "s subordinate auto toaster speed, each collecting every " + helper.operator({
              type: "divide",
              value: state.get({
                path: "autoToaster.speed.interval.current"
              }),
              by: 1000
            }) + "s"];
          },
          fail: function() {
            return ["toast inventory low, " + helper.numberSuffix({
              number: options.cost.price.total
            }) + " toast matter needed"];
          }
        },
        efficiency: {
          success: function() {
            return ["+" + helper.numberSuffix({
              number: options.change.amount
            }) + " subordinate auto toaster efficiency, each producing " + helper.numberSuffix({
              number: state.get({
                path: "autoToaster.efficiency.current"
              })
            }) + " toast"];
          },
          fail: function() {
            return ["toast inventory low, " + helper.numberSuffix({
              number: options.cost.price.total
            }) + " toast matter needed"];
          }
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

  var decryption = function(override) {
    var options = {
      change: null,
      cost: null,
      inflation: null,
      max: null,
      prices: null,
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
      message: ["crumb.decrypt.dat loaded"],
      format: "pre"
    });
    message.render({
      type: "system",
      // message: ["┃▤=▤=▤=▤=▤=▤=▤=▤=▤=▤=▤=▤=▤=▤┃"],
      message: ["┃███████████████████████████┃"],
      // message: ["┃///////////////////////////┃"],
      format: "pre",
      delay: state.get({
        path: "system.sensors.delay"
      }),
      callback: function() {
        if (options.callback != null) {
          options.callback();
        }
      }
    });
  };

  var init = function() {
    // bind();
  };

  return {
    init: init,
    bind: bind,
    nth: nth,
    costForMultiple: costForMultiple,
    validateAction: validateAction,
    validateDismantle: validateDismantle,
    payCost: payCost,
    refundCost: refundCost,
    setNewCost: setNewCost,
    resetCost: resetCost,
    storeSpent: storeSpent,
    clearSpent: clearSpent,
    changeValue: changeValue,
    dismantleTarget: dismantleTarget,
    disableButton: disableButton,
    feedbackMessage: feedbackMessage
  };

})();
