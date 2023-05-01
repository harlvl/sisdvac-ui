import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {TrialComponent} from "./trial/trial.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./helpers/auth.guard";

const routes: Routes = [
  {path : '', redirectTo: 'welcome', pathMatch: 'full'},
  {path : 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
  {path : 'trial', component: TrialComponent, canActivate: [AuthGuard]},
  {path : 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
