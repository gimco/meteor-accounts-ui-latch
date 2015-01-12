
injectTemplate = function  (before, original, after) {
  var _origRenderFunction = Template[original].renderFunction;
  Template[original].renderFunction = (function() {
    var view = this;
    return Array.prototype.concat(
      before ? Spacebars.include(view.lookupTemplate(before)) : [],
      _origRenderFunction.apply(view),
      after ? Spacebars.include(view.lookupTemplate(after)) : []);
  });
}

