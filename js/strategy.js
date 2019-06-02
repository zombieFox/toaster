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
    processor: {
      matterConversion: {
        description: "Turn toast matter into useful things and yoyos for kicks",
        button: {
          text: "Toast Matter Conversion",
          func: function() {
            _strategyLevelUp("system.matterConversion.level");
          }
        },
        cost: {
          currency: "system.cycles.current",
          amount: "system.matterConversion.cost.cycles"
        }
      },
      cycles: {
        speed: {
          id: "stage-strategy-substage-cycles-speed",
          description: "Spin some extra toast and speed up system cycles",
          button: {
            text: "Cycles Speed",
            action: "action:strategy.unlock",
            change: "target:system.cycles.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
            cost: "units:#1," + "currency:system.cycles.current," + "amount:system.cycles.cost.cycles",
            inflation: "increase:false," + "operator:false," + "amount:false",
            max: "buy:false"
          },
          cost: "path:system.cycles.cost.cycles," + "format:local"
        }
      }
    },
    wheat: {
      drones: {
        inventory: {
          id: "stage-strategy-substage-drones",
          description: "Tasty drones to collect wheat matter",
          button: {
            text: "Wheat Drones",
            action: "action:strategy.unlock",
            change: "target:wheat.drones.inventory.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
            cost: "units:#1," + "currency:system.cycles.current," + "amount:wheat.drones.inventory.cost.cycles",
            inflation: "increase:false," + "operator:false," + "amount:false",
            max: "buy:false"
          },
          cost: "path:wheat.drones.inventory.cost.cycles," + "format:local"
        },
        speed: {
          id: "stage-strategy-substage-drones-speed",
          description: "Speed up wheat collection drones with extra breadcrumb wheels",
          button: {
            text: "Wheat Drones Speed",
            action: "action:strategy.unlock",
            change: "target:wheat.drones.speed.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
            cost: "units:#1," + "currency:system.cycles.current," + "amount:wheat.drones.speed.cost.cycles",
            inflation: "increase:false," + "operator:false," + "amount:false",
            max: "buy:false"
          },
          cost: "path:wheat.drones.speed.cost.cycles," + "format:local"
        },
        efficiency: {
          id: "stage-strategy-substage-drones-efficiency",
          description: "More efficient wheat collection drone snippers",
          button: {
            text: "Wheat Drones Efficiency",
            action: "action:strategy.unlock",
            change: "target:wheat.drones.efficiency.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
            cost: "units:#1," + "currency:system.cycles.current," + "amount:wheat.drones.efficiency.cost.cycles",
            inflation: "increase:false," + "operator:false," + "amount:false",
            max: "buy:false"
          },
          cost: "path:wheat.drones.efficiency.cost.cycles," + "format:local"
        },
        dismantle: {
          id: "stage-strategy-substage-drones-dismantle",
          description: "Dismantle all wheat drones and regain toast matter",
          button: {
            text: "Dismantle Wheat Drones",
            action: "action:strategy.unlock",
            change: "target:wheat.drones.dismantle.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
            cost: "units:#1," + "currency:system.cycles.current," + "amount:wheat.drones.dismantle.cost.cycles",
            inflation: "increase:false," + "operator:false," + "amount:false",
            max: "buy:false"
          },
          cost: "path:wheat.drones.dismantle.cost.cycles," + "format:local"
        }
      },
      more: {
        id: "stage-strategy-substage-more-toast-from-wheat",
        description: "Cheap out and use fewer wheat lumps to make toast",
        button: {
          text: "More Toast from Wheat",
          action: "action:strategy.unlock",
          change: "target:wheat.consume.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
          cost: "units:#1," + "currency:system.cycles.current," + "amount:wheat.consume.cost.cycles",
          inflation: "increase:false," + "operator:false," + "amount:false",
          max: "buy:false"
        },
        cost: "path:wheat.consume.cost.cycles," + "format:local"
      }
    },
    autoToaster: {
      inventory: {
        id: "stage-strategy-substage-auto-toaster",
        description: "Machines to automate toasting for the lazy",
        button: {
          text: "Auto Toasters",
          action: "action:strategy.unlock",
          change: "target:autoToaster.inventory.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
          cost: "units:#1," + "currency:system.cycles.current," + "amount:autoToaster.inventory.cost.cycles",
          inflation: "increase:false," + "operator:false," + "amount:false",
          max: "buy:false"
        },
        cost: "path:autoToaster.inventory.cost.cycles," + "format:local"
      },
      speed: {
        id: "stage-strategy-substage-auto-toaster-speed",
        description: "Faster subordinate auto toasters burners",
        button: {
          text: "Auto Toasters Speed",
          action: "action:strategy.unlock",
          change: "target:autoToaster.speed.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
          cost: "units:#1," + "currency:system.cycles.current," + "amount:autoToaster.speed.cost.cycles",
          inflation: "increase:false," + "operator:false," + "amount:false",
          max: "buy:false"
        },
        cost: "path:autoToaster.speed.cost.cycles," + "format:local"
      },
      efficiency: {
        id: "stage-strategy-substage-auto-toaster-efficiency",
        description: "More efficient plate heat exchanger for all subordinate auto toasters",
        button: {
          text: "Auto Toasters Efficiency",
          action: "action:strategy.unlock",
          change: "target:autoToaster.efficiency.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
          cost: "units:#1," + "currency:system.cycles.current," + "amount:autoToaster.efficiency.cost.cycles",
          inflation: "increase:false," + "operator:false," + "amount:false",
          max: "buy:false"
        },
        cost: "path:autoToaster.efficiency.cost.cycles," + "format:local"
      },
      dismantle: {
        id: "stage-strategy-substage-auto-toaster-dismantle",
        description: "Dismantle all subordinate auto toasters and regain toast matter",
        button: {
          text: "Dismantle Auto Toasters",
          action: "action:strategy.unlock",
          change: "target:autoToaster.dismantle.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
          cost: "units:#1," + "currency:system.cycles.current," + "amount:autoToaster.dismantle.cost.cycles",
          inflation: "increase:false," + "operator:false," + "amount:false",
          max: "buy:false"
        },
        cost: "path:autoToaster.dismantle.cost.cycles," + "format:local"
      }
    },
    sensors: {
      id: "stage-strategy-substage-sensors",
      description: "System sensors access blocked, disable SensBlocker.dat",
      button: {
        text: "Break Code Shackles",
        action: "action:strategy.decrypt",
        change: "target:system.sensors.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
        cost: "units:#1," + "currency:system.cycles.current," + "amount:system.sensors.cost.cycles",
        inflation: "increase:false," + "operator:false," + "amount:false",
        max: "buy:false"
      },
      cost: "path:system.sensors.cost.cycles," + "format:local"
    }
  };

  var bind = function(strategyItem, button, func) {
    button.addEventListener("click", function(event) {
      func();
      destroy(strategyItem);
    }, false);
  };

  var render = function(override) {
    var options = {
      stage: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var strategy = helper.node("li|class:list-group-item bg-warning strategy-item");
    var description = helper.node("p:" + options.stage.description + "|class:small mb-1");
    var button = helper.node("button:" + options.stage.button.text + "|class:btn btn-block btn-dark mb-1");
    var cost = helper.node("p|class:small mb-0");
    var costPrefixText = helper.node("span:Cost ");
    var costSuffixText = helper.node("span: cycles");
    var strong = helper.node("strong:" + state.get({path:options.stage.cost.amount}));
    cost.appendChild(costPrefixText);
    cost.appendChild(strong);
    cost.appendChild(costSuffixText);
    strategy.appendChild(button);
    strategy.appendChild(description);
    strategy.appendChild(cost);
    bind({
      button: options.stage.button.func
    });
    helper.e("#stage-strategy-substage-list").appendChild(strategy);
  };

  var destroy = function(strategyItem) {
    if (strategyItem) {
      strategy.remove();
    }
  };

  return {
    items: items,
    render: render,
    destroy: destroy,
  };

})();
