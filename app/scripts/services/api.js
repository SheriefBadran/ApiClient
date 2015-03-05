'use strict';

class Api {
	constructor($http) {

    this.$http = $http;
    this.url = 'http://localhost:3000';
  }

  // ** GET methods **
  get (path) {

    var request = {
      method: 'GET',
      url: `${this.url}${path}`,
      headers: {
        Accept: 'application/json',
        Authorization: 'Token token=5deb6c00-bd56-478d-bf87-cbfe8ae15a50',
        'Content-Type': 'application/json'
      }
    };

    return this.$http(request)
      .then(data => data);
  }



  allActivities (mediaType) {

    return this.get(`/activities.${mediaType}`);
  }

  // **POST methods**
  // POST method for login.
  authenticate (loginData) {

    var request = {
      url: "http://localhost:3000/auth",
      method: 'POST',
      data: {
        email: loginData.email,
        password: loginData.password
      },
      headers: {
        Accept: 'application/json',
        Authorization: 'Token token=5deb6c00-bd56-478d-bf87-cbfe8ae15a50',
        'Content-Type': 'application/json'
      }
    };

    return this.$http(request);
  }

  loginUser (loginData) {

    //localStorage.setItem('token', JSON.stringify(token))
    return this.authenticate(loginData).success(({auth_token}) => {

      localStorage.setItem('token', auth_token);
    });
  }

}

export default angular.module('api', [])
	.service('api', Api );
