import {Component} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Component({
  template: `
    <h2>Snacks | {{snackType == 1? 'Normal' : 'Fat free'}}</h2>
    <p>Choose snacks</p>
    <select>
      <option>Potato chips</option>
      <option>Nachos chips</option>
      <option>Biscuits - Sugar</option>
      <option>Biscuits - Salty</option>
      <option>Bread sandwich</option>
    </select>
    `
})

export class Snacks implements OnInit{
  
  snackType:number;
  constructor(private _route : ActivatedRoute){
    
  }
  
  ngOnInit(){
     this._route.paramMap
    .switchMap((params: ParamMap) => {
      return Observable.of(params.get('id'));
    })
    .subscribe(id => {this.snackType = +id;});
    
  }
}