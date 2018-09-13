boot.go();
toaster.makeMilestones();
toaster.triggerTick({
  tickName: "events",
  func: function() {
    toaster.events();
  },
  intervalAddress: "system.cycles.interval"
});
toaster.restore();
toaster.bind();
toaster.render();

// toaster.state.set({path: "toast.lifetime",value: 500000000});
// toaster.state.set({path: "toast.inventory",value: 500000000});
// toaster.render();
