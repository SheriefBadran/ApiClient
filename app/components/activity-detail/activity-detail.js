'use strict';

class ActivityDetail {
	constructor($rootScope, api, $state) {

    this.$rootScope = $rootScope;
    this.api = api;
    this.$state = $state;
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
    });
  }

  checkAuthStatus () {

    this.creator = localStorage.getItem('email');
    return !!localStorage.getItem('token');
  }

  delete() {

    this.api.delete(`/activities/${this.id}`).then(data => console.log(data));
    this.$state.go('home');
  }
}

export default angular.module('activityDetail', [])
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
