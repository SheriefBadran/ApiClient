'use strict';

describe('Component: <activities>', function () {

  // load the directive's module
  beforeEach(module('activities'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<activities></activities>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the <activities> component');
  }));
});
