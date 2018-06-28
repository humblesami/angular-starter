import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { constants } from '../_helpers/constants';
import { HttpService } from './http.service';


@Injectable()
export class AuthenticationService {
    constructor(private http : HttpService) { }

    login(username: string, password: string) {
        return this.http.call_post_http('ws/authenticate-json', { login:username, password:password}, function (res:any) {
            //console.log('Login Response ::::: ', res);
            // login successful if there's a jwt token in the response
            if (res && res.result.data.token) {
                let waste = res.result.data;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('db', waste.db);
                localStorage.setItem('id', waste.id);
                localStorage.setItem('user', waste.name);
                localStorage.setItem('photo', waste.photo);
                localStorage.setItem('currentUser', waste.token);
                localStorage.setItem('token', waste.token);

                constants.globalData = {
                    user: waste.name.toString(),
                    photo: waste.photo.toString(),
                    token: waste.token.toString(),
                    id: waste.id.toString(),
                    db: waste.db
                };
            }
        })
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

}