control.init();
toaster.init();
data.init();
milestones.init();
events.init();
tick.init();
boot.init();

// state.set({path:"toast.inventory",value:40400});
// state.set({path:"toast.lifetime",value:40400});
// state.set({path:"system.cycles.current",value:40400});

// n = index of term
// a = term
// a_n = nth term
// d = the difference between two terms
// n = the index of the nth term
// c = constant - if the difference between each term is equal
var as = function() {
  var l = 3 // current level
  var m = 80; // money
  var c = state.get({path:"system.processor.cost.starting"}); // constant / base price
  var d = state.get({path:"system.processor.cost.increase"}); // difference / price growth rate
  var n = 10; // the index of the nth term
  var a_n = c + (d * (n - 1)); // the nth term
  var a_1 = a_n - (d * (n - 1)); // constant / first term / c
  var s_n = (n * (a_1 + a_n)) / 2; // sum all up to n
  var n_x = 1; // starting point to calculate from
  var n_y = 10; // end point to calculate to
  var a_x = c + (d * (n_x - 1)); // value of nx
  var a_y = c + (d * (n_y - 1)); // value of ny
  var s_xy = (((n_y + 1) - n_x) * (a_x + a_y)) / 2; // sum from ax to ay
  var arr_n = [];
  var arr_s = [];
  var level = [];
  for (var i = 1; i <= n; i++) {
    arr_n.push(c + (d * (i - 1)));
  }
  for (var i = 1; i <= n; i++) {
    arr_s.push(((((arr_s.length + 1) + 1) - n_x) * ((c + (d * (n_x - 1))) + (c + (d * ((arr_s.length + 1) - 1))))) / 2);
  }
  for (var i = 1; i <= n; i++) {
    level.push(i);
  }
  console.log("Arithmetic Sequences:    ", arr_n);
  console.log("Arithmetic Sum per level:", arr_s);
  console.log("Arithmetic Sum per level:", level);
  console.log("money", m);
  console.log("a_1:", a_1);
  console.log("a_" + n + ":", a_n);
  console.log("sum all:", s_n);
  console.log("sum from n_x (" + n_x + ") to n_y (" + n_y + "):", s_xy);
  console.log("level:", l);

  function buyMax(m, l, a_1, d) {
    var cost_bought = a_1 * l + (l * (l + 1)) / 2 * d;
    var cost_max = cost_bought + m;
    // solving the formula for cost_bought for n instead
    var amount_max = Math.floor(-(-Math.sqrt(8 * cost_max * d + 4 * a_1 * a_1 + 4 * a_1 * d + d * d) + 2 * a_1 + d) / (2 * d));
    var amount_buyable = amount_max - l;
    console.log("- cost_bought", cost_bought);
    console.log("- cost_max", cost_max);
    console.log("- amount_max", amount_max);
    console.log("- amount_buyable", amount_buyable);
    // return amount_buyable
  }
  buyMax(m, l, a_1, d);

}

var gs = function() {
  var c = state.get({path:"system.processor.cost.starting"}); // constant / base price
  var d = state.get({path:"system.processor.cost.multiply"}); // difference / price growth rate
  // d = 1.05;
  var n = 10; // the index of the nth term
  var a_n = c * (Math.pow(d, (n - 1))); // the nth term
  var a_1 = a_n / Math.pow(d, (n - 1)); // constant / first term / c
  var s_n = (a_1 * (1 - Math.pow(d, n))) / (1 - d); // sum all up to n
  var n_x = 1; // starting point to calculate from
  var n_y = 10; // end point to calculate to
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
console.log("------------------------------------------------------------------");

// var i = state.get({path:"toast.inventory"}); // the amount of currency owned
// var k = state.get({path:"system.processor.power"}); // the number of generators currently owned
// var b = state.get({path:"system.processor.cost.toast"}); // the base price

// b * ((Math.pow(d, k)) - (Math.pow(d, n) - 1) / (d - 1))

// var currentAmount = state.get({path:"system.processor.power"});
// var unitsToAdd = 5;
// var increase = state.get({path:"system.processor.cost.increase"});
// // S = Starting number
// // M = How many are you going to buy
// // I = How much it increments per buy
// // (S+M-1) x (S+M)/2 x I - (S-1) x S/2 x I = Total cost
// function x() {
//   return (currentAmount + unitsToAdd - 1) * (currentAmount + unitsToAdd) / 2 * increase - (currentAmount - 1) * currentAmount / 2 * increase;
// }
// console.log(x());
