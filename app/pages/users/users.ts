import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { User } from '../../models/user';
import {GithubUsers} from '../../providers/github-users/github-users';
import {UserDetailsPage} from '../user-details/user-details';

@Component({
    templateUrl: 'build/pages/users/users.html',
    providers: [GithubUsers]
})
export class UsersPage {
    users: User[];
    constructor(private nav: NavController, private gitHubUsers: GithubUsers) {
        gitHubUsers.load()
            .then(users => this.users = users);

        gitHubUsers.searchUsers('ganga')
            .then(users => console.log(users));
    }

    //Search User
    search(searchTerm) {
        let term = searchTerm.target.value;

        if (term.trim() == '' || term.trim().length < 3) {
            this.gitHubUsers
                .load()
                .then(users => this);
        }
        else {
            this.gitHubUsers
                .searchUsers(term.trim())
                .then(users => this.users = users);
        }
    }

    goToDetails(event, login) {
        this.nav.push(UserDetailsPage, {
            login: login
        });
    }

}
