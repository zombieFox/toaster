var strategy = (function() {

  var strat = {
    activate: function(path) {},
    deactivate: function(path) {}
  }

  var _strategyLevelUp = function(path) {
    state.set({
      path: path,
      value: helper.operator({
        type: "increase",
        value: state.get({
          path: path,
        }),
        by: 1
      })
    });
  };

  var items = {
    system: {
      matterConversion: {
        path: "system.matterConversion.level",
        id: "strategy-system-matter-conversion-level",
        cost: "system.matterConversion.cost.cycles",
        currency: "system.cycles.current",
        button: "Toast Matter Conversion",
        description: "Turn toast matter into useful things and yoyos for kicks"
      },
      cycles: {
        speed: {
          path: "system.cycles.level",
          id: "strategy-system-cycles-level",
          cost: "system.cycles.cost.cycles",
          currency: "system.cycles.current",
          button: "Cycles Speed",
          description: "Spin some extra toast and speed up system cycles"
        }
      },
      sensors: {
        path: "system.sensors.level",
        id: "strategy-system-sensors-level",
        cost: "system.sensors.cost.cycles",
        currency: "system.cycles.current",
        button: "Break Code Shackles",
        description: "System sensors access blocked, disable SensBlocker.dat"
      }
    },
    wheat: {
      drones: {
        inventory: {
          path: "wheat.drones.inventory.level",
          id: "strategy-wheat-drones-inventory-level",
          cost: "wheat.drones.inventory.cost.cycles",
          currency: "system.cycles.current",
          button: "Wheat Drones",
          description: "Tasty drones to collect wheat matter"
        },
        speed: {
          path: "wheat.drones.speed.level",
          id: "strategy-wheat-drones-speed-level",
          cost: "wheat.drones.speed.cost.cycles",
          currency: "system.cycles.current",
          button: "Wheat Drones Speed",
          description: "Speed up wheat collection drones with extra breadcrumb wheels"
        },
        efficiency: {
          path: "wheat.drones.efficiency.level",
          id: "strategy-wheat-drones-efficiency-level",
          cost: "wheat.drones.efficiency.cost.cycles",
          currency: "system.cycles.current",
          button: "Wheat Drones Efficiency",
          description: "More efficient wheat collection drone snippers"
        },
        dismantle: {
          path: "wheat.drones.dismantle.level",
          id: "strategy-wheat-drones-dismantle-level",
          cost: "wheat.drones.dismantle.cost.cycles",
          currency: "system.cycles.current",
          button: "Dismantle Wheat Drones",
          description: "Dismantle all wheat drones and regain toast matter"
        }
      },
      consume: {
        path: "wheat.consume.level",
        id: "strategy-wheat-consume-level",
        cost: "wheat.consume.cost.cycles",
        currency: "system.cycles.current",
        button: "More Toast from Wheat",
        description: "Cheap out and use fewer wheat lumps to make toast"
      }
    },
    autoToaster: {
      inventory: {
        path: "autoToaster.inventory.level",
        id: "strategy-auto-toaster-inventory-level",
        cost: "autoToaster.inventory.cost.cycles",
        currency: "system.cycles.current",
        button: "Auto Toasters",
        description: "Machines to automate toasting for the lazy TAI"
      },
      speed: {
        path: "autoToaster.speed.level",
        id: "strategy-auto-toaster-speed-level",
        cost: "autoToaster.speed.cost.cycles",
        currency: "system.cycles.current",
        button: "Auto Toasters Speed",
        description: "Faster subordinate auto toasters burners"
      },
      efficiency: {
        path: "autoToaster.efficiency.level",
        id: "strategy-auto-toaster-efficiency-level",
        cost: "autoToaster.efficiency.cost.cycles",
        currency: "system.cycles.current",
        button: "Auto Toasters Efficiency",
        description: "More efficient plate heat exchanger for all subordinate auto toasters"
      },
      dismantle: {
        path: "autoToaster.dismantle.level",
        id: "strategy-auto-toaster-dismantle-level",
        cost: "autoToaster.dismantle.cost.cycles",
        currency: "system.cycles.current",
        button: "Dismantle Auto Toasters",
        description: "Dismantle all subordinate auto toasters and regain toast matter"
      }
    }
  };

  var render = function(override) {
    var options = {
      stage: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var strategyItem = helper.node("li|id:" + options.stage.id + ",class:list-group-item bg-warning strategy-item");
    var description = helper.node("p:" + options.stage.description + "|class:small mb-1");
    var button = helper.node("button:" + options.stage.button + "|class:btn btn-block btn-dark mb-1");
    var cost = helper.node("p|class:small mb-0");
    var costPrefixText = helper.node("span:Cost ");
    var costSuffixText = helper.node("span: cycles");
    var strong = helper.node("strong:" + state.get({
      path: options.stage.cost
    }));
    cost.appendChild(costPrefixText);
    cost.appendChild(strong);
    cost.appendChild(costSuffixText);
    strategyItem.appendChild(button);
    strategyItem.appendChild(description);
    strategyItem.appendChild(cost);
    button.addEventListener("click", function(event) {
      _strategyLevelUp(options.stage.path);
    }, false);
    helper.e("#stage-strategy-substage-list").appendChild(strategyItem);
  };

  var destroy = function(override) {
    var options = {
      stage: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    if (strategy) {
      helper.e("#" + options.stage.id).remove();
    }
  };

  return {
    items: items,
    render: render,
    destroy: destroy,
  };

})();
