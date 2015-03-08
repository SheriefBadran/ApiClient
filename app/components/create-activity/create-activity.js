'use strict';

import Api from '../../scripts/services/api.js';

class CreateActivity {
	constructor(api) {
    this.api = api;
    this.categories = [];
    this.loadCategories();
    this.showForm = false;
  }

  create (data) {

    this.api.createActivity(data, '/activities')
      .success(data => console.log(data));
  }

  loadCategories () {

    this.api.allCategories('json').then(categories => {

      this.categories = categories.data;
    });
  }

  isActive() {
    return this.showForm;
  }


  toggleFormClass () {

    this.showForm = (this.showForm) ? false : true;
    console.log(this.showForm);
  }
}

export default angular.module('createActivity', [Api.name])
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
	})
  .directive('createActivityFab', function () {
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
      link: function (scope, element, attr) {

        element.find('button').bind('click', function () {

          scope.createActivityCtrl.toggleFormClass();
        });
      },
      //bindToController: true,
      controller: CreateActivity,
      controllerAs: 'createActivityCtrl'
    };
  });
