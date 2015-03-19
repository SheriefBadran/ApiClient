'use strict';
/*jshint esnext: true */

import Activities from './components/activities/activities.js';
import Login from './components/login/login.js';
import ActivityDetail from './components/activity-detail/activity-detail.js';
import CreateActivityFab from './components/create-activity-fab/create-activity-fab.js';
import NearActivitiesButton from './components/near-activities-button/near-activities-button.js';
import NearActivities from './components/near-activities/near-activities.js';

angular.module('activityApp', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ngMaterial',
  Activities.name, Login.name, ActivityDetail.name, CreateActivityFab.name, NearActivitiesButton.name, NearActivities.name])

  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink');

    // primary color only for loginform.
    $mdThemingProvider.theme('forms')
      .primaryPalette('teal');
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/activities',
        template: '<activities></activities>'
      })
      .state('activity', {
        url: '/activites/:id',
        template: '<activity-detail id="{{id}}"><activity-detail>',
        controller: function ($scope, $stateParams) {
          $scope.id = $stateParams.id;
        }
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: '404.html'
      });

    $urlRouterProvider.otherwise('/activities');
    //$locationProvider.html5Mode(true);
  })
;
