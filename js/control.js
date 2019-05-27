var control = (function() {

  var _allControl = [{
    element: helper.e(".control-toast"),
    func: function() {
      toast.make(state.get({
        path: "system.processor.power"
      }));
    }
  }, {
    element: helper.e(".control-processor-boost-1"),
    func: function() {
      var options = new BoostOptions();
      options.change.amount = 1;
      options.cost.amount = 1;
      options.button = this.element;
      options.prices = toaster.costForMultiple(options);
      console.log(options.prices);
    }
  }, {
    element: helper.e(".control-processor-boost-2"),
    func: function() {
      var options = new BoostOptions();
      options.change.amount = 2;
      options.cost.amount = 2;
      options.button = this.element;
      options.prices = toaster.costForMultiple(options);
      console.log(options.prices);
    }
  }, {
    element: helper.e(".control-processor-boost-3"),
    func: function() {
      var options = new BoostOptions();
      options.change.amount = 3;
      options.cost.amount = 3;
      options.button = this.element;
      options.prices = toaster.costForMultiple(options);
      console.log(options.prices);
    }
  }];

  var bind = function() {
    _allControl.forEach(function(item, index) {
      item.element.addEventListener("click", function(event) {
        if (item.func) {
          item.func();
          data.save();
        };
      }, false);
    });
  };

  var BoostOptions = function(amount, units, button) {
    this.change = {
      target: "system.processor.power",
      operation: "increase",
      suboperation: "increment",
      percentage: false,
      amount: null,
      min: false,
      max: false
    };
    this.cost = {
      starting: "system.processor.cost.starting",
      units: null,
      currency: "toast.inventory",
      amount: "system.processor.cost.toast",
      spent: "system.processor.cost.spent"
    };
    this.inflation = {
      increase: true,
      operator: "increase",
      amount: "system.processor.cost.increase"
    };
    this.max = {
      buy: false
    };
    this.prices = null;
    this.message = {
      success: {
        path: "processor.boost.success",
        state: false
      },
      fail: {
        path: "processor.boost.fail",
        state: false
      }
    };
    this.button = null
  };

  var init = function() {
    bind();
  };

  // exposed methods
  return {
    init: init
  };

})();
