import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services';
import { Router } from '@angular/router';
import * as $ from "jquery";
import 'fullcalendar';

@Component({
    templateUrl: 'meetings.component.html',
    styleUrls: ['meetings.component.css']
})
export class MeetingsComponent implements OnInit {
    welcome:boolean;
    calender:boolean;
    to_do:boolean;
    pdf_path: any;

    date: Number = Date.now();

    home_data: any;
    active_doc:any;


    constructor(private service: UserService, public router: Router) {

        this.welcome = true;
        this.calender = false;
        this.to_do = false;
        this.home_data = {
            doc_ids: [],
            photo: '',
        }
    }

    showDoc(doc:any, flag:string){
        this.active_doc = doc;        
        this.service.getDocument({doc_id: doc.id}, flag).subscribe(
            (data:any)=>{
                console.log('Document Data: ', data)
            },
            (error:any) =>{
                console.log("Something went wrong", error);
            })
    }

    show_welcom(){
        this.welcome = true;
        this.calender = false;
        this.to_do = false;
    }

    show_calender(){
        this.welcome = false;
        this.calender = true;
        this.to_do = false;
        let home_data = this.home_data
        $(function() {
            let events: any = []
            home_data.calendar.forEach(function(event: any) {
                events.push({
                    title: event.name,
                    start: event.start
                })
            });
            $('#calender').fullCalendar({
                events: events,
                eventClick: function(calEvent, jsEvent, view) {

                    alert('Event: ' + calEvent.title);
                    alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                    alert('View: ' + view.name);

                    // change the border color just for fun
                    $(this).css('border-color', 'red');
                    $(this).css('color', 'white');

                },
                header: { left: 'month,agendaWeek,agendaDay' }, // buttons for switching between views
                eventLimit: true, // for all non-agenda views
                views: {
                    agenda: {
                        eventLimit: 6 // adjust to 6 only for agendaWeek/agendaDay
                    }
                }
                // put your options and callbacks here
            })

        });
    }

    show_to_do(){
        this.welcome = false;
        this.calender = false;
        this.to_do = true;
    }

    ngOnInit() {
        this.service.getAll({}).subscribe(
            (data:any)=>{
                this.home_data = data.result.data;
                console.log('Home Data : ', this.home_data);
                document.getElementById("home-content").innerHTML = this.home_data.description;
            },
            (error:any) =>{
                console.log("Something went wrong", error);
            })
    }
}