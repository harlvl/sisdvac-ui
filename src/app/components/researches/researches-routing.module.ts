import { NgModule } from '@angular/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ResearchesComponent} from "./researches.component";
import {FormsModule} from "@angular/forms";


const routes: Routes = [
  {
    path: '', component: ResearchesComponent
  },
  {
    path: ':id/members',
    loadChildren: () => import("./members/members-routing.module")
      .then(m => m.MembersRoutingModule),
  }
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    NgForOf,
    NgIf,
    FormsModule,
    CommonModule
  ]
})
export class ResearchesRoutingModule { }
