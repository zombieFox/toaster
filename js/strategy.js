var strategy = (function() {

  var all = {
    cyclesSpeed: {
      id: "#stage-system",
      description: "Spin some extra toast and speed up system cycles:",
      button: {
        text: "Cycles Speed",
        change: "target:system.cycles.level,operation:increase,suboperation:increment,percentage:false,amount:#1,min:false,max:false",
        cost: "units:#1,currency:system.cycles.current,amount:system.cycles.cost.cycles,multiply:false,inflation:false"
      },
      cost: "path:system.cycles.cost.cycles,format:local,decimals:#2"
    }
  }

  function render(override) {
    var options = {
      stage: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
  }

  return {
    all: all
  };

})();
