import { Component, OnInit } from '@angular/core';
import { constants } from '../../_helpers/constants';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../_services';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    selectedFile : FileReader = null;
    loading = false;
    submitted = false;
    returnUrl: string;
    error : Error;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) {
            constants.user_data = {
                user: '',
                db: 'db11',
                photo: '',
                token: '',
                id: ''
            }
            localStorage.clear();
        }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['imran.alrai@gmail.com', Validators.required],
            password: ['Digit@l1', Validators.required]
        });
        
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        let auth = this;
        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value).pipe(
            first()).subscribe(
                (result:any) => {
                    if(!result.error)
                    {                      
                        this.router.navigate([this.returnUrl]);
                    }
                    else
                    {
                        this.error = result.error;
                    }
                    this.loading = false;
                },
            (error:Error) => {
                this.error = error;
                this.loading = false;
            }
        );
    }

    
}