var message = (function() {

  var typePrefix = function(type) {
    var allEyes = ["~", "-", "^", "*", "=", "x", "!", "|", "¬", "¯", "¶", "×", "÷", "•", "†", "—", "Y", "y", "P", "p", "Q", "q", "O", "o", "V", "v", "M", "m", "E", "e", "I", "i", "U", "u", "1", "6", "8", "0", "ö", "õ", "š", "ł", "ß", "æ", "ę", "ė", "ÿ", "û", "ū", "î", "ï", "į", "µ", "¢", "₹", "₪", "λ", "θ", "±", "Ξ", "+"];
    var allMouth = ["_", ".", ","];
    var allTypes = {
      success: "!!!",
      normal: ":::",
      error: "ERR",
      system: "|||"
    };
    if (type == "motivation") {
      var makeFace = function() {
        var randomEyes = allEyes[Math.round(Math.random() * (allEyes.length - 1))];
        var randomMouth = allMouth[Math.round(Math.random() * (allMouth.length - 1))];
        return randomEyes + randomMouth + randomEyes;
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
      callback: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
    if (options.index < options.text.length) {
      options.target.innerHTML = options.text.substring(0, options.index + 1) + '<span class="report-message-text-blink">#</span>';
      scrollToBottom();
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
      typeWriter({
        text: arrayItem,
        index: index,
        target: span
      });
    });
  };

  var render = function(override) {
    var options = {
      type: null,
      message: null,
      format: null
    };
    if (override) {
      options = helper.applyOptions(options, override);
    }
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
    report.appendChild(newMessage);
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
