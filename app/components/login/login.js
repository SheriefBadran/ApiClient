'use strict';

import Api from '../../scripts/services/api.js';

class Login {
	constructor($mdDialog, api) {

    this.api = api;
    this.test = "constructor test";
    this.$mdDialog = $mdDialog;
    this.isLoggedIn = !!localStorage.getItem('token');
    console.log('ctrl running');
    console.log(this.isLoggedIn);
  }

  login (loginData) {

    return this.api.loginUser(loginData)
      .then((data) => {

        this.isLoggedIn = true;
        console.log('You successfully logged in.')
      });
  };

  logout () {

    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }

  checkAuthStatus (e) {

      this.isLoggedIn ? this.logout() : this.showDialog(e);
  };

  showDialog ($event) {

    var parentEl = angular.element(document.body);
    this.$mdDialog.show({

      parent: parentEl,
      targetEvent: $event,
      templateUrl: "components/login/loginform.html",
      controller: (scope, $mdDialog) => {

        //this.login('testing');
        scope.loginUser = (loginData) => {

          this.login(loginData).then(scope.closeDialog);
        };

        scope.closeDialog = function () {

          $mdDialog.hide();
        }
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
