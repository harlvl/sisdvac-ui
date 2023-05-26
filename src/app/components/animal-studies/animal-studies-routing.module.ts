import {RouterModule, Routes} from "@angular/router";
import {AnimalStudiesComponent} from "./animal-studies.component";
import {NgModule} from "@angular/core";
import {CreateAnimalStudyComponent} from "./create-animal-study/create-animal-study.component";
import {NgForOf} from "@angular/common";

const routes: Routes = [
  {path: '', component: AnimalStudiesComponent},
  {
    path: 'create',
    loadChildren: () => import('./create-animal-study/create-animal-study-routing.module')
      .then(m => m.CreateAnimalStudyRoutingModule),
  }
];

@NgModule({
  declarations: [
    AnimalStudiesComponent,
    CreateAnimalStudyComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    NgForOf
  ],
})

export class AnimalStudiesRoutingModule {

}
