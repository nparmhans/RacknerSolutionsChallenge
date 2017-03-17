'use strict';

export default class LoginController {
  user = {
    name: '',
    email: '',
    password: '',
  };
  errors = {
    login: undefined
  };
  submitted = false;
  badLogin = false;
  message = "";
  /*@ngInject*/
  constructor(Auth, $location, $timeout) {
    this.Auth = Auth;
    this.$location = $location;
    this.$timeout = $timeout;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Logged in, redirect to home
          this.badLogin = false;
          this.$location.path('/');
        })
        .catch(err => {
          this.badLogin = true;
          this.message = "Sorry, invalid email and/or password.";

        });
    }
  }
}
