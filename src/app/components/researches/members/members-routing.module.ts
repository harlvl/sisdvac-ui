import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MembersComponent} from "./members.component";
import {AddMembersComponent} from "./add-members/add-members.component";

const routes : Routes = [
  {
    path: '', component: MembersComponent
  },
  {
    path: 'add', component: AddMembersComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class MembersRoutingModule { }
