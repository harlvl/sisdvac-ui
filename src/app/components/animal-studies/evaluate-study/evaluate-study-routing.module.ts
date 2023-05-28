import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EvaluateStudyComponent} from "./evaluate-study.component";


const routes: Routes = [
  {
    path: '', component: EvaluateStudyComponent
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EvaluateStudyRoutingModule { }
