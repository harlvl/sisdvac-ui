import {RouterModule, Routes} from "@angular/router";
import {CreateAnimalStudyComponent} from "./create-animal-study.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {path: '', component: CreateAnimalStudyComponent}
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: []
})

export class CreateAnimalStudyRoutingModule {

}
