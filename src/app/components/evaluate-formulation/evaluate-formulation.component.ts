import {Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TrialService} from "../../services/trial.service";
import {map, Subject} from "rxjs";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-evaluate-formulation',
  templateUrl: './evaluate-formulation.component.html',
  styleUrls: ['./evaluate-formulation.component.scss']
})

@Injectable({providedIn: 'root'})
export class EvaluateFormulationComponent implements  OnInit{
  @Input() name: String = "";
  @Input() currentTrial: any;
  @Input() currentFormulation: any;
  @Output() oGoBackToFormulations = new EventEmitter<any>();
  @Output() oGoToEvaluationResult = new EventEmitter<any>();

  evaluationResult: any = [];
  evaluationCompleted: boolean = false;
  formulationTitle: any;

  // for results view
  eventsSubject: Subject<void> = new Subject<void>();

  /*** START INPUT VALUES FOR CALCULATION ***/
  // values for immunogenicity
  antibodyLevelTestAnimal: any;
  antibodyLevelControlAnimal: any;

  // values for safety index
  lethalDose: any;
  effectiveDose: any;

  //values for efficacy and efficiency
  attackRateUnvaccinatedGroup: any;
  attackRateVaccinatedGroup: any;
  /*** END INPUT VALUES FOR CALCULATION ***/

  constructor(private route: ActivatedRoute,
              private trialService: TrialService) {
  }

  ngOnInit(): void {

  }

  emitEventToChild() {
    this.eventsSubject.next();
  }


  goBackToFormulations() {
    this.oGoBackToFormulations.emit(true);
  }

  goToEvaluationCompleted() {

  }

  confirmEvaluation(form: any) {
    this.formulationTitle = this.currentFormulation.title;
    // call service
    this.trialService.evaluateFormulation(this.currentTrial.id, this.currentFormulation.id, {"id": 2}).pipe(map((res) => {
      return res;
    })).subscribe((response: HttpResponse<any>) => {
      console.log("Evaluating formulation...");
      this.evaluationResult = response.body.payload;
      console.log("Evaluation result: ");
      console.log(this.evaluationResult);

      this.evaluationCompleted = true;
      // this.oGoToEvaluationResult.emit(this.evaluationResult);
    });

  }
}
