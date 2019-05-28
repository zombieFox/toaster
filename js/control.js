var control = (function() {

  var _currentOptions = null;

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
      var _currentOptions = new ProcessorBoostOptions();
      _currentOptions.change.amount = 1;
      _currentOptions.cost.units = 1;
      _currentOptions.button = this.element;
      _currentOptions = toaster.costForMultiple(_currentOptions);
      if (toaster.validateAction(_currentOptions)) {
        toaster.payCost(_currentOptions);
        toaster.setNewCost(_currentOptions);
        toaster.storeSpent(_currentOptions);
        toaster.changeValue(_currentOptions);
        toaster.disableButton(_currentOptions);
        cycles.set();
        if (_currentOptions.message.success != null) {
          _currentOptions.message.success.state = true;
          toaster.feedbackMessage(_currentOptions);
        }
      } else {
        if (_currentOptions.message.fail != null) {
          _currentOptions.message.fail.state = true;
          toaster.feedbackMessage(_currentOptions);
        }
      }
      console.log(_currentOptions);
      _currentOptions = null;
    }
  }, {
    element: helper.e(".control-processor-boost-10"),
    func: function() {
      var _currentOptions = new ProcessorBoostOptions();
      _currentOptions.change.amount = 5;
      _currentOptions.cost.units = 5;
      _currentOptions.button = this.element;
      _currentOptions = toaster.costForMultiple(_currentOptions);
      if (toaster.validateAction(_currentOptions)) {
        toaster.payCost(_currentOptions);
        toaster.setNewCost(_currentOptions);
        toaster.storeSpent(_currentOptions);
        toaster.changeValue(_currentOptions);
        toaster.disableButton(_currentOptions);
        cycles.set();
        if (_currentOptions.message.success != null) {
          _currentOptions.message.success.state = true;
          toaster.feedbackMessage(_currentOptions);
        }
      } else {
        if (_currentOptions.message.fail != null) {
          _currentOptions.message.fail.state = true;
          toaster.feedbackMessage(_currentOptions);
        }
      }
      console.log(_currentOptions);
      _currentOptions = null;
    }
  }, {
    element: helper.e(".control-processor-boost-max"),
    func: function() {
      var _currentOptions = new ProcessorBoostOptions();
      _currentOptions.max.buy = true;
      _currentOptions.button = this.element;
      _currentOptions.prices = toaster.costForMultiple(_currentOptions);
      if (toaster.validateAction(_currentOptions)) {
        toaster.payCost(_currentOptions);
        toaster.setNewCost(_currentOptions);
        toaster.storeSpent(_currentOptions);
        toaster.changeValue(_currentOptions);
        toaster.disableButton(_currentOptions);
        cycles.set();
        if (_currentOptions.message.success != null) {
          _currentOptions.message.success.state = true;
          toaster.feedbackMessage(_currentOptions);
        }
      } else {
        if (_currentOptions.message.fail != null) {
          _currentOptions.message.fail.state = true;
          toaster.feedbackMessage(_currentOptions);
        }
      }
      console.log(_currentOptions);
      _currentOptions = null;
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
      currency: "toast.inventory",
      amount: "system.processor.cost.toast",
      spent: "system.processor.cost.spent",
      units: null,
      price: {
        total: null,
        next: null
      }
    };
    this.inflation = {
      operator: "increase",
      amount: "system.processor.cost.increase",
      increase: true
    };
    this.max = {
      buy: false
    };
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
      currency: "toast.inventory",
      amount: "system.processor.cost.toast",
      spent: "system.processor.cost.spent",
      units: null,
      price: {
        total: null,
        next: null
      }
    };
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
