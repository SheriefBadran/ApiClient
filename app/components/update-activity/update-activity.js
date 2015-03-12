'use strict';

import Api from '../../scripts/services/api.js';

class UpdateActivity {
	constructor(api, $stateParams, $rootScope, $mdDialog) {

    this.api = api;
    this.$stateParams = $stateParams;
    this.$rootScope = $rootScope;
    this.$mdDialog = $mdDialog;
  }

  update (data) {

    this.api.updateActivity(data, `/activities/${this.$stateParams.id}`)
      .success(data => {

        this.$mdDialog.hide();
        this.$rootScope.$emit('updatedActivity', data);
      });
  }
}

export default angular.module('updateActivity', [])
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
