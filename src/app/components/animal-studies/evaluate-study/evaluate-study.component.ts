import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {AnimalStudyEvaluationRequest} from "../../interfaces/animalStudyEvaluationRequest";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";

@Component({
  selector: 'app-evaluate-study',
  templateUrl: './evaluate-study.component.html',
  styleUrls: ['./evaluate-study.component.scss']
})
export class EvaluateStudyComponent implements OnInit{
  errorMessage: string = "";

  // for evaluating animal study
  // evaluateForm: FormGroup;
  totalVaccinatedAnimals: any;
  animalsWithDetectableImmuneResponse: any;

  animalEvaluationRequest : AnimalStudyEvaluationRequest = {
    attackRateUnvaccinatedGroup: 0.0,
    attackRateVaccinatedGroup: 0.0,
    animalsWithDetectableImmuneResponse: 1,
    lethalDose: 0.0,
    effectiveDose: 0.0,
    adverseEventsVaccinatedGroup: 0,
    totalVaccinatedAnimals: 0,
  }

  constructor(private router: Router,
              private spinner: NgxSpinnerService,
              private formBuilder: FormBuilder) {

    // this.evaluateForm = this.formBuilder.group({
    //   totalVaccinatedAnimals: [
    //     this.animalEvaluationRequest.totalVaccinatedAnimals, {validators: [Validators.required]}
    //   ],
    //   animalsWithDetectableImmuneResponse: [
    //     this.animalEvaluationRequest.animalsWithDetectableImmuneResponse, {validators: [Validators.required]}
    //   ],
    // });
  }

  ngOnInit(): void {
  }

  confirmAction(form: any) {
    console.log("Accion confirmada");
    this.spinner.show();setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.router.navigate(['/animal-studies']);
    }, 2000);

  }

  confirmEvaluation(form: any) {
  }

  // public get form() {
  //   return this.evaluateForm.controls;
  // }

}
