'use strict';
/*jshint esnext: true */

import Activities from './components/activities/activities.js';

angular.module('activityApp', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ngMaterial',
  Activities.name])

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        template: '<activities></activities>'
      });

    $urlRouterProvider.otherwise('/');
  })
;
