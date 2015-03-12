'use strict';

describe('Component: <update-activity>', function () {

  // load the directive's module
  beforeEach(module('updateActivity'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<update-activity></update-activity>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the <update-activity> component');
  }));
});
