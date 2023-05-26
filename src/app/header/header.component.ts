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

  constructor(private authService :AuthService) {
    if (authService.getAccessToken()) {
      this.isLogged = true;
    }
  }
  ngOnInit(): void {
  }

}
