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
      options.cost.units = 1;
      options.button = this.element;
      options.prices = toaster.costForMultiple(options);
      console.log(options.prices);
      if (toaster.validateAction(options)) {
        toaster.payCost(options);
        toaster.setNewCost(options);
        toaster.storeSpent(options);
        toaster.changeValue(options);
        toaster.disableButton(options);
        cycles.set();
        if (options.message.success != null) {
          options.message.success.state = true;
          toaster.feedbackMessage(options);
        }
      } else {
        if (options.message.fail != null) {
          options.message.fail.state = true;
          toaster.feedbackMessage(options);
        }
      }
    }
  }, {
    element: helper.e(".control-processor-boost-2"),
    func: function() {
      var options = new BoostOptions();
      options.change.amount = 2;
      options.cost.units = 2;
      options.button = this.element;
      options.prices = toaster.costForMultiple(options);
      console.log(options.prices);
      if (toaster.validateAction(options)) {
        toaster.payCost(options);
        toaster.setNewCost(options);
        toaster.storeSpent(options);
        toaster.changeValue(options);
        toaster.disableButton(options);
        cycles.set();
        if (options.message.success != null) {
          options.message.success.state = true;
          toaster.feedbackMessage(options);
        }
      } else {
        if (options.message.fail != null) {
          options.message.fail.state = true;
          toaster.feedbackMessage(options);
        }
      }
    }
  }, {
    element: helper.e(".control-processor-boost-3"),
    func: function() {
      var options = new BoostOptions();
      options.change.amount = 3;
      options.cost.units = 3;
      options.button = this.element;
      options.prices = toaster.costForMultiple(options);
      console.log(options.prices);
      if (toaster.validateAction(options)) {
        toaster.payCost(options);
        toaster.setNewCost(options);
        toaster.storeSpent(options);
        toaster.changeValue(options);
        toaster.disableButton(options);
        cycles.set();
        if (options.message.success != null) {
          options.message.success.state = true;
          toaster.feedbackMessage(options);
        }
      } else {
        if (options.message.fail != null) {
          options.message.fail.state = true;
          toaster.feedbackMessage(options);
        }
      }
    }
  }, {
    element: helper.e(".control-processor-boost-max"),
    func: function() {
      var options = new BoostOptions();
      options.change.amount = 30;
      options.cost.units = 30;
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

  var BoostOptions = function() {
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
