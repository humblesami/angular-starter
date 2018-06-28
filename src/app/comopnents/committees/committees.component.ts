import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../_services';

@Component({
    templateUrl: 'committees.component.html',
    styleUrls: ['committees.component.css']
})
export class CommitteesComponent implements OnInit {
    committees: any;
    popup_committee: any;
    showCommitteeModal: boolean = false;
    img: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png';

    constructor(private service: UserService) {
    }

    showCommittee(committee: any){
        this.showCommitteeModal = true;
        this.popup_committee = committee;
    }

    ngOnInit() {
        this.service.getCommittees({}).subscribe(
            (result:any)=>{
                if(result.error)
                {
                    
                }
                else
                    this.committees = result.data;
            },
            (error:any) =>{
                console.log("Something went wrong", error);
            })
    }
}