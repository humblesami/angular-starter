import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//import { routing }        from './app.routing';
//import { AuthGuard } from './_guards';

import { JwtInterceptor } from './_helpers';


import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';

import { LoginComponent }   from './comopnents/login/login.component';
import { HomeComponent }   from './comopnents/home/home.component';

import { PageNotFound } from './pagenotfound';
import { AuthenticationService, UserService, HttpService } from './_services/index';
import { ProfilesComponent } from './comopnents/profiles/profiles.component';
import { CommitteesComponent } from './comopnents/committees/index';
import { ProfileComponent } from './comopnents/profile/profile.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        ProfilesComponent,
        CommitteesComponent,
        ProfileComponent,
        PageNotFound
    ],
    providers:[
        AuthenticationService,
        HttpService,
        UserService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }