'use strict';

describe('Service: tempCache', function () {

  // load the service's module
  beforeEach(module('tempCache'));

  // instantiate service
  var tempCache;
  beforeEach(inject(function (_tempCache_) {
    tempCache = _tempCache_;
  }));

  it('should do something', function () {
    expect(!!tempCache).toBe(true);
  });

});
