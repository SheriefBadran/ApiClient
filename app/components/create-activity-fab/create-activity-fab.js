'use strict';
import CreateActivity from '../create-activity/create-activity.js';
import UpdateActivity from '../update-activity/update-activity.js';

class CreateActivityFab {
	constructor(api, $mdDialog, $stateParams, $rootScope) {

    this.api = api;
    this.$mdDialog = $mdDialog;
    this.$stateParams = $stateParams;
    this.$rootScope = $rootScope;
    this.creator = {};
  }

  checkCreator () {

    if (this.$stateParams.id) {

      return this.$rootScope.email === localStorage.getItem('email');
    }
    else {

      return true;
    }
  }

  checkAuthStatus () {

    return !!localStorage.getItem('token');
  }

  isDetailed () {

    return this.$stateParams.id;
  }

  getIcon () {

    let icon = {};
    if (this.$stateParams.id) {

      icon.category = 'editor';
      icon.name = 'mode_edit';
    }
    else {

      icon.category = 'content';
      icon.name = 'add';
    }

    return icon;
  }

  showCreateDialog ($event) {

    var parentEl = angular.element(document.body);
    this.$mdDialog.show({

      parent: parentEl,
      targetEvent: $event,
      templateUrl: 'components/create-activity-fab/createform.html',
      controller: (scope, $mdDialog) => {
        
        scope.closeDialog = function () {

          $mdDialog.hide();
        };
      },
      controllerAs: 'createFormCtrl'
    });
  }

  showUpdateDialog ($event) {

    var parentEl = angular.element(document.body);
    this.$mdDialog.show({

      parent: parentEl,
      targetEvent: $event,
      templateUrl: 'components/create-activity-fab/updateform.html',
      controllerAs: 'updateFormCtrl'
    });
  }

}

export default angular.module('createActivityFab', [CreateActivity.name, UpdateActivity.name])
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
			controller: CreateActivityFab,
			controllerAs: 'ctrl'
		};
	});
