var milestones = (function() {

  var make = function() {
    var baseSteps = toaster.state.get({
      path: "milestones.steps.base"
    });
    var maxStep = toaster.state.get({
      path: "milestones.steps.max"
    });
    var milestone = [];
    if (toaster.state.get({
        path: "milestones.steps.all",
      }).length == 0) {
      baseSteps.forEach(function(arrayItem) {
        var multiplier = 1;
        var step = arrayItem;
        while (multiplier < maxStep) {
          var stepObject = {
            count: step * (multiplier),
            check: {
              lifetime: false,
              consumed: false,
              autoToaster: false
            }
          };
          milestone.push(stepObject)
          multiplier = multiplier * 10;
        }
      });
      milestone = helper.sortObject(milestone, "count");
      toaster.state.set({
        path: "milestones.steps.all",
        value: milestone
      })
    }
  };

  var check = function() {
    var allMilestones = toaster.state.get({
      path: "milestones"
    });
    allMilestones.steps.all.forEach(function(arrayItem, index) {
      // console.log(arrayItem);
      var step = arrayItem;
      for (var key in step.check) {
        // console.log(allMilestones.address[key]);
        var valueToCheck = toaster.state.get({
          path: allMilestones.address[key]
        });
        if (valueToCheck >= step.count && !step.check[key]) {
          step.check[key] = true;
          // console.log(key, step.count, step.check[key]);
          passedMessage({
            count: step.count,
            type: key
          });
        }
      };
    });
  };

  var passedMessage = function(override) {
    var options = {
      count: null,
      type: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var messageParts = {
      lifetime: {
        prefix: "milestone: ",
        suffix: " lifetime toast"
      },
      consumed: {
        prefix: "milestone: ",
        suffix: " consumed toast"
      },
      autoToaster: {
        prefix: "milestone: ",
        suffix: " subordinate auto toasters"
      }
    };
    message.render({
      type: "success",
      message: [messageParts[options.type].prefix + helper.numberSuffix({
        number: options.count,
        decimals: 0
      }) + messageParts[options.type].suffix],
      format: "normal"
    });
  };

  var init = function() {
    make();
  };

  return {
    init: init,
    check: check,
    make: make
  };

})();
