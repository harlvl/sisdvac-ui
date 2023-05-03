import {Component, Injectable} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {NgForm} from "@angular/forms";
import {map} from "rxjs";
import {Credentials} from "../components/interfaces/credentials";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
@Injectable({providedIn: 'root'})
export class LoginComponent {
  credentials: Credentials = {
    email: "",
    password: "",
  };

  constructor(private authService: AuthService,
              private router: Router) {

  }

  public login(form: NgForm) {
    console.log("Form value: %s", form.value);
    this.authService.login(this.credentials)
      .subscribe(response => {
        this.router.navigate(['welcome']);
      });
  }

}
