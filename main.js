boot();

// cada troca de módulo conta como uma visualização no contador
addEventListener('hashchange', function () {
  if (window.goatcounter && window.goatcounter.count) {
    window.goatcounter.count({ path: location.hash.slice(1) || '/' });
  }
});
