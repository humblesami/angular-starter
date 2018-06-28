import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {map} from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from './../_helpers/constants';
import { Router } from '@angular/router';



@Injectable()
export class HttpService {

    private activeMeeting = new BehaviorSubject({});
    currentMessage = this.activeMeeting.asObservable();

    constructor(private http: HttpClient, private router: Router) {
        
    }

    call_post_http(url:string, input_data:any)
    {
        this.before_party(input_data);
        let http_service = this;
        return this.http.post(constants.base_url + url, input_data).pipe(map((res:any) => {
            return http_service.after_pary(res);
        }));
    }

    call_get_http(url:string, input_data:any)
    {
        this.before_party(input_data);
        let http_service = this;
        return this.http.get(constants.base_url + url, input_data).pipe(map((res:any) => {
            return http_service.after_pary(res);
        }));
    }

    before_party(input_data)
    {
        let authdata = constants.user_data;
        input_data['token'] = authdata['token'];
        if(!input_data['db'])
            input_data['db'] = authdata['db'];
        //console.log(input_data);
        localStorage.clear();
    }

    after_pary(res)
    {
        if(res && res.result)
        {
            res = res.result;
            if(res.error && res.error == "Not authorized")
            {
                this.router.navigate(['/login']);
            }
        }
        //console.log(res);
        if(res.data && res.data.token)
        {
            this.set_cookies(res.data);
        }
        else
        {
            this.setCookiesFromGlobalAuthData();
        }                        
        return res;
    }

    set_cookies(data)
    {
        localStorage.setItem('db', data.db);
        localStorage.setItem('id', data.id);
        localStorage.setItem('user', data.name);
        localStorage.setItem('photo', data.photo);
        localStorage.setItem('token', data.token);
        constants.user_data = {
            user: data.name,
            photo: data.photo,
            token: data.token,
            id: data.id,
            db: constants.user_data.db
        };
    }

    setCookiesFromGlobalAuthData()
    {
        let auth_data = constants.user_data;
        localStorage.setItem('token', auth_data.token);
        localStorage.setItem('user', auth_data.user);
        localStorage.setItem('db', auth_data.db);
        localStorage.setItem('photo', auth_data.photo);
        localStorage.setItem('id', auth_data.id);
    }
}