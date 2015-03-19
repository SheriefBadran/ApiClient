'use strict';

import Api from '../../scripts/services/api.js';

class CreateActivity {
	constructor($mdDialog, $rootScope, api) {
    this.$mdDialog = $mdDialog;
    this.api = api;
    this.$rootScope = $rootScope;
    this.categories = [];
    this.loadCategories();
    this.showForm = false;
    this.createForm = {};
    this.data = {};
    this.updateForm = {};
  }

  create (data) {

    if (!this.createForm.$valid) return;


    this.api.createActivity(data, '/activities')
      .success(data => {

        this.$mdDialog.hide();
        // Broadcast the created activity object to activities.js to add the new activity to list-view when create succeed.
        this.$rootScope.$emit('createdActivity', data);
      });
  }

  loadCategories () {

    this.api.allCategories('json').then(categories => {

      this.categories = categories.data;
    });
  }

  //getActivityToUpdate () {
  //
  //  this.api.getActivity(this.id).then(activity => {
  //    this.data.name = activity.name;
  //    this.data.description = activity.description;
  //    this.data.indoors = activity.indoors;
  //  });
  //}

  isActive() {
    return this.showForm;
  }
}

export default angular.module('createActivity', [Api.name, 'ngMessages'])
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
