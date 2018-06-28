import { Component } from '@angular/core';
import { constants } from './_helpers/constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Tour of Meetings';
    constructor(){
        constants.user_data = {
            user: localStorage.getItem('user'),
            photo: localStorage.getItem('photo'),
            token: localStorage.getItem('token'),
            id: localStorage.getItem('id'),
            db: constants.user_data.db
        };
    }
}
