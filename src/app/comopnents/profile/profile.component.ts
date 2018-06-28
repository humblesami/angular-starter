import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {
    profile_photo: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png';

    editable: boolean;
    profile_data:any;

    constructor(private service: UserService, private route: ActivatedRoute) {        
        this.editable = false;
        this.profile_data = {};
    }

    editProfile(){
        this.editable = !this.editable;
    }


    ngOnInit() {
        let profile= this;
        this.route.params.forEach((params: Params) => {
            if (params['id'] !== undefined) {
                this.service.profile.get({ id: params['id']}).subscribe(
                    (result:any)=>{
                        if(result.error)
                        {
                            
                        }
                        else
                        {
                            profile.profile_data = result.data;
                            if(profile.profile_data.login)
                            {
                                profile.profile_data.last_login=profile.profile_data.login.last;
                            }
                        }                            
                    },
                    (error:any) =>{
                        console.log("Something went wrong", error);
                    })
            }
          });
        
    }
}