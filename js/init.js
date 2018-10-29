toaster.init();
data.init();
milestones.init();
events.init();
tick.init();
// boot.init();

game.set({path:"toast.inventory",value:440});
game.set({path:"toast.lifetime",value:440});
game.set({path:"system.cycles.current",value:440});

// 1 -> 0
// 2 -> 8
// 3 -> 16
// 4 -> 24
// 5 -> 32
// total cost  = 80


// var n = 4; // the number of generators to buy
// var b = game.get({path:"system.processor.cost.starting"}); // the base price
// var r = game.get({path:"system.processor.cost.increase"}); // the price growth rate exponent
// var k = game.get({path:"system.processor.power"}); // the number of generators currently owned
// var c = game.get({path:"toast.inventory"}); // the amount of currency owned
//
// console.log(b);
// console.log(
//   b * (Math.pow(r, k) * (Math.pow(r, n) - 1) / (r - 1))
// );

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
