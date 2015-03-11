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

  queryActivities (mediaType, query) {

    if (query) {
      //json?search=true&query=gäst
      return this.get(`/activities.${mediaType}?search=true&query=${query}`);
    }
    else {

      return this.get(`/activities.${mediaType}`);
    }

  }

  getActivity (id) {

    return this.get(`/activities/${id}`).then(({data}) => data);
  }

  allCategories (mediaType) {

    return this.get(`/categories.${mediaType}`);
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

  createActivity (data, path) {

    var request = {
      url: `${this.url}${path}`,
      method: 'POST',
      data: {
        name: data.name,
        description: data.description,
        address: data.address,
        indoors: data.indoors,
        category_id: data.categoryObj.id
      },
      headers: {
        Accept: 'application/json',
        Authorization: 'Token token=5deb6c00-bd56-478d-bf87-cbfe8ae15a50',
        token: localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    };

    return this.$http(request);
  }

}

export default angular.module('api', [])
	.service('api', Api );
