'use strict';

import Tempcache from '../../scripts/services/tempcache.js';

class ActivityDetail {
	constructor($rootScope, api, $state, tempCache, $mdDialog) {

    this.$rootScope = $rootScope;
    this.api = api;
    this.$state = $state;
    this.tempCache = tempCache;
    this.$mdDialog = $mdDialog;
    this.activity = {};
    this.creator = localStorage.getItem('email');
    this.getActivity();

    $rootScope.$on('updatedActivity', (event, activity) => {

      this.activity = activity;
    });
  }

  getActivity () {

    // this.id is set in directive's scope id property.
    this.api.getActivity(this.id).then(activity => {

      this.$rootScope.email = activity.creator.email;
      this.activity = activity;
    })
     // Redirect to home if resource is not found.
    .catch(() => { this.$state.go('home'); });
  }

  checkAuthStatus () {

    this.creator = localStorage.getItem('email');
    return !!localStorage.getItem('token');
  }

  delete ($event) {

    let confirmDelete = this.$mdDialog.confirm()
      .title('Radera aktiviteten')
      .content('Är du säker på att du vill radera aktiviteten?')
      .ok('Ja')
      .cancel('Nej')
      .targetEvent($event);

    this.$mdDialog
      .show(confirmDelete)
      .then(() => {
          this.api.delete(`/activities/${this.id}`)
            .then(data => this.tempCache.setActivityAsDeleted(data))
            .then(() => this.$state.go('home'));
        });
  }
}

export default angular.module('activityDetail', [Tempcache.name])
	.directive('activityDetail', function() {
		return {
			templateUrl: 'components/activity-detail/activity-detail.html',
			restrict: 'E',
			scope: {
        id: '@'
			},
			bindToController: true,
			controller: ActivityDetail ,
			controllerAs: 'ctrl'
		};
	});
