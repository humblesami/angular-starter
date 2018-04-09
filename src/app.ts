//our root app component
import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {RouterModule} from '@angular/router'
import {Fruits} from './fruits'
import {Vegetables} from './vegetables'
import {Snacks} from './snacks'
import {PageNotFound} from './pagenotfound'
import {RouteGuardService} from './routeguardservice'

@Component({
  selector: 'my-app',
  template: `
    <div><h1>Select Food Category</h1></div>
    <nav><h3>
      <a [routerLink]="['/fruits']" routerLinkActive="active">Fruits</a>
      <a [routerLink]="['/vegetables']" routerLinkActive="active">Vegetables</a>
      <a [routerLink]="['/snacks', '1']" routerLinkActive="active">Normal Snacks</a>
      <a [routerLink]="['/snacks', '2']" routerLinkActive="active">Fat Free Snacks</a>
    </h3></nav>
    <router-outlet></router-outlet>
  `,
})
export class App {
  
  constructor() {
   
  }
}

const appRoutes: Routes = [
  { path: 'fruits', component: Fruits },
  { path: 'vegetables', component: Vegetables },
  { path: 'snacks/:id', canActivate : [RouteGuardService], component: Snacks },
  { path: '',   redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: PageNotFound }
];

@NgModule({
  imports: [ BrowserModule, RouterModule.forRoot(appRoutes) ],
  declarations: [ App, Fruits, Vegetables, Snacks, PageNotFound ],
  providers : [RouteGuardService],
  bootstrap: [ App ]
})
export class AppModule {}