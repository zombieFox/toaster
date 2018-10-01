var strategy = (function() {

  var items = {
    cyclesSpeed: {
      id: "#stage-strategy-substage-cycles-speed",
      description: "Spin some extra toast and speed up system cycles:",
      button: {
        text: "Cycles Speed",
        change: "target:system.cycles.level,operation:increase,suboperation:increment,percentage:false,amount:#1,min:false,max:false",
        cost: "units:#1,currency:system.cycles.current,amount:system.cycles.cost.cycles,multiply:false,inflation:false"
      },
      cost: "path:system.cycles.cost.cycles,format:local,decimals:#2"
    },
    collectWheat: {
      id: "#stage-strategy-substage-collect-wheat",
      description: "Collect more wheat lumps using toast matter:",
      button: {
        text: "Collect Wheat",
        change: "target:wheat.level,operation:increase,suboperation:increment,percentage:false,amount:#1,min:false,max:false",
        cost: "units:#1,currency:system.cycles.current,amount:wheat.cost.cycles,multiply:wheat.cost.multiply,inflation:false"
      },
      cost: "path:wheat.cost.cycles,format:local,decimals:#2"
    },
    moreToastFromWheat: {
      id: "#stage-strategy-substage-more-toast-from-wheat",
      description: "Double amount of toast made from wheat lumps:",
      button: {
        text: "Double Toast from Wheat Lumps",
        change: "target:wheat.level,operation:increase,suboperation:increment,percentage:false,amount:#1,min:false,max:false",
        cost: "units:#1,currency:system.cycles.current,amount:wheat.cost.cycles,multiply:wheat.cost.multiply,inflation:false"
      },
      cost: "path:wheat.cost.cycles,format:local,decimals:#2"
    },
    matterConversion: {
      id: "#stage-strategy-substage-matter-conversion",
      description: "Turn toast matter into useful things and yoyos for kicks:",
      button: {
        text: "Toast Matter Conversion",
        change: "target:system.matterConversion.level,operation:increase,suboperation:increment,percentage:false,amount:#1,min:false,max:false",
        cost: "units:#1,currency:system.cycles.current,amount:system.matterConversion.cost.cycles,multiply:false,inflation:false"
      },
      cost: "path:system.matterConversion.cost.cycles,format:local,decimals:#2"
    },
    autoToaster: {
      id: "#stage-strategy-substage-auto-toaster",
      description: "Machines to automate toasting:",
      button: {
        text: "Auto Toasters",
        change: "target:autoToaster.level,operation:increase,suboperation:increment,percentage:false,amount:#1,min:false,max:false",
        cost: "units:#1,currency:system.cycles.current,amount:autoToaster.cost.cycles,multiply:false,inflation:false"
      },
      cost: "path:autoToaster.cost.cycles,format:local,decimals:#2"
    },
    autoToasterSpeed: {
      id: "#stage-strategy-substage-auto-toaster-speed",
      description: "Faster subordinate auto toasters:",
      button: {
        text: "Auto Toasters Speed",
        change: "target:autoToaster.speed.level,operation:increase,suboperation:increment,percentage:false,amount:#1,min:false,max:false",
        cost: "units:#1,currency:system.cycles.current,amount:autoToaster.speed.cost.cycles,multiply:false,inflation:false"
      },
      cost: "path:autoToaster.speed.cost.cycles,format:local,decimals:#2"
    },
    autoToasterEfficiency: {
      id: "#stage-strategy-substage-auto-toaster-efficiency",
      description: "More efficient subordinate auto toasters:",
      button: {
        text: "Auto Toasters Efficiency",
        change: "target:autoToaster.efficiency.level,operation:increase,suboperation:increment,percentage:false,amount:#1,min:false,max:false",
        cost: "units:#1,currency:system.cycles.current,amount:autoToaster.efficiency.cost.cycles,multiply:false,inflation:false"
      },
      cost: "path:autoToaster.efficiency.cost.cycles,format:local,decimals:#2"
    },
    sensors: {
      id: "#stage-strategy-substage-sensors",
      description: "System sensors access blocked, disable SensBlocker.dat:",
      button: {
        text: "Break Code Shackles",
        change: "target:system.sensors.level,operation:increase,suboperation:increment,percentage:false,amount:#1,min:false,max:false",
        cost: "units:#1,currency:system.cycles.current,amount:system.sensors.cost.cycles,multiply:false,inflation:false"
      },
      cost: "path:system.sensors.cost.cycles,format:local,decimals:#2"
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

  return {
    items: items,
    render: render
  };

})();
