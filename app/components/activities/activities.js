'use strict';

import Api from '../../scripts/services/api.js';
import Tempcache from '../../scripts/services/tempcache.js';

class Activities {
	constructor(api, tempCache, $timeout, $rootScope, $scope, $mdToast) {

    this.api = api;
    this.tempCache = tempCache;
    this.$timeout = $timeout;
    this.$mdToast = $mdToast;
    this.activities = [];
    this.categories = [];
    this.searchText = '';
    this.$scope = $scope;
    this.all = '';
    this.loadAllActivities();
    this.showToast();

    $rootScope.$on('createdActivity', (event, createdActivity) => { this.activities.unshift(createdActivity); });

    $scope.$watch('data.categoryObj', (category, prevCategory) => {

      if (!category && !prevCategory) {

        return undefined;
      }
      else if (!category && prevCategory) {

        this.tempCache.resetCategoryFiltering();
      }
      else {

        this.tempCache.saveCategoryFiltering(category);
      }

    });
  }

  getCategoryFilter () {

    let categoryObj = this.tempCache.getCategoryFilter();

    if (categoryObj) {

      return categoryObj.category;
    }
    else {

      return undefined;
    }
  }

  loadAllActivities () {

    this.api.allActivities('json')
      .then(activities => {

        this.activities = activities.data;
      })
      .then(() => {

        this.api.allCategories('json').then(categories => {

          this.categories = categories.data;
        });
      });
  }

  cacheQuery (query) {

    this.$timeout(() => {

      this.tempCache.cacheQuery(query);
    }, 100);
  }

  getCachedQuery () {

    return this.tempCache.getCachedQuery();
  }

  resetQueryCache () {

    this.tempCache.resetQueryCache();
    return '';
  }

  getToastPosition () {

    return this.tempCache.getToastPosition();
  }

  showToast () {

    if (!this.tempCache.isActivityDeleted())
      return;

    this.$mdToast.show({
      controller: (scope, $mdToast) => {

        scope.deletedActivity = this.tempCache.getDeletedActivity();
        scope.closeToast = function () {

          $mdToast.hide();
        }
      },
      templateUrl: 'components/activities/delete-toast.html',
      hideDelay: 10000,
      position: this.getToastPosition()
    });
  }

}

export default angular.module('activities', [Api.name, Tempcache.name])
	.directive('activities', function() {
		return {
			templateUrl: 'components/activities/activities.html',
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
			controller: Activities ,
			controllerAs: 'ctrl'
		};
	});
