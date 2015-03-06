'use strict';

describe('Component: <create-activity>', function () {

  // load the directive's module
  beforeEach(module('createActivity'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<create-activity></create-activity>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the <create-activity> component');
  }));
});
