'use strict';
import CreateActivity from '../create-activity/create-activity.js';

class CreateActivityFab {
	constructor($mdDialog) {

    this.$mdDialog = $mdDialog;

  }

  showDialog ($event) {

    var parentEl = angular.element(document.body);
    this.$mdDialog.show({

      parent: parentEl,
      targetEvent: $event,
      templateUrl: "components/create-activity-fab/createform.html",
      controller: (scope, $mdDialog) => {

        //this.login('testing');
        //scope.create = (data) => {
        //
        //
        //};

        scope.closeDialog = function () {

          $mdDialog.hide();
        }
      },
      controllerAs: 'formCtrl'
    });
  }


}

export default angular.module('createActivity')
	.directive('createActivityFab', function() {
		return {
			templateUrl: 'components/create-activity-fab/create-activity-fab.html',
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
			controller: CreateActivityFab ,
			controllerAs: 'ctrl'
		};
	});
