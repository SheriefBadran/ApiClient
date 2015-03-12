'use strict';

class ActivityDetail {
	constructor($rootScope, api) {

    this.$rootScope = $rootScope;
    this.api = api;
    this.activity = {};
    this.getActivity();

    $rootScope.$on('updatedActivity', (event, activity) => {

      this.activity = activity;
    });
  }

  getActivity () {

    // this.id is set in directive's scope id property.
    this.api.getActivity(this.id).then(activity => this.activity = activity);
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
