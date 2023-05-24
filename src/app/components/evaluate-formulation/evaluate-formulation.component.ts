import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-evaluate-formulation',
  templateUrl: './evaluate-formulation.component.html',
  styleUrls: ['./evaluate-formulation.component.scss']
})
export class EvaluateFormulationComponent {
  @Input() name: String = "";
  @Input() currentTrial: any;
  @Output() oGoBackToFormulations = new EventEmitter<any>();

  // values for immunogenicity
  antibodyLevelTestAnimal: any;
  antibodyLevelControlAnimal: any;

  // values for safety index
  lethalDose: any;
  effectiveDose: any;

  //values for efficacy and efficiency
  attackRateUnvaccinatedGroup: any;
  attackRateVaccinatedGroup: any;


  goBackToFormulations() {
    this.oGoBackToFormulations.emit(true);
  }

  confirmEvaluation(form: any) {
    console.log("Evaluating formulation...");
  }
}
