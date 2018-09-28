var message = (function() {

  var typePrefix = function(type) {
    var eyes = ["~", "-", "^", "*", "=", "x", "¬", "¯", "×", "÷", "•", "†", "—", "Y", "O", "o", "V", "v", "M", "m", "U", "u", "8", "0", "ö", "õ", "₪", "θ", "Ξ", "+", "■", "◆", "◇", "◈", "◉", "◍", "◎", "●", "◐", "◑", "◒", "◓", "◔", "◕", "◴", "◵", "◶", "◷", "☉"];
    var mouths = ["_", ".", "▁", "◡", "◠", "w"];
    var sides = [{
      left: "[",
      right: "]"
    }, {
      left: "(",
      right: ")"
    }, {
      left: "{",
      right: "}"
    }, {
      left: "<",
      right: ">"
    }, {
      left: "|",
      right: "|"
    }, {
      left: "=",
      right: "="
    }, {
      left: ":",
      right: ":"
    }];
    var allTypes = {
      success: "!!!",
      normal: ":::",
      error: "ERR",
      system: ">>>"
    };
    if (type == "motivation") {
      var makeFace = function() {
        var randomBracket = sides[Math.round(Math.random() * (sides.length - 1))];
        var randomEyes = eyes[Math.round(Math.random() * (eyes.length - 1))];
        var randomMouth = mouths[Math.round(Math.random() * (mouths.length - 1))];
        return randomBracket.left + randomEyes + randomMouth + randomEyes + randomBracket.right;
      };
      return makeFace();
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
      delay: null,
      callback: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    if (options.index < options.text.length) {
      options.target.innerHTML = options.text.substring(0, options.index + 1) + '<span class="report-message-text-blink">#</span>';
      scrollToBottom();
      var delay;
      if (options.delay !== null) {
        delay = options.delay;
      } else {
        delay = 10;
      }
      setTimeout(function() {
        typeWriter({
          text: options.text,
          index: options.index + 1,
          target: options.target,
          delay: options.delay,
          callback: options.callback
        });
      }, delay);
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
      delay: null,
      callback: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    options.textArray.forEach(function(arrayItem, index) {
      var span = document.createElement("span");
      span.setAttribute("class", "report-message-text-item");
      options.target.appendChild(span);
      typeWriter({
        text: arrayItem,
        index: index,
        target: span,
        delay: options.delay,
        callback: options.callback
      });
    });
  };

  var render = function(override) {
    var options = {
      type: null,
      message: null,
      delay: null,
      format: null,
      callback: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    var maxMessages = 100;
    var report = helper.e("#report");
    var newMessage = document.createElement("pre");
    newMessage.setAttribute("class", "mb-2 text-" + colour[options.type] + " report-message");
    if (options.format == "normal") {
      newMessage.classList.add("report-message-normal");
    } else if (options.format == "pre") {
      newMessage.classList.add("report-message-pre");
    };
    var messageType = document.createElement("span");
    messageType.textContent = typePrefix(options.type);
    messageType.setAttribute("class", "report-message-type");
    var messageText = document.createElement("span");
    messageText.setAttribute("class", "report-message-text");
    newMessage.appendChild(messageType);
    newMessage.appendChild(messageText);
    while (report.childNodes.length > maxMessages) {
      report.firstChild.remove();
    }
    report.appendChild(newMessage);
    startTypeWriter({
      textArray: options.message,
      index: 0,
      delay: options.delay,
      target: messageText,
      callback: options.callback
    });
  };

  var clear = function() {
    var report = helper.e("#report");
    while (report.lastChild) {
      report.removeChild(report.lastChild);
    };
  };

  var scrollToBottom = function() {
    var report = helper.e("#report");
    report.scrollTop = report.scrollHeight;
  };

  return {
    render: render,
    clear: clear
  };

})();
