'use strict';

describe('Directive: activitySearch', function() {

	// load the directive's module
	beforeEach(module('activitySearch'));

	var element,
		scope;

	beforeEach(inject(function($rootScope) {
		scope = $rootScope.$new();
	}));

	it('should make hidden element visible', inject(function($compile) {
		element = angular.element('<activity-search></activity-search>');
		element = $compile(element)(scope);
		expect(element.text()).toBe('this is the activitySearch directive');
	}));
});
