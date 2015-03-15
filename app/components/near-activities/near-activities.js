'use strict';

class NearActivities {
	constructor($scope, $timeout, $window, api) {

    this.$scope = $scope;
    this.$timeout = $timeout;
    this.$window = $window;
    this.api = api;
    this.map = {
      center: {
        latitude: 56,
        longitude: 16
      },
      zoom: 7
    };
    this.options = {
      label: {
        title: 'test'
      }
    };
    this.nearActivities = [];

    $scope.$watch('ctrl.radius', (newRadius) => {

      newRadius = newRadius || 2;
      this.$timeout(() => {

        $window.navigator.geolocation.getCurrentPosition(pos => {

          this.api.nearActivities('json', newRadius, pos.coords).then(nearActivities => { this.nearActivities = nearActivities; });
        });
      }, 300);
    });
  }
}

export default angular.module('nearActivities', ['uiGmapgoogle-maps'])
	.directive('nearActivities', function() {
		return {
			templateUrl: 'components/near-activities/near-activities.html',
			restrict: 'E',
			scope: {
				// Specify attributes where parents can pass and receive data here
				// Syntax name: 'FLAG'
				// FLAGS:
				// = Two way data binding
				// @ One way incoming expression (like placeholder)
				// & One way outgoing behaviour (like ng-click)
        radius: '='
			},
			bindToController: true,
			controller: NearActivities ,
			controllerAs: 'ctrl'
		};
	});
