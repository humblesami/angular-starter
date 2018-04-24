import { Component, OnInit } from '@angular/core';


 import { Hero } from '../types/hero';
import { ws_request } from '../service';

@Component({
    selector: 'app-hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
    heroes: Hero[] = [];
    private searchTerm = '';

    constructor() {}

    ngOnInit(): void {
        
    }

    search(kw)
    {
        var obj = this;
        ws_request('/searchheroes',{kw:kw},function(data){
            obj.heroes = data;
        });
    }
}
