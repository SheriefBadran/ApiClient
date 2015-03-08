'use strict';

describe('Component: <create-activity-fab>', function () {

  // load the directive's module
  beforeEach(module('createActivityFab'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<create-activity-fab></create-activity-fab>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the <create-activity-fab> component');
  }));
});
