'use strict';

export default class SettingsController {
  user = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  errors = {
    other: undefined
  };
  message = '';
  submitted = false;
  editorEnabled = false;

  teams = [{
    id: 1,
    name: 'FC Barcelona',
    rank: 1,
    ground: 'Camp Nou'
  }, {
    id: 2,
    name: 'Real Madrid C.F.',
    rank: 2,
    ground: 'Santiago Bernabeu Stadium'
  }, {
    id: 3,
    name: 'Fc Bayern Munich',
    rank: 3,
    ground: 'Allianz Arena'
  }, {
    id: 4,
    name: 'Juventus F.C.',
    rank: 4,
    ground: 'Paris Saint-Germain F.C.'
  }, {
    id: 5,
    name: 'Manchester United F.C.',
    rank: 5,
    ground: 'Old Trafford'
  }];

  /*@ngInject*/
  constructor(Auth) {
    this.Auth = Auth;
  }
  $onInit() {
    (response => {
      this.teams = response.data;
    });

  }
  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.user.oldPassword = ""
          this.user.newPassword = ""
          this.user.confirmPassword = ""
          this.message = 'Password successfully changed.';

        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }

  delete(index, data) {
    this.teams.splice(index, 1);
  }
  enableEditor(index, data) {
    (response => {
      this.editorEnabled = true;
    });
    var editableName = data;
  }
  newSquad = [{
    name: "",
    rank: "",
    ground: ""
  }]
  visible = false;
  newteam(index, data) {
    var newRow = angular.copy(data);
    this.teams.push(data)
    this.visible = false.
    this.newSquad = [{}]
  }
}
