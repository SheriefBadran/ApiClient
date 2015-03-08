'use strict';
/*jshint esnext: true */

import Activities from './components/activities/activities.js';
import CreateActivity from './components/create-activity/create-activity.js';
import Login from './components/login/login.js';
import ActivityDetail from './components/activity-detail/activity-detail.js';
//import CreateActivityFab from './components/create-activity-fab/create-activity-fab.js';

angular.module('activityApp', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ngMaterial',
  Activities.name, CreateActivity.name, Login.name, ActivityDetail.name])

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
        url: '/',
        template: '<activities><create-activity></create-activity></activities>'
      })
      .state('activity', {
        url: 'activity/:id',
        template: '<activity-detail id="{{id}}"><activity-detail>',
        controller: function ($scope, $stateParams) {

          $scope.id = $stateParams.id;
        }
      });

    $urlRouterProvider.otherwise('/');
  })
;
