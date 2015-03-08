'use strict';
import CreateActivity from '../create-activity/create-activity.js';

class CreateActivityFab {
	constructor() {}
}

export default angular.module('createActivity')
	.directive('createActivityFab', function() {
		return {
			templateUrl: 'components/create-activity-fab/create-activity-fab.html',
			restrict: 'E',
      require: '^CreateActivity',
			scope: {
				// Specify attributes where parents can pass and receive data here
				// Syntax name: 'FLAG'
				// FLAGS:
				// = Two way data binding
				// @ One way incoming expression (like placeholder)
				// & One way outgoing behaviour (like ng-click)
			},
      link: function (scope, element, attr, createActivity) {
        //console.log(createActivity);
      },
			bindToController: true,
			controller: CreateActivityFab ,
			controllerAs: 'ctrl'
		};
	});
