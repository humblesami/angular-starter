import { Component, OnInit } from '@angular/core';

import { Hero } from '../types/hero';
import { ws_request } from '../service';
import { fail } from 'assert';

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
        var obj = this; 
        ws_request('/getheroes',{},function(data){            
            obj.heroes = data;
        });
    }    

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        var obj = this;
        
        ws_request('/addhero',{name:name},false);
    }

    delete(hero: Hero): void {
        this.heroes = this.heroes.filter(h => h !== hero);   
        var obj = this;     
        ws_request('/delhero',{id : hero.id},function(data){
            var ik = -1;
            obj.heroes.forEach(function(h, index){
                if(this.id == h.id)
                    ik = index;
            })
            obj.heroes.splice(ik);
        });
    }
}
