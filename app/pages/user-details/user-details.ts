import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Import GithubUsers Provider
import {GithubUsers} from '../../providers/github-users/github-users';

// Import the User model
import {User} from '../../models/user';

@Component({
  templateUrl: 'build/pages/user-details/user-details.html',
  providers: [GithubUsers]
})
export class UserDetailsPage {
  user: User = new User;
  login: string;

  constructor(private nav: NavController, navParams: NavParams, githubUsers: GithubUsers) {
    this.login=navParams.get("login");

    githubUsers.loadDetails(this.login)
      .then(user => this.user = user);
  }

}
