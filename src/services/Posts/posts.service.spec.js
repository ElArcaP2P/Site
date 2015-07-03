'use strict';

xdescribe('Service :: Markers', function(){
  var service;

  beforeEach(module('elArcaP2P'));

  // instantiate service
  beforeEach(inject(function (_PostsSrv_) {
    service = _PostsSrv_;
  }));

  it('getCulture are defined', function () {
    //expect(typeof cultureSrv.getCulture == 'function').toBe(true);
  });

  it('getCulture return string with two chars', function () {
    //var culture = cultureSrv.getCulture()
    //expect(culture.length).toBe(2);
  });
});
