import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services';

@Component({
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {
    profile_photo: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png';

    editable: boolean;
    globalData:any;
    profile_data:any;

    constructor(private service: UserService) {
        this.globalData = {
            user : localStorage.getItem('user'),
            db: localStorage.getItem('db'),
            photo: localStorage.getItem('photo'),
            token: localStorage.getItem('token'),
            id: localStorage.getItem('id')
        }
        this.editable = false;
        this.profile_data = {};
    }

    editProfile(){
        this.editable = !this.editable;
    }


    ngOnInit() {
        this.service.profile.get({token: this.globalData.token, db: this.globalData.db, id: this.globalData.id}).subscribe(
            (data:any)=>{
                this.profile_data = data.result.data;
                console.log(this.profile_data)

            },
            (error:any) =>{
                console.log("Something went wrong", error);
            })
    }
}