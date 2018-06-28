import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services';

@Component({
    templateUrl: 'profiles.component.html',
    styleUrls: ['profiles.component.css']
})
export class ProfilesComponent implements OnInit {

    globalData: any;
    profiles_data: any;

    constructor(private service: UserService) {
        this.globalData = {
            user: localStorage.getItem('user'),
            db: localStorage.getItem('db'),
            photo: localStorage.getItem('photo'),
            token: localStorage.getItem('token'),
            id: localStorage.getItem('id')
        }
        this.profiles_data = [];
    }


    ngOnInit() {
        this.service.profiles({token: this.globalData.token, db: this.globalData.db}).subscribe(
            (data: any) => {
                this.profiles_data = data.result.data;
                console.log(data)
            },
            (error: any) => {
                console.log("Something went wrong", error);
            })
    }
}
