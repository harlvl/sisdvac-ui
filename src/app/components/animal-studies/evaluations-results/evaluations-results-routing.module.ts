import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EvaluationsResultsComponent} from "./evaluations-results.component";


const routes : Routes = [
  {
    path: '', component: EvaluationsResultsComponent
  }
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class EvaluationsResultsRoutingModule { }
