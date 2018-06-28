import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'profiles.component.html',
    styleUrls: ['profiles.component.css']
})
export class ProfilesComponent implements OnInit {

    profiles_data: any;

    constructor(private service: UserService, private router: Router) {        
        this.profiles_data = [];
    }

    gotoDetail(hero: any): void {
        const link = ['/profile', hero.id];
        this.router.navigate(link);
    }

    ngOnInit() {
        this.service.profiles({}).subscribe(
            (result:any)=>{
                if(result.error)
                {

                }
                else
                    this.profiles_data = result.data;
            },
            (error:any) =>{
                console.log("Something went wrong", error);
            })
    }
}
