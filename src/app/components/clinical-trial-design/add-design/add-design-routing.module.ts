import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AddDesignComponent} from "./add-design.component";


const routes: Routes = [
  {
    path: '', component: AddDesignComponent,
  }
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AddDesignRoutingModule { }
