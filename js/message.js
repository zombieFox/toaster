var message = (function() {

  var typePrefix = function(type) {
    var allFaces = [
      "-_-",
      "^_^",
      "*_*",
      "#_#",
      "x x",
      "o o",
      "._.",
      "[:]",
      "!_!",
      "+.+"
    ];
    var allTypes = {
      success: "!!!",
      normal: ":::",
      error: "ERR",
      system: "|||"
    };
    if (type == "motivation") {
      return allFaces[Math.round(Math.random() * (allFaces.length - 1))]
    } else {
      return allTypes[type];
    }
  };

  var colour = {
    success: "success",
    normal: "white",
    error: "danger",
    system: "warning",
    motivation: "info"
  };

  var typeWriter = function(override) {
    var options = {
      text: null,
      index: null,
      target: null,
      callback: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    if (options.index < options.text.length) {
      options.target.innerHTML = options.text.substring(0, options.index + 1) + '<span class="report-message-text-blink">#</span>';
      setTimeout(function() {
        typeWriter({
          text: options.text,
          index: options.index + 1,
          target: options.target,
          callback: options.callback
        });
      }, 20);
    } else {
      if (options.callback !== null) {
        options.callback();
      }
    }
  };

  var startTypeWriter = function(override) {
    var options = {
      textArray: null,
      index: null,
      target: null,
      callback: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    options.textArray.forEach(function(arrayItem, index) {
      var span = document.createElement("span");
      span.setAttribute("class", "report-message-text-item");
      options.target.appendChild(span);
      scrollToBottom();
      typeWriter({
        text: arrayItem,
        index: index,
        target: span,
        callback: options.callback
      });
    });
  };

  var render = function(override) {
    var options = {
      type: null,
      message: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var report = helper.e("#report");
    var reportArea = helper.e("#report-area");
    var newMessage = document.createElement("pre");
    newMessage.setAttribute("class", "mb-0 text-" + colour[options.type] + " report-message");
    var messageType = document.createElement("span");
    messageType.textContent = typePrefix(options.type);
    messageType.setAttribute("class", "report-message-type");
    var messageText = document.createElement("span");
    messageText.setAttribute("class", "report-message-text");
    var hr = document.createElement("hr");
    hr.setAttribute("class", "border-" + colour[options.type]);
    newMessage.appendChild(messageType);
    newMessage.appendChild(messageText);
    // reportArea.appendChild(hr);
    reportArea.appendChild(newMessage);
    startTypeWriter({
      textArray: options.message,
      index: 0,
      target: messageText
    });
  };

  var scrollToBottom = function() {
    var report = helper.e("#report");
    report.scrollTop = report.scrollHeight;
  };

  return {
    render: render
  };

})();
