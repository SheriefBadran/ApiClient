'use strict';

import Api from '../../scripts/services/api.js';

class UpdateActivity {
	constructor(api, $stateParams, $rootScope, $mdDialog) {

    this.api = api;
    this.$stateParams = $stateParams;
    this.$rootScope = $rootScope;
    this.$mdDialog = $mdDialog;
    this.categories = [];
    this.loadCategories();
    this.loadActivity();
    this.data = {};
  }

  update (data) {

    this.api.updateActivity(data, `/activities/${this.$stateParams.id}`)
      .success(data => {

        this.$mdDialog.hide();
        // Broadcast the updated activity object to activity-detail.js to update the activity-detail view when update succeed.
        this.$rootScope.$emit('updatedActivity', data);
      });
  }

  loadActivity () {

    this.api.getActivity(this.$stateParams.id)
      .then(data => {

        data.categoryObj = data.categories[0];
        data.indoors = data.indoors ? 'true' : 'false';
        this.data = data;
      });
  }

  loadCategories () {

    this.api.allCategories('json').then(categories => {

      this.categories = categories.data;
    });
  }
}

export default angular.module('updateActivity', ['ngMessages'])
	.directive('updateActivity', function() {
		return {
			templateUrl: 'components/update-activity/update-activity.html',
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
			controller: UpdateActivity ,
			controllerAs: 'ctrl'
		};
	});
