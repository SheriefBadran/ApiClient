'use strict';

import Api from '../../scripts/services/api.js';

class CreateActivity {
	constructor($rootScope, api) {
    this.api = api;
    this.$rootScope = $rootScope;
    this.categories = [];
    this.loadCategories();
    this.showForm = false;
  }

  create (data) {

    this.api.createActivity(data, '/activities')
      .success(data => {

        this.$rootScope.$emit('createdActivity', data);
      });
  }

  loadCategories () {

    this.api.allCategories('json').then(categories => {

      this.categories = categories.data;
    });
  }

  isActive() {
    return this.showForm;
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
	});
