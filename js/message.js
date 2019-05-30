var message = (function() {

  var typePrefix = function(type) {
    var all = {
      success: function() {
        return "!!!";
      },
      normal: function() {
        return ":::";
      },
      error: function() {
        return "ERR";
      },
      system: function() {
        return "///";
      },
      motivation: function() {
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
        var randomBracket = sides[Math.round(Math.random() * (sides.length - 1))];
        var randomEyes = eyes[Math.round(Math.random() * (eyes.length - 1))];
        var randomMouth = mouths[Math.round(Math.random() * (mouths.length - 1))];
        return randomBracket.left + randomEyes + randomMouth + randomEyes + randomBracket.right;
      }
    };
    return all[type]();
  };

  var cursor = {
    success: "*",
    normal: "#",
    error: "~",
    system: "/",
    motivation: "_"
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
    if (options.index <= options.text.length) {
      options.target.innerHTML = options.text.substring(0, options.index + 1);
      scrollToBottom();
      var delay;
      if (options.delay != null) {
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
      if (options.callback != null) {
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
      cursor: null,
      callback: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    options.textArray.forEach(function(arrayItem, index) {
      var item = document.createElement("span");
      item.setAttribute("class", "report-message-text-item");
      var string = document.createElement("span");
      string.setAttribute("class", "report-message-text-string");
      var blink = document.createElement("span");
      blink.setAttribute("class", "report-message-text-blink");
      blink.textContent = options.cursor;
      item.appendChild(string);
      item.appendChild(blink);
      options.target.appendChild(item);
      typeWriter({
        text: arrayItem,
        index: 1,
        target: string,
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
    var format = {
      normal: function() {
        newMessage.classList.add("report-message-normal");
      },
      pre: function() {
        newMessage.classList.add("report-message-pre");
      }
    };
    format[options.format]();
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
      cursor: cursor[options.type],
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
