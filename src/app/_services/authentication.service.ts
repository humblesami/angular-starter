import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { constants } from './../_helpers/constants';


@Injectable()
export class AuthenticationService {
    constructor(private http : HttpService) { }

    login(username: string, password: string) {
        let auth_service = this;
        let data = { login:username, password:password, db:constants.user_data.db};
        return this.http.call_post_http('ws/authenticate-json', data);
    }    

    logout() {
        localStorage.clear();
    }
}