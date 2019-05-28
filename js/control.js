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
      var options = new ProcessorBoostOptions();
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
    element: helper.e(".control-processor-boost-10"),
    func: function() {
      var options = new ProcessorBoostOptions();
      options.change.amount = 10;
      options.cost.units = 10;
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
    element: helper.e(".control-processor-boost-100"),
    func: function() {
      var options = new ProcessorBoostOptions();
      options.change.amount = 100;
      options.cost.units = 100;
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
      var options = new ProcessorBoostOptions();
      options.max.buy = true;
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
    element: helper.e(".control-processor-boost-dismantle"),
    func: function() {
      var options = new ProcessorDismantleOptions();
      options.button = this.element;
      console.log(options.prices);
      if (toaster.validateDismantle(options)) {
        if (options.message.success != null) {
          options.message.success.state = true;
          toaster.feedbackMessage(options);
        }
        toaster.refundCost(options);
        toaster.resetCost(options);
        toaster.clearSpent(options);
        toaster.dismantleTarget(options);
      } else {
        if (options.message.fail != null) {
          options.message.fail.state = true;
          toaster.feedbackMessage(options);
        }
      }
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

  var ProcessorBoostOptions = function() {
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

  var ProcessorDismantleOptions = function() {
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
    this.prices = null;
    this.message = {
      success: {
        path: "processor.dismantle.success",
        state: false
      },
      fail: {
        path: "processor.dismantle.fail",
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
