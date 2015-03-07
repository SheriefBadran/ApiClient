'use strict';

import Api from '../../scripts/services/api.js';

class Activities {
	constructor(api) {

    this.api = api;
    this.activities = [];
    this.loadAllActivities();
  }

  loadAllActivities () {

    this.api.allActivities('json').then(activities => {

      this.activities = activities.data;
    });
  }
}

export default angular.module('activities', [Api.name])
	.directive('activities', function() {
		return {
			templateUrl: 'components/activities/activities.html',
      transclude: true,
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
			controller: Activities ,
			controllerAs: 'ctrl'
		};
	});
