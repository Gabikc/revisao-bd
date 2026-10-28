boot();

addEventListener('hashchange', function () {
  if (window.goatcounter && window.goatcounter.count) {
    window.goatcounter.count({ path: location.hash.slice(1) || '/' });
  }
});
