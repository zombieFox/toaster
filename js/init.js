toaster.init();
data.init();
// milestones.init();
events.init();
tick.init();
// boot.init();

game.set({path:"toast.inventory",value:360});
game.set({path:"toast.lifetime",value:360});
game.set({path:"system.cycles.current",value:360});






// n = variable index
// a = variable value
// a_n = the nth term
// d = the common difference
// n = the index of the nth term
// c = constant

var as = function() {
  var c = game.get({path:"system.processor.cost.starting"}); // constant / base price
  var d = game.get({path:"system.processor.cost.increase"}); // difference / price growth rate
  var n = 10; // the index of the nth term
  var a_n = c + (d * (n - 1)); // the nth term
  var a_1 = a_n - (d * (n - 1)); // constant / first term / c
  var s_n = (n * (a_1 + a_n)) / 2; // sum all up to n
  var n_x = 2;
  var n_y = 8;
  var a_x = (d * (n_x - 1)) + c;
  var a_y = (d * (n_y - 1)) + c;
  var s_xy = (((n_y + 1) - n_x) * (a_x + a_y)) / 2;
  var arr = [];
  for (var i = 1; i <= n; i++) {
    arr.push(c + (d * (i - 1)));
  }
  console.log("Arithmetic Sequences:", arr);
  console.log("a_1:", a_1);
  console.log("a_" + n + ":", a_n);
  console.log("sum all:", s_n);
  console.log("sum from n_x (" + n_x + ") to n_y (" + n_y + "):", s_xy);
}

var gs = function() {
  var c = game.get({path:"system.processor.cost.starting"}); // constant / base price
  var d = game.get({path:"system.processor.cost.multiply"}); // difference / price growth rate
  // d = 1.05;
  var n = 10; // the index of the nth term
  var a_n = c * (Math.pow(d, (n - 1))); // the nth term
  var a_1 = a_n / Math.pow(d, (n - 1)); // constant / first term / c
  var s_n = (a_1 * (1 - Math.pow(d, n))) / (1 - d); // sum all up to n
  var n_x = 2;
  var n_y = 8;
  var s_xy = ((a_1 * Math.pow(d, n_x)) * (1 - Math.pow(d, (n_y + 1 - n_x))) / (1 - d)) / 2;
  var arr = [];
  for (var i = 1; i <= n; i++) {
    arr.push(c * (Math.pow(d, (i - 1))));
  }
  console.log("Geometric Sequences:", arr);
  console.log("a_1:", a_1);
  console.log("a_" + n + ":", a_n);
  console.log("sum all:", s_n);
  console.log("sum from n_x (" + n_x + ") to n_y (" + n_y + "):", s_xy);
}

as();
console.log("---");
gs();







// var i = game.get({path:"toast.inventory"}); // the amount of currency owned
// var k = game.get({path:"system.processor.power"}); // the number of generators currently owned
// var b = game.get({path:"system.processor.cost.toast"}); // the base price

// b * ((Math.pow(d, k)) - (Math.pow(d, n) - 1) / (d - 1))

// var currentAmount = game.get({path:"system.processor.power"});
// var unitsToAdd = 5;
// var increase = game.get({path:"system.processor.cost.increase"});
// // S = Starting number
// // M = How many are you going to buy
// // I = How much it increments per buy
// // (S+M-1) x (S+M)/2 x I - (S-1) x S/2 x I = Total cost
// function x() {
//   return (currentAmount + unitsToAdd - 1) * (currentAmount + unitsToAdd) / 2 * increase - (currentAmount - 1) * currentAmount / 2 * increase;
// }
// console.log(x());
