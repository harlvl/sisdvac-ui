import {Component, Injectable} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {NgForm} from "@angular/forms";
import {Credentials} from "../components/interfaces/credentials";
import {Router} from "@angular/router";
import {RouteNames} from "../components/constants/route-names";

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
    console.log("Logging in...");
    this.authService.login(this.credentials)
      .subscribe((response) => {
        this.authService.updateResult(true);
        this.router.navigate([RouteNames.welcome]);
      }, (error) => {
        console.log("Error encountered at login: ", error);
      });
  }

}
