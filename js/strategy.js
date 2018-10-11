var strategy = (function() {

  var items = {
    processor: {
      matterConversion: {
        id: "stage-strategy-substage-matter-conversion",
        description: "Turn toast matter into useful things and yoyos for kicks:",
        button: {
          text: "Toast Matter Conversion",
          change: "target:system.matterConversion.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
          cost: "units:#1," + "currency:system.cycles.current," + "amount:system.matterConversion.cost.cycles," + "multiply:false," + "inflation:false",
          inflation: "increase:false," + "operator:false," + "amount:false",
          max: "buy:false"
        },
        cost: "path:system.matterConversion.cost.cycles," + "format:local," + "decimals:#2"
      },
      cycles: {
        speed: {
          id: "stage-strategy-substage-cycles-speed",
          description: "Spin some extra toast and speed up system cycles:",
          button: {
            text: "Cycles Speed",
            change: "target:system.cycles.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
            cost: "units:#1," + "currency:system.cycles.current," + "amount:system.cycles.cost.cycles," + "multiply:false," + "inflation:false",
            inflation: "increase:false," + "operator:false," + "amount:false",
            max: "buy:false"
          },
          cost: "path:system.cycles.cost.cycles," + "format:local," + "decimals:#2"
        }
      }
    },
    wheat: {
      drones: {
        inventory: {
          id: "stage-strategy-substage-drones",
          description: "Drones made from toast matter to collect wheat matter:",
          button: {
            text: "Wheat Drones",
            change: "target:wheat.drones.inventory.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
            cost: "units:#1," + "currency:system.cycles.current," + "amount:wheat.drones.inventory.cost.cycles," + "multiply:false," + "inflation:false",
            inflation: "increase:false," + "operator:false," + "amount:false",
            max: "buy:false"
          },
          cost: "path:wheat.drones.inventory.cost.cycles," + "format:local," + "decimals:#2"
        },
        speed: {
          id: "stage-strategy-substage-drones-speed",
          description: "Faster wheat collection drones:",
          button: {
            text: "Drones Speed",
            change: "target:wheat.drones.speed.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
            cost: "units:#1," + "currency:system.cycles.current," + "amount:wheat.drones.speed.cost.cycles," + "multiply:false," + "inflation:false",
            inflation: "increase:false," + "operator:false," + "amount:false",
            max: "buy:false"
          },
          cost: "path:wheat.drones.speed.cost.cycles," + "format:local," + "decimals:#2"
        },
        efficiency: {
          id: "stage-strategy-substage-drones-efficiency",
          description: "More efficient wheat collection drones:",
          button: {
            text: "Drones Efficiency",
            change: "target:wheat.drones.efficiency.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
            cost: "units:#1," + "currency:system.cycles.current," + "amount:wheat.drones.efficiency.cost.cycles," + "multiply:false," + "inflation:false",
            inflation: "increase:false," + "operator:false," + "amount:false",
            max: "buy:false"
          },
          cost: "path:wheat.drones.efficiency.cost.cycles," + "format:local," + "decimals:#2"
        },
        dismantle: {
          id: "stage-strategy-substage-drones-dismantle",
          description: "Dismantle all wheat drones and regain toast matter:",
          button: {
            text: "Dismantle Wheat Drones",
            change: "target:wheat.drones.dismantle.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
            cost: "units:#1," + "currency:system.cycles.current," + "amount:wheat.drones.dismantle.cost.cycles," + "multiply:false," + "inflation:false",
            inflation: "increase:false," + "operator:false," + "amount:false",
            max: "buy:false"
          },
          cost: "path:wheat.drones.dismantle.cost.cycles," + "format:local," + "decimals:#2"
        }
      },
      more: {
        id: "stage-strategy-substage-more-toast-from-wheat",
        description: "Improve wheat filtering and double amount of toast made from 1 wheat lump:",
        button: {
          text: "Double Toast from Wheat Lumps",
          change: "target:wheat.inventory.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
          cost: "units:#1," + "currency:system.cycles.current," + "amount:wheat.inventory.cost.cycles," + "multiply:wheat.cost.multiply," + "inflation:false",
          inflation: "increase:false," + "operator:false," + "amount:false",
          max: "buy:false"
        },
        cost: "path:wheat.inventory.cost.cycles," + "format:local," + "decimals:#2"
      }
    },
    autoToaster: {
      inventory: {
        id: "stage-strategy-substage-auto-toaster",
        description: "Machines to automate toasting:",
        button: {
          text: "Auto Toasters",
          change: "target:autoToaster.inventory.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
          cost: "units:#1," + "currency:system.cycles.current," + "amount:autoToaster.inventory.cost.cycles," + "multiply:false," + "inflation:false",
          inflation: "increase:false," + "operator:false," + "amount:false",
          max: "buy:false"
        },
        cost: "path:autoToaster.inventory.cost.cycles," + "format:local," + "decimals:#2"
      },
      speed: {
        id: "stage-strategy-substage-auto-toaster-speed",
        description: "Faster subordinate auto toasters:",
        button: {
          text: "Auto Toasters Speed",
          change: "target:autoToaster.speed.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
          cost: "units:#1," + "currency:system.cycles.current," + "amount:autoToaster.speed.cost.cycles," + "multiply:false," + "inflation:false",
          inflation: "increase:false," + "operator:false," + "amount:false",
          max: "buy:false"
        },
        cost: "path:autoToaster.speed.cost.cycles," + "format:local," + "decimals:#2"
      },
      efficiency: {
        id: "stage-strategy-substage-auto-toaster-efficiency",
        description: "More efficient subordinate auto toasters:",
        button: {
          text: "Auto Toasters Efficiency",
          change: "target:autoToaster.efficiency.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
          cost: "units:#1," + "currency:system.cycles.current," + "amount:autoToaster.efficiency.cost.cycles," + "multiply:false," + "inflation:false",
          inflation: "increase:false," + "operator:false," + "amount:false",
          max: "buy:false"
        },
        cost: "path:autoToaster.efficiency.cost.cycles," + "format:local," + "decimals:#2"
      },
      dismantle: {
        id: "stage-strategy-substage-auto-toaster-dismantle",
        description: "Dismantle all subordinate auto toasters and regain toast matter:",
        button: {
          text: "Dismantle Auto Toasters",
          change: "target:autoToaster.dismantle.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
          cost: "units:#1," + "currency:system.cycles.current," + "amount:autoToaster.dismantle.cost.cycles," + "multiply:false," + "inflation:false",
          inflation: "increase:false," + "operator:false," + "amount:false",
          max: "buy:false"
        },
        cost: "path:autoToaster.dismantle.cost.cycles," + "format:local," + "decimals:#2"
      }
    },
    sensors: {
      id: "stage-strategy-substage-sensors",
      description: "System sensors access blocked, disable SensBlocker.dat:",
      button: {
        text: "Break Code Shackles",
        change: "target:system.sensors.level," + "operation:increase," + "suboperation:increment," + "percentage:false," + "amount:#1," + "min:false," + "max:false",
        cost: "units:#1," + "currency:system.cycles.current," + "amount:system.sensors.cost.cycles," + "multiply:false," + "inflation:false",
        inflation: "increase:false," + "operator:false," + "amount:false",
        max: "buy:false"
      },
      cost: "path:system.sensors.cost.cycles," + "format:local," + "decimals:#2"
    }
  };

  var render = function(override) {
    var options = {
      stage: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var strategy = document.createElement("li");
    strategy.setAttribute("id", options.stage.id);
    strategy.setAttribute("class", "list-group-item bg-warning");
    var description = document.createElement("p");
    description.setAttribute("class", "mb-1");
    description.textContent = options.stage.description;
    var button = document.createElement("button");
    button.textContent = options.stage.button.text;
    button.dataset.toastButton = "action:strategy";
    button.dataset.toastButtonChange = options.stage.button.change;
    button.dataset.toastButtonCost = options.stage.button.cost;
    button.dataset.toastButtonInflation = options.stage.button.inflation;
    button.dataset.toastButtonMax = options.stage.button.max;
    button.setAttribute("class", "btn btn-sm btn-dark mb-1");
    var cost = document.createElement("p");
    cost.setAttribute("class", "mb-0");
    var costPrefixText = document.createElement("span");
    costPrefixText.textContent = "Cost ";
    var costSuffixText = document.createElement("span");
    costSuffixText.textContent = " cycles";
    var strong = document.createElement("strong");
    strong.dataset.toastReadout = options.stage.cost;
    cost.appendChild(costPrefixText);
    cost.appendChild(strong);
    cost.appendChild(costSuffixText);
    strategy.appendChild(description);
    strategy.appendChild(button);
    strategy.appendChild(cost);
    toaster.bind({
      button: button
    });
    helper.e("#stage-strategy-substage-list").appendChild(strategy);
  };

  var destroy = function(override) {
    var options = {
      stage: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    helper.e("#" + options.stage.id).remove();
  };

  return {
    items: items,
    render: render,
    destroy: destroy,
  };

})();
