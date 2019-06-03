var view = (function() {

  _allReadout = [{
    class: ".readout-toast-inventory",
    path: "toast.inventory",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-toast-lifetime",
    path: "toast.lifetime",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-store-timestamp",
    path: "store.timestamp",
    format: null,
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-system-processor-power",
    path: "system.processor.power",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-system-processor-cost-toast",
    path: "system.processor.cost.toast",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-system-processor-cost-spent",
    path: "system.processor.cost.spent",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-system-cycles-current",
    path: "system.cycles.current",
    format: "local",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-system-cycles-max",
    path: "system.cycles.max",
    format: "local",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-system-cycles-speed-interval-current",
    path: "system.cycles.speed.interval.current",
    format: "local",
    modify: {
      type: "divide",
      by: 1000,
      round: false
    }
  }, {
    class: ".readout-system-cycles-speed-cost-toast",
    path: "system.cycles.speed.cost.toast",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-system-matterConversion-level",
    path: "system.matterConversion.level",
    format: "local",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-system-sensors-level",
    path: "system.sensors.level",
    format: "local",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-wheat-inventory-current",
    path: "wheat.inventory.current",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-wheat-consume-rate",
    path: "wheat.consume.rate",
    format: "local",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-consumed-count",
    path: "consumed.count",
    format: "local",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-consumed-rate",
    path: "consumed.rate",
    format: "local",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-consumed-interval",
    path: "consumed.interval",
    format: "local",
    modify: {
      type: "divide",
      by: 10,
      round: true
    }
  }, {
    class: ".readout-wheat-drones-inventory-current",
    path: "wheat.drones.inventory.current",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-wheat-drones-inventory-output",
    path: "wheat.drones.inventory.output",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-wheat-drones-speed-interval-current",
    path: "wheat.drones.speed.interval.current",
    format: "local",
    modify: {
      type: "divide",
      by: 1000,
      round: false
    }
  }, {
    class: ".readout-wheat-drones-inventory-cost-toast-current",
    path: "wheat.drones.inventory.cost.toast.current",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-wheat-drones-inventory-cost-toast-spent",
    path: "wheat.drones.inventory.cost.toast.spent",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-wheat-drones-speed-interval-current",
    path: "wheat.drones.speed.interval.current",
    format: "local",
    modify: {
      type: "divide",
      by: 1000,
      round: false
    }
  }, {
    class: ".readout-wheat-drones-speed-cost-toast-current",
    path: "wheat.drones.speed.cost.toast.current",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-wheat-drones-efficiency-current",
    path: "wheat.drones.efficiency.current",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-wheat-drones-efficiency-cost-toast-current",
    path: "wheat.drones.efficiency.cost.toast.current",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-autoToaster-inventory-current",
    path: "autoToaster.inventory.current",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-autoToaster-inventory-output",
    path: "autoToaster.inventory.output",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-autoToaster-speed-interval-current",
    path: "autoToaster.speed.interval.current",
    format: "local",
    modify: {
      type: "divide",
      by: 1000,
      round: false
    }
  }, {
    class: ".readout-autoToaster-inventory-cost-toast-current",
    path: "autoToaster.inventory.cost.toast.current",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-autoToaster-inventory-cost-toast-spent",
    path: "autoToaster.inventory.cost.toast.spent",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-autoToaster-speed-interval-current",
    path: "autoToaster.speed.interval.current",
    format: "local",
    modify: {
      type: "divide",
      by: 1000,
      round: false
    }
  }, {
    class: ".readout-autoToaster-speed-cost-toast-current",
    path: "autoToaster.speed.cost.toast.current",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-autoToaster-efficiency-current",
    path: "autoToaster.efficiency.current",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }, {
    class: ".readout-autoToaster-efficiency-cost-toast-current",
    path: "autoToaster.efficiency.cost.toast.current",
    format: "suffix",
    modify: {
      type: null,
      by: null,
      round: null
    }
  }];

  var render = function() {
    _allReadout.forEach(function(arrayItem, index) {
      var data = state.get({
        path: arrayItem.path
      });
      var format = {
        suffix: function() {
          data = helper.numberSuffix({
            number: data,
            decimals: arrayItem.decimals
          });
        },
        local: function() {
          if (arrayItem.decimals != undefined) {
            data = data.toLocaleString(undefined, {
              minimumFractionDigits: arrayItem.decimals
            });
          } else {
            data = data.toLocaleString();
          }
        },
        divide: function() {
          data = helper.operator({
            type: "divide",
            value: data,
            by: arrayItem.modify.by
          })
        }
      };
      if (arrayItem.modify.type != null) {
        format[arrayItem.modify.type]();
      }
      if (arrayItem.format != null) {
        format[arrayItem.format]();
      }
      helper.eA(arrayItem.class).forEach(function(arrayItem) {
        arrayItem.textContent = data;
      });
    });
  };

  return {
    render: render
  }

})();
