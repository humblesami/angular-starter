import { Injectable } from '@angular/core';
import { HttpHeaders} from '@angular/common/http';
import { HttpService } from './http.service'

import {map} from "rxjs/operators";
@Injectable()
export class UserService {
    constructor(private http: HttpService) { }
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    /* ####### Start Page details ####### */
    getAll(data:{}) {
        return this.http.call_post_http('ws/mp-home-json', data);
    }

    /* ####### Get Document ####### */
    getDocument(data:{}, flag:string) {
        let url:string = 'doc/home-json';

        if(flag === 'meet'){
            url = 'doc/home-json';
        }
        if(flag === 'sign'){
            url = 'doc/signature-json';
        }
        return this.http.call_post_http(url, data);
    }

    /* ####### Profile get and update ####### */
    profile = {
        get : (data: {}) => {
            return this.http.call_post_http('ws/my-profile-json', data);
        },
        // set : ( data : {}) => {
        //     return this.http.call_post_http('http://localhost:9000/wasif/api/users/', data, false);
        // }
    }

    /* ####### Get All Profile ####### */
    profiles(data: {}){
        return this.http.call_post_http('ws/profiles-json', data);
    }

    /* ####### Get All Committees Data Read Only ####### */
    getCommittees(data: {}){
        return this.http.call_post_http( 'ws/committees-json', data);
    }
}