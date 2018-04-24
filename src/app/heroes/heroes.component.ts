import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { ws_request } from '../service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
    heroes: Hero[];

    constructor() { }

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes(): void {        
        ws_request('/getheroes',{},function(data){
            console.log(data);
        });
    }
    

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        ws_request('/addhero',{name : name},function(data){
            this.heroes.add(data)
            console.log(data);
        });
    }

    delete(hero: Hero): void {
        this.heroes = this.heroes.filter(h => h !== hero);        
        ws_request('/delhero',{id : hero.id},function(data){
            this.heroes.remove(hero);
        });
    }
}
