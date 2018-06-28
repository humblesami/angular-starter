import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {map} from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from './../_helpers/constants';



@Injectable()
export class HttpService {

    private activeMeeting = new BehaviorSubject({});
    currentMessage = this.activeMeeting.asObservable();

    constructor(private http: HttpClient) {
    }

    call_post_http(url:string, input_data:any, cb:any)
    {
        let globalData = constants.globalData;
        input_data['token'] = globalData['token'];
        input_data['db'] = globalData['db'];
        localStorage.clear();

        return this.http.post(constants.base_url + url, input_data)
            .pipe(map((res:any) => {
                localStorage.setItem('token', globalData.token);
                localStorage.setItem('user', globalData.user);
                localStorage.setItem('db', globalData.db);
                localStorage.setItem('photo', globalData.photo);
                localStorage.setItem('id', globalData.id);
                localStorage.setItem('currentUser', globalData.token);
                if(cb) {
                    cb(res)
                }
                else{
                    return res;
                }
            }));
    }

    call_get_http(url:string, input_data:any, cb:any)
    {
        let globalData =constants.globalData;
        input_data['token'] = globalData['token'];
        input_data['db'] = globalData['db'];
        localStorage.clear();
        return this.http.get(constants.base_url + url, input_data)
            .pipe(map((res:any) => {
                localStorage.setItem('token', globalData.token);
                localStorage.setItem('user', globalData.user);
                localStorage.setItem('db', globalData.db);
                localStorage.setItem('photo', globalData.photo);
                localStorage.setItem('id', globalData.id);
                localStorage.setItem('currentUser', globalData.token);
                if(cb) {
                    cb(res)
                }
                else{
                    return res;
                }
            }));
    }
}