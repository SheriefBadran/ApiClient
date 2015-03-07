'use strict';

describe('Component: <activity-detail>', function () {

  // load the directive's module
  beforeEach(module('activityDetail'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<activity-detail></activity-detail>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the <activity-detail> component');
  }));
});
