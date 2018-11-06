toaster.init();
data.init();
// milestones.init();
events.init();
tick.init();
// boot.init();

game.set({path:"toast.inventory",value:360});
game.set({path:"toast.lifetime",value:360});
game.set({path:"system.cycles.current",value:360});

// level 1, cost for next 0
// level 2, cost for next 8
// level 3, cost for next 16
// level 4, cost for next 24
// level 5, cost for next 32
// level 6, cost for next 40
// level 7, cost for next 48
// level 8, cost for next 56
// level 9, cost for next 64
// level 10, cost for next 72

// var i = game.get({path:"toast.inventory"}); // the amount of currency owned
// var k = game.get({path:"system.processor.power"}); // the number of generators currently owned
// var b = game.get({path:"system.processor.cost.toast"}); // the base price

// a_n = the nth term
// d = the common difference
// n = the index of the nth term
// c = constant

var n = 10; // the index of the nth term
var c = game.get({path:"system.processor.cost.starting"}); // constant / base price
var d = game.get({path:"system.processor.cost.increase"}); // difference / price growth rate
var a_n = (d * (n - 1)) + c; // the nth term

// a_n = dn + c
// get the value of a given index in arithmetic sequences
var arr = [];
for (var i = 1; i < n; i++) {
  arr.push((d * (i - 1)) + c);
}
console.log(arr);

// c = a_n - (d * n)
// get the constant in an arithmetic sequences
console.log("constant = ", a_n - (d * n));

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
