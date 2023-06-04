import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ClinicalTrialDesignComponent} from "./clinical-trial-design.component";
import {RouteNames} from "../constants/route-names";


const routes : Routes = [
  {
    path: '', component: ClinicalTrialDesignComponent,

  },
  {
    path: RouteNames.create,
    loadChildren: () => import("./add-design/add-design-routing.module")
      .then(m => m.AddDesignRoutingModule),
  }
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ClinicalTrialDesignRoutingModule { }
