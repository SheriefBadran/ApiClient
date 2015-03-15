'use strict';

describe('Component: <near-activities-fab>', function () {

  // load the directive's module
  beforeEach(module('nearActivitiesFab'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<near-activities-fab></near-activities-fab>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the <near-activities-fab> component');
  }));
});
