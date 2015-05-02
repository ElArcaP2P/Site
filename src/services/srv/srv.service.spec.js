'use strict';

xdescribe('Service :: Srv', function(){
  var service;

  beforeEach(module('elArcaP2P'));

  // instantiate service
  beforeEach(inject(function (_Srv_) {
    service = _Srv_;
  }));

  it('getCulture are defined', function () {
    //expect(typeof cultureSrv.getCulture == 'function').toBe(true);
  });

  it('getCulture return string with two chars', function () {
    //var culture = cultureSrv.getCulture()
    //expect(culture.length).toBe(2);
  });
});
