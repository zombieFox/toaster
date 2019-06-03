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
    element: helper.e(".control-system-processor-power-1"),
    func: function() {
      _controlProcessorBoost(1, 1, this.element);
    }
  }, {
    element: helper.e(".control-system-processor-power-10"),
    func: function() {
      _controlProcessorBoost(10, 10, this.element);
    }
  }, {
    element: helper.e(".control-system-processor-power-100"),
      func: function() {
        _controlProcessorBoost(100, 100, this.element);
      }
  }, {
    element: helper.e(".control-system-processor-power-1000"),
      func: function() {
        _controlProcessorBoost(1000, 1000, this.element);
      }
  }, {
    element: helper.e(".control-system-processor-power-max"),
    func: function() {
      var _currentOptions = new SystemProcessorPowerOptions();
      var n_y = toaster.nth.max({
        money: state.get({
          path: _currentOptions.cost.currency
        }),
        level: state.get({
          path: _currentOptions.change.target
        }),
        a1: state.get({
          path: _currentOptions.cost.starting
        }),
        difference: state.get({
          path: _currentOptions.inflation.amount
        })
      });
      _currentOptions.change.amount = n_y;
      _currentOptions.cost.units = n_y;
      _currentOptions.button = this.element;
      _currentOptions = toaster.calculateCost(_currentOptions);
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
      _currentOptions = null;
    }
  }, {
    element: helper.e(".control-system-processor-power-dismantle"),
    func: function() {
      var _currentOptions = new systemProcessorPowerDismantleOptions();
      _currentOptions.button = this.element;
      if (toaster.validateDismantle(_currentOptions)) {
        if (_currentOptions.message.success != null) {
          _currentOptions.message.success.state = true;
          toaster.feedbackMessage(_currentOptions);
        }
        toaster.refundCost(_currentOptions);
        toaster.resetCost(_currentOptions);
        toaster.clearSpent(_currentOptions);
        toaster.dismantleTarget(_currentOptions);
      } else {
        if (_currentOptions.message.fail != null) {
          _currentOptions.message.fail.state = true;
          toaster.feedbackMessage(_currentOptions);
        }
      }
      _currentOptions = null;
    }
  }];

  var bind = function() {
    _allControl.forEach(function(item, index) {
      if (item.element) {
        item.element.addEventListener("click", function(event) {
          if (item.func) {
            item.func();
            data.save();
          };
        }, false);
      };
    });
  };

  var _controlProcessorBoost = function(amount, units, button) {
    var _currentOptions = new SystemProcessorPowerOptions();
    _currentOptions.change.amount = amount;
    _currentOptions.cost.units = units;
    _currentOptions.button = button;
    _currentOptions = toaster.calculateCost(_currentOptions);
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
    _currentOptions = null;
  };

  var SystemProcessorPowerOptions = function() {
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

  var systemProcessorPowerDismantleOptions = function() {
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
