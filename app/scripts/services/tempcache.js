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

    console.log(`1. set activity as deleted`);
    this.deletedActivity = activity;
    this.isDeleted = true;
    console.log(`2. verify deleted: ${this.isDeleted}`);
  }

  isActivityDeleted() {

    let isDeleted = this.isDeleted;
    console.log(`3. isDeleted in tempcache should now be true: ${isDeleted}`);
    if (this.isDeleted) {
      this.isDeleted = false;
      this.deletedActivity = null;
    }

    console.log(`4. tempcache says and returns isDeleted: ${isDeleted}`);
    return isDeleted;
  }

  getToastPosition () {

    return Object.keys(this.toastPosition)
      .filter(pos => this.toastPosition[pos])
      .join(' ');
  }
}

export default angular.module('tempCache', [])
	.service('tempCache', Tempcache );
