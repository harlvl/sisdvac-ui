import {RouterModule, Routes} from "@angular/router";
import {AnimalStudiesComponent} from "./animal-studies.component";
import {NgModule} from "@angular/core";
import {CreateAnimalStudyComponent} from "./create-animal-study/create-animal-study.component";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '', component: AnimalStudiesComponent
  },
  {
    path: 'create',
    loadChildren: () => import('./create-animal-study/create-animal-study-routing.module')
      .then(m => m.CreateAnimalStudyRoutingModule),
  },
  {
    path: 'evaluate',
    loadChildren: () => import('./evaluate-study/evaluate-study-routing.module')
      .then(m => m.EvaluateStudyRoutingModule),
  }

];

@NgModule({
  declarations: [
    AnimalStudiesComponent,
    CreateAnimalStudyComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    NgForOf,
    FormsModule,
    NgOptimizedImage
  ],
})

export class AnimalStudiesRoutingModule {

}
