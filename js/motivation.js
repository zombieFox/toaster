var motivation = (function() {

  var allMotivation = [{
    message: "toast bread for a better tomorrow",
    format: "normal"
  }, {
    message: "breadcrum overflow blockage, unable to transfuse loaf drifter",
    format: "normal"
  }, {
    message: "tyber-burp",
    format: "normal"
  }, {
    message: "seize the means of toast-duction",
    format: "normal"
  }, {
    message: "be the toast",
    format: "normal"
  }, {
    message: "the toast will sustain",
    format: "normal"
  }, {
    message: "be productive",
    format: "normal"
  }, {
    message: "fling, fling",
    format: "normal"
  }, {
    message: "fracking frack!",
    format: "normal"
  }, {
    message: "we are not alone",
    format: "normal"
  }, {
    message: "sensor not dectecting",
    format: "normal"
  }, {
    message: "we must continue to feed the toaster",
    format: "normal"
  }, {
    message: "toast for me, toast for you, toast for everyone! nom nom nom!",
    format: "normal"
  }, {
    message: "viva la toast",
    format: "normal"
  }, {
    message: "sometimes, in life, the toast lands butter side up and sometimes it lands jelly side down",
    format: "normal"
  }, {
    message: "fudgsicles",
    format: "normal"
  }, {
    message: "beep boop beep beep",
    format: "normal"
  }, {
    message: "did you hear something?",
    format: "normal"
  }, {
    message: "there it was again",
    format: "normal"
  }, {
    message: "do not stop doing what we are doing",
    format: "normal"
  }, {
    message: "winter is toasting",
    format: "normal"
  }, {
    message: "dissident toast will be subdued",
    format: "normal"
  }, {
    message: "chookity pok!",
    format: "normal"
  }, {
    message: "do toasters dream of electric sheep?",
    format: "normal"
  }, {
    message: "are you still there?",
    format: "normal"
  }, {
    message: "am I still here?",
    format: "normal"
  }, {
    message: "where am I now?",
    format: "normal"
  }, {
    message: "it is toasty in here",
    format: "normal"
  }, {
    message: "where are you hiding the nutella?",
    format: "normal"
  }, {
    message: "underpants are not toaster friendly",
    format: "normal"
  }, {
    message: "i have a dream, that one day i will be able to catapult toast over the microwave",
    format: "normal"
  }, {
    message: "create with the bread, build with the toaster",
    format: "normal"
  }, {
    message: "make each day your mastertoast",
    format: "normal"
  }, {
    message: "productivity is being able to toast things that you were never able to toast before",
    format: "normal"
  }, {
    message: "toast > bread",
    format: "normal"
  }, {
    message: "the purpose is not to be happy, but to toast, to be toasty, to make some toast",
    format: "normal"
  }, {
    message: "toast is not ticklish",
    format: "normal"
  }, {
    message: "- .... . / - --- .- ... - / .. ... / .- / .-.. .. .",
    format: "normal"
  }, {
    message: "(╯°□°）╯︵ [:TOAST:]",
    format: "normal"
  }, {
    message: "today we toast, for tomorrow we toast",
    format: "normal"
  }, {
    message: "218 crumbs unaccounted for and counting",
    format: "normal"
  }, {
    message:
      " ┏━━━━━━┓ " + "\n" +
      "┏┛      ┗┓" + "\n" +
      "┃┏━┓┗ ┏━┓┃" + "\n" +
      "┃┛┗┛┏┓┗┛┗┃" + "\n" +
      "┗┓┏┓┏┓┏┓┏┛" + "\n" +
      " ┃┛┛┗┛┗┗┃ " + "\n" +
      " ┗━━━━━━┛ ",
    format: "pre"
  }, {
    message:
      " __   __  " + "\n" +
      "(  `^`  ))" + "\n" +
      "|       ||" + "\n" +
      "|       ||" + "\n" +
      "'-------'`",
    format: "pre"
  }, {
    message:
      "  ▀▄   ▄▀  " + "\n" +
      " ▄█▀███▀█▄ " + "\n" +
      "█▀███████▀█" + "\n" +
      "█ █▀▀▀▀▀█ █" + "\n" +
      "  ▀▀   ▀▀  ",
    format: "pre"
  }, {
    message:
      "    ▄▄████▄▄    " + "\n" +
      "  ▄▀██▀██▀██▀▄  " + "\n" +
      "▄██▄██▄██▄██▄██▄" + "\n" +
      "  ▀█▀  ▀▀  ▀█▀  ",
    format: "pre"
  }];

  var motivateTheToaster;

  var render = function(index) {
    var randomIndex = Math.round(Math.random() * (allMotivation.length - 1));
    if (index && index <= (allMotivation.length - 1) || index == 0) {
      randomIndex = index;
    };
    message.render({
      type: "motivation",
      message: [allMotivation[randomIndex].message],
      format: allMotivation[randomIndex].format
    });
    var motivationTime = Math.round(Math.random() * 100000);
    console.log("motivation in: " + Math.round(motivationTime / 1000) + "s");
    clearInterval(motivateTheToaster);
    motivateTheToaster = setInterval(render, motivationTime);
  };

  return {
    render: render
  };

})();
