'use strict';

class CreateActivity {
	constructor() {}
}

export default angular.module('createActivity', [])
	.directive('createActivity', function() {
		return {
			templateUrl: 'components/create-activity/create-activity.html',
			restrict: 'E',
			scope: {
				// Specify attributes where parents can pass and receive data here
				// Syntax name: 'FLAG'
				// FLAGS:
				// = Two way data binding
				// @ One way incoming expression (like placeholder)
				// & One way outgoing behaviour (like ng-click)
			},
			bindToController: true,
			controller: CreateActivity ,
			controllerAs: 'ctrl'
		};
	});
