import { Component, OnInit } from '@angular/core';
import { Hero } from '../types/hero';
import { ws_request } from '../service';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];

    constructor() { }

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes() {
        var obj = this; 
        obj.heroes = [];
        ws_request('/getheroes',{},function(data){            
            obj.heroes = data;
        });
    }
}
