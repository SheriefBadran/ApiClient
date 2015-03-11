'use strict';

import Api from '../../scripts/services/api.js';

class Activities {
	constructor(api, $timeout, $scope, $rootScope) {

    this.$scope = $scope;
    this.$timeout = $timeout;
    this.api = api;
    this.activities = [];
    this.categories = [];
    this.loadAllActivities();
    this.searchText = '';
    this.isDisabled = false;

    console.log(this.searchText);

    $rootScope.$on('createdActivity', (event, data) => { this.activities.push(data); });

  }

  loadAllActivities () {

    this.api.allActivities('json')
      .then(activities => {

        this.activities = activities.data;
      })
      .then(() => {

        this.api.allCategories('json').then(categories => {

          this.categories = categories.data;
        });
      })
  }

  search (searchText) {

    this.$timeout(() => {

      this.api.queryActivities('json', this.searchText).then(activities => { this.activities = activities.data; });
    }, 1000);
    //console.log(searchText);
  }
}

export default angular.module('activities', [Api.name])
	.directive('activities', function() {
		return {
			templateUrl: 'components/activities/activities.html',
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
