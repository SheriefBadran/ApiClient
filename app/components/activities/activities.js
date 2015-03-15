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

      //console.log(`category: ${category}`);
      //console.log(`prevCategory: ${prevCategory}`);
      if (!category && !prevCategory) {

        //console.log('init');
        return undefined;
      }
      else if (!category) {

        //console.log('watcher reset category filter.');
        this.tempCache.resetCategoryFiltering();
      }
      else {

        //console.log('watcher is saving category filter in api.');
        this.tempCache.saveCategoryFiltering(category);
      }


    });
  }

  getCategoryFilter () {

    let category = this.tempCache.getCategoryFilter();

    if (category) {

      //console.log('getCategoryFilter returns a category.');
      return this.tempCache.getCategoryFilter().category;
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
      console.log(query);
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

    //console.log(`5. isActivityDeleted() from showToast: ${this.tempCache.isActivityDeleted()}`);
    if (!this.tempCache.isActivityDeleted())
      return;

    this.$mdToast.show({
      controller: (scope, $mdToast) => {

        scope.closeToast = function () {

          $mdToast.hide();
        }
      },
      templateUrl: 'components/activities/delete-toast.html',
      hideDelay: 6000,
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
