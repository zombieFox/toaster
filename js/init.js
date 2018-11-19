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

var c = game.get({path:"system.processor.cost.starting"}); // constant / base price
var d = game.get({path:"system.processor.cost.increase"}); // difference / price growth rate
var n = 15; // the index of the nth term
var a_n = (d * (n - 1)) + c; // the nth term
var a_1 =  (a_n - (d * (n - 1))); // the nth term
var n_x =  11;
var n_y =  15;
var a_x =  (d * (11 - 1)) + c;
var a_y =  (d * (15 - 1)) + c;

// a_n = dn + c
var arr = [];
for (var i = 1; i <= n; i++) {
  arr.push((d * (i - 1)) + c);
}
console.log("Arithmetic Sequences:");
console.log(arr);
console.log("index (n)", n, "=", (d * (n - 1)) + c);

// c = a_n - (d * n)
console.log("constant (n1) =", a_1);

// Sn = (n * (a_1 + a_n)) / 2
console.log("sum of level", n, "=", (n * (a_1 + a_n)) / 2);

// S(n_x) -> (n_y) = ( ( (n_y + 1) - n_x) * (a_x + a_y) ) / 2
console.log("sum from", n_x, "to", n_y, "=", (((n_y + 1) - n_x) * (a_x + a_y)) / 2);











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
