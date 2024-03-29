import {Component, Injectable, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {RouteNames} from "../components/constants/route-names";
import {HeaderNames} from "../components/constants/header-names";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

@Injectable({providedIn: 'root'})
export class HeaderComponent implements OnInit{
  isLogged: boolean = false;
  headerContentTrial: string = HeaderNames.trials;
  headerContentNewTrial: string = HeaderNames.trialCreate;
  routerNameCreateTrial: string = RouteNames.trialCreate;
  routerNameTrials: string = RouteNames.trials;

  constructor(private authService :AuthService) {
    if (authService.getAccessToken()) {
      this.isLogged = true;
    }
  }
  ngOnInit(): void {
  }

}
