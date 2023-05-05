import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {TrialComponent} from "./trial/trial.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./helpers/auth.guard";
import {RouteNames} from "./components/constants/route-names";
import {CreateTrialComponent} from "./trial/create-trial/create-trial.component";

const routes: Routes = [
  {path : '', redirectTo: RouteNames.welcome, pathMatch: 'full'},
  {path : RouteNames.login, component: LoginComponent},
  {path : RouteNames.welcome, component: WelcomeComponent, canActivate: [AuthGuard]},
  {path : RouteNames.trials, component: TrialComponent, canActivate: [AuthGuard]},
  {path : RouteNames.trialCreate, component: CreateTrialComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
