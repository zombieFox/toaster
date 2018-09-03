var intro1 = function() {
  message.render({
    type: "system",
    message: ["init: "]
  });
};

var intro2 = function() {
  message.render({
    type: "system",
    message: ["TAI.dat loaded"]
  });
};

var intro3 = function() {
  message.render({
    type: "normal",
    message: ["Directive 1 = toast bread", "Directive 2 = be productive"]
  });
};

var intro4 = function() {
  message.render({
    type: "system",
    message: ["motivation.dat loaded"]
  });
};

setTimeout(intro1, 1000);
setTimeout(intro2, 2000);
setTimeout(intro3, 3000);
setTimeout(intro4, 4000);
setTimeout(toast.randomMotivation, 5000);

toast.bind();
toast.render();