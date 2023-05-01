import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {TrialComponent} from "./trial/trial.component";

const routes: Routes = [
  {path : '', redirectTo: 'welcome', pathMatch: 'full'},
  {path : 'welcome', component: WelcomeComponent},
  {path : 'trial', component: TrialComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
