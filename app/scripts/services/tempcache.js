'use strict';

class Tempcache {
	constructor() {

    this.categoryFiltering = '';
    this.queryFilter = '';

    this.toastPosition = {
      bottom: false,
      top: true,
      left: false,
      tight: true
    };

    this.deletedActivity = null;
    this.isDeleted = false;
  }

  saveCategoryFiltering (category) {

    this.categoryFiltering = category;
  }

  getCategoryFilter () {

    return this.categoryFiltering;
  }

  resetCategoryFiltering () {

    this.categoryFiltering = null;
  }

  cacheQuery (query) {

    this.queryFilter = query;
  }

  getCachedQuery () {

    return this.queryFilter;
  }

  setActivityAsDeleted (activity) {

    this.deletedActivity = activity;
    this.isDeleted = true;
  }

  isActivityDeleted() {

    let isDeleted = this.isDeleted;

    if (this.isDeleted)
      this.isDeleted = false;

    return isDeleted;
  }

  getDeletedActivity() {

    let activity = this.deletedActivity;
    this.deletedActivity = null;

    return activity;
  }

  getToastPosition () {

    return Object.keys(this.toastPosition)
      .filter(pos => this.toastPosition[pos])
      .join(' ');
  }
}

export default angular.module('tempCache', [])
	.service('tempCache', Tempcache );
