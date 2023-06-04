import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "./services/auth.service";
import {HeaderNames} from "./components/constants/header-names";
import {RouteNames} from "./components/constants/route-names";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'sisdvac-ui';
  isLogged = false;
  keycode: any;

  firstName: any;
  role: any;
  currentUser: any = null;

  // header names
  headerContentWelcome: string = HeaderNames.welcome;
  headerContentTrial: string = HeaderNames.trials;
  headerContentResearch: string = HeaderNames.research;
  headerContentResearches: string = HeaderNames.researches;
  headerContentHome: string = HeaderNames.home;
  headerContentNewTrial: string = HeaderNames.trialCreate;
  headerContentAnimalStudies: string = HeaderNames.animalStudies;
  headerContentClinicalTrialDesign: string = HeaderNames.clinicalTrialDesign;
  headerContentClinicalTrialEvaluation: string = HeaderNames.clinicalTrialEvaluation;

  // router names
  routerNameCreateTrial: string = RouteNames.trialCreate;
  routerNameTrials: string = RouteNames.trials;
  routerNameResearch: string = RouteNames.research;
  routerNameResearches: string = RouteNames.researches;
  routerNameAnimalStudies: string = RouteNames.animalStudies;
  routerNameWelcome: string = RouteNames.welcome;
  routerNameClinicalTrialDesign: string = RouteNames.clinicalTrialDesign;
  routerNameClinicalTrialEvaluation: string = RouteNames.clinicalTrialEvaluation;


  constructor(private authService :AuthService,
              private route: ActivatedRoute,
              private spinner : NgxSpinnerService) {
    this.spinner.show();
    console.log("We are at constructor");
    let token = authService.getAccessToken();
    console.log("token: ", token);
    if (authService.getAccessToken()) {
      console.log("We have token");
      this.authService.updateResult(true);
      this.authService.result$.subscribe((result) => {
        console.log("Result: ", result);
        this.isLogged = result;
        this.firstName = authService.getFirstName();
        this.role = authService.getRole();
        this.spinner.hide();
      }, (error) => {
        console.log("Error encountered at main app constructor: ", error);
        this.spinner.hide();
      });
    } else {
      this.spinner.hide();
    }
  }

  ngOnInit(): void {
    console.log("We are at on init");
    this.spinner.show();
    this.authService.result$.subscribe(result => {
      console.log("Result: ", result);
      this.isLogged = result;
      this.spinner.hide();
    });
  }
}
