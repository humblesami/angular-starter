import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, NavigationStart } from '@angular/router';


import { LoginComponent }   from './comopnents/login/login.component';
import { HomeComponent }   from './comopnents/home/home.component';

import { PageNotFound } from './pagenotfound';
import { ProfilesComponent } from './comopnents/profiles/profiles.component';
import { CommitteesComponent } from './comopnents/committees/index';


const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent },
    { path: 'profiles', component: ProfilesComponent },
    { path: 'committees', component: CommitteesComponent },
    { path: "**", component: PageNotFound }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
    constructor(private router: Router) {
        router.events.forEach((event) => {
            if(event instanceof NavigationStart) {
                
            }
        });
    };
}