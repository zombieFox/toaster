boot.go();
toaster.makeMilestones();
toaster.restore();
toaster.bind();
toaster.render();

toaster.state.set({path: "toast.lifetime",value: 50000000});
toaster.state.set({path: "toast.inventory",value: 50000000});
toaster.render();
