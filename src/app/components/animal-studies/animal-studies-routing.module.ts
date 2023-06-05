import {RouterModule, Routes} from "@angular/router";
import {AnimalStudiesComponent} from "./animal-studies.component";
import {NgModule} from "@angular/core";
import {CreateAnimalStudyComponent} from "./create-animal-study/create-animal-study.component";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {EvaluationResultsComponent} from "../evaluation-results/evaluation-results.component";

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
  },
  {
    path: 'results',
    loadChildren: () => import('./evaluations-results/evaluations-results-routing.module')
      .then(m => m.EvaluationsResultsRoutingModule),
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
    NgOptimizedImage,
    NgClass,
    NgIf
  ],
})

export class AnimalStudiesRoutingModule {

}
