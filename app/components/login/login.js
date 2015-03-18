'use strict';

import Api from '../../scripts/services/api.js';

class Login {
	constructor($mdDialog, api) {

    this.api = api;
    this.$mdDialog = $mdDialog;
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  login (loginData) {

    return this.api.loginUser(loginData)
      .error((data, status) => {if (status === 401) throw false;})
      .then((data) => {

        this.isLoggedIn = true;
        localStorage.setItem('email', loginData.email);
        console.log('You successfully logged in.');
      })
  }

  logout () {

    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.isLoggedIn = false;
  }

  checkAuthStatus (e) {

      this.isLoggedIn ? this.logout() : this.showDialog(e);
  }

  showDialog ($event) {

    var parentEl = angular.element(document.body);
    this.$mdDialog.show({

      parent: parentEl,
      targetEvent: $event,
      templateUrl: 'components/login/loginform.html',
      controller: (scope, $mdDialog) => {

        scope.loginFailed = false;
        scope.loginUser = (loginData) => {

          this.login(loginData)
            .then(scope.closeDialog)
            .catch(() => scope.loginFailed = true);
        };

        scope.closeDialog = function () {

          $mdDialog.hide();
        };
      },
      controllerAs: 'formCtrl'
    });

  }
}

export default angular.module('login', [Api.name])
	.directive('login', function() {
		return {
			templateUrl: 'components/login/login.html',
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
			controller: Login ,
			controllerAs: 'ctrl'
		};
	});
