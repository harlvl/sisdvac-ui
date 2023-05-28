import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "./services/auth.service";
import {HeaderNames} from "./components/constants/header-names";
import {RouteNames} from "./components/constants/route-names";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'sisdvac-ui';
  isLogged = false;

  firstName: any;
  role: any;
  currentUser: any = null;

  // header names
  headerContentWelcome: string = HeaderNames.welcome;
  headerContentTrial: string = HeaderNames.trials;
  headerContentResearch: string = HeaderNames.researches;
  headerContentHome: string = HeaderNames.home;
  headerContentNewTrial: string = HeaderNames.trialCreate;
  headerContentAnimalStudies: string = HeaderNames.animalStudies;
  headerContentClinicalTrialDesign: string = HeaderNames.clinicalTrialDesign;
  headerContentClinicalTrialEvaluation: string = HeaderNames.clinicalTrialEvaluation;

  // router names
  routerNameCreateTrial: string = RouteNames.trialCreate;
  routerNameTrials: string = RouteNames.trials;
  routerNameResearches: string = RouteNames.researches;
  routerNameAnimalStudies: string = RouteNames.animalStudies;
  routerNameWelcome: string = RouteNames.welcome;
  routerNameClinicalTrialDesign: string = RouteNames.clinicalTrialDesign;
  routerNameClinicalTrialEvaluation: string = RouteNames.clinicalTrialEvaluation;


  constructor(private authService :AuthService,
              private spinner : NgxSpinnerService) {
    if (authService.getAccessToken()) {
      this.isLogged = true;

      this.firstName = authService.getFirstName();
      this.role = authService.getRole();
    }
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
  }
}
