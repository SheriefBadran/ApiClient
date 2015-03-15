'use strict';

class NearActivitiesButton {
	constructor($mdDialog) {

    this.$mdDialog = $mdDialog;
  }

  showDialog ($event) {

    var parentEl = angular.element(document.body);
    this.$mdDialog.show({

      parent: parentEl,
      targetEvent: $event,
      templateUrl: 'components/near-activities-button/map.html',
      controller: (scope, $mdDialog) => {

        scope.closeDialog = function () {

          $mdDialog.hide();
        };
      }
    });
  }
}

export default angular.module('nearActivitiesButton', [])
	.directive('nearActivitiesButton', function() {
		return {
			templateUrl: 'components/near-activities-button/near-activities-button.html',
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
			controller: NearActivitiesButton ,
			controllerAs: 'ctrl'
		};
	});
