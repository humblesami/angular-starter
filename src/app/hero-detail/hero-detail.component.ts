import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ws_request } from '../service';

import { Hero }         from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    ws_request('/gethero',{id:id},function(data){
        console.log(data);
    });
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    ws_request('/updatehero',{hero:this.hero},function(){
        this.goBack();
    });   
  }
}
