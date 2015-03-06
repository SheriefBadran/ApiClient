'use strict';
/*jshint esnext: true */

import Activities from './components/activities/activities.js';
import Login from './components/login/login.js'

angular.module('activityApp', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ngMaterial',
  Activities.name])

  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink');

    // primary color only for loginform.
    $mdThemingProvider.theme('loginForm')
      .primaryPalette('teal');

  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        template: '<activities></activities>'
      });

    $urlRouterProvider.otherwise('/');
  })
;
