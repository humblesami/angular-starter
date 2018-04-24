import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ws_request } from '../service';

import { Hero } from '../types/hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
    hero: Hero;

    constructor(private route: ActivatedRoute,private location: Location)
    {}

    ngOnInit(): void {
        this.getHero();
    }

    getHero(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        var obj = this;
        ws_request('/gethero',{id:id},function(data){
            obj.hero = data;
        });
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        var obj = this;        
        ws_request('/updatehero',{hero:obj.hero},function(){
            obj.goBack();
        });   
    }
}
