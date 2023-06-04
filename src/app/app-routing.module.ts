import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {ResearchComponent} from "./research/research.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./helpers/auth.guard";
import {RouteNames} from "./components/constants/route-names";
import {CreateTrialComponent} from "./research/create-trial/create-trial.component";
import {ResultsComponent} from "./results/results.component";
import {ClinicalTrialDesignComponent} from "./components/clinical-trial-design/clinical-trial-design.component";
import {
  ClinicalTrialEvaluationComponent
} from "./components/clinical-trial-evaluation/clinical-trial-evaluation.component";

const routes: Routes = [
  {path : '', component: WelcomeComponent, canActivate: [AuthGuard]},
  {path : RouteNames.login, component: LoginComponent},
  {path : RouteNames.welcome, component: WelcomeComponent, canActivate: [AuthGuard]},
  {
    path: RouteNames.researches,
    canActivate: [AuthGuard],
    loadChildren: () => import("./components/researches/researches-routing.module")
      .then(m => m.ResearchesRoutingModule),
  },
  {
    path : RouteNames.animalStudies,
    canActivate: [AuthGuard],
    loadChildren: () => import("./components/animal-studies/animal-studies-routing.module")
      .then(m => m.AnimalStudiesRoutingModule)
  },
  {path : RouteNames.clinicalTrialDesign, component: ClinicalTrialDesignComponent, canActivate: [AuthGuard]},
  {path : RouteNames.clinicalTrialEvaluation, component: ClinicalTrialEvaluationComponent, canActivate: [AuthGuard]},
  {path : RouteNames.trialCreate, component: CreateTrialComponent, canActivate: [AuthGuard]},
  {path : RouteNames.results, component: ResultsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
