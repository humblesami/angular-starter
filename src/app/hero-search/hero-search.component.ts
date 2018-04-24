import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { ws_request } from '../service';

@Component({
    selector: 'app-hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
    heroes$: Observable<Hero[]>;
    private searchTerms = new Subject<string>();

    constructor() {}

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        ws_request('/gethero',{kw:this.searchTerms},function(data){
            console.log(data);
        });
    }
}
