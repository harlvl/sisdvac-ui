import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {AnimalStudyEvaluationRequest} from "../../interfaces/animalStudyEvaluationRequest";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute, Router} from "@angular/router";
import {TrialService} from "../../../services/trial.service";
import {map} from "rxjs";

@Component({
  selector: 'app-evaluate-study',
  templateUrl: './evaluate-study.component.html',
  styleUrls: ['./evaluate-study.component.scss']
})
export class EvaluateStudyComponent implements OnInit{
  errorMessage: any;
  errorMessageRequired: string = "Requerido";

  // for evaluating animal study
  evaluateForm: FormGroup;
  totalVaccinatedAnimals: any;
  animalsWithDetectableImmuneResponse: any;

  // params from URI
  trialId: any;
  advanceId: any;

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
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private trialService: TrialService,
              private formBuilder: FormBuilder) {
    // we had to repeat this in the constructor because there's an error of missing initialization,
    // even though it's already on the ngOnInit method
    this.evaluateForm = this.formBuilder.group({
      totalVaccinatedAnimals: [null, {validators: [],}],
      animalsWithDetectableImmuneResponse: [null, {validators: [],}],
      attackRateUnvaccinatedGroup: [null, {validators: [],}],
      attackRateVaccinatedGroup: [null, {validators: [],}],
      lethalDose: [null, {validators: [],}],
      effectiveDose: [null, {validators: [],}],
      adverseEventsVaccinatedGroup: [null, {validators: [],}],
    });
  }

  ngOnInit(): void {
    // fetch data from parent component
    this.route.queryParams.subscribe(params => {
      this.trialId = params['tid'];
      this.advanceId = params['aid'];
    });
    this.evaluateForm = this.formBuilder.group({
      totalVaccinatedAnimals: [null, {validators: [],}],
      animalsWithDetectableImmuneResponse: [null, {validators: [],}],
      attackRateUnvaccinatedGroup: [null, {validators: [],}],
      attackRateVaccinatedGroup: [null, {validators: [],}],
      lethalDose: [null, {validators: [],}],
      effectiveDose: [null, {validators: [],}],
      adverseEventsVaccinatedGroup: [null, {validators: [],}],
    });
  }

  confirmAction(form: any) {
    console.log("Accion confirmada");
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.router.navigate(['/animal-studies']);
    }, 2000);

  }

  confirmEvaluation() {
    this.errorMessage = null;

    this.spinner.show();
    let currentTotalVaccinatedAnimals = this.evaluateForm.get('totalVaccinatedAnimals');
    let currentAnimalsWithDetectableImmuneResponse = this.evaluateForm.get('animalsWithDetectableImmuneResponse');
    let currentAttackRateUnvaccinatedGroup = this.evaluateForm.get('attackRateUnvaccinatedGroup');
    let currentAttackRateVaccinatedGroup = this.evaluateForm.get('attackRateVaccinatedGroup');
    let currentLethalDose = this.evaluateForm.get('lethalDose');
    let currentEffectiveDose = this.evaluateForm.get('effectiveDose');
    let currentAdverseEventsVaccinatedGroup = this.evaluateForm.get('adverseEventsVaccinatedGroup');

    currentTotalVaccinatedAnimals?.setValidators(Validators.required);
    currentAnimalsWithDetectableImmuneResponse?.setValidators(Validators.required);
    currentAttackRateUnvaccinatedGroup?.setValidators(Validators.required);
    currentAttackRateVaccinatedGroup?.setValidators(Validators.required);
    currentLethalDose?.setValidators(Validators.required);
    currentEffectiveDose?.setValidators(Validators.required);
    currentAdverseEventsVaccinatedGroup?.setValidators(Validators.required);

    currentTotalVaccinatedAnimals?.updateValueAndValidity();
    currentAnimalsWithDetectableImmuneResponse?.updateValueAndValidity();
    currentAttackRateUnvaccinatedGroup?.updateValueAndValidity();
    currentAttackRateVaccinatedGroup?.updateValueAndValidity();
    currentLethalDose?.updateValueAndValidity();
    currentEffectiveDose?.updateValueAndValidity();
    currentAdverseEventsVaccinatedGroup?.updateValueAndValidity();

    if (currentTotalVaccinatedAnimals?.valid &&
      currentAnimalsWithDetectableImmuneResponse?.valid &&
      currentAttackRateUnvaccinatedGroup?.valid &&
      currentAttackRateVaccinatedGroup?.valid &&
      currentLethalDose?.valid &&
      currentEffectiveDose?.valid &&
      currentAdverseEventsVaccinatedGroup?.valid) {


      let formData = this.evaluateForm.getRawValue();
      formData.totalVaccinatedAnimals = formData.totalVaccinatedAnimals.trim();
      formData.animalsWithDetectableImmuneResponse = formData.animalsWithDetectableImmuneResponse.trim();
      formData.attackRateUnvaccinatedGroup = formData.attackRateUnvaccinatedGroup.trim();
      formData.attackRateVaccinatedGroup = formData.attackRateVaccinatedGroup.trim();
      formData.lethalDose = formData.lethalDose.trim();
      formData.effectiveDose = formData.effectiveDose.trim();
      formData.adverseEventsVaccinatedGroup = formData.adverseEventsVaccinatedGroup.trim();

      this.animalEvaluationRequest.totalVaccinatedAnimals = formData.totalVaccinatedAnimals.trim();
      this.animalEvaluationRequest.animalsWithDetectableImmuneResponse = formData.animalsWithDetectableImmuneResponse.trim();
      this.animalEvaluationRequest.attackRateUnvaccinatedGroup = formData.attackRateUnvaccinatedGroup.trim();
      this.animalEvaluationRequest.attackRateVaccinatedGroup = formData.attackRateVaccinatedGroup.trim();
      this.animalEvaluationRequest.lethalDose = formData.lethalDose.trim();
      this.animalEvaluationRequest.effectiveDose = formData.effectiveDose.trim();
      this.animalEvaluationRequest.adverseEventsVaccinatedGroup = formData.adverseEventsVaccinatedGroup.trim();

      this.trialService.evaluateAnimalStudy(this.trialId, this.advanceId, this.animalEvaluationRequest).pipe(map((res) => {
        return res;
      })).subscribe((response) => {
        console.log("Response status: %s", response.status);
        this.spinner.hide();
        this.router.navigate(['/animal-studies']);
      });
    } else {
      console.log("Fields are invalid");
      if (!currentTotalVaccinatedAnimals?.valid) {
        currentTotalVaccinatedAnimals?.markAsTouched();
      }
      if (!currentAnimalsWithDetectableImmuneResponse?.valid) {
        currentAnimalsWithDetectableImmuneResponse?.markAsTouched();
      }
      if (!currentAttackRateUnvaccinatedGroup?.valid) {
        currentAttackRateUnvaccinatedGroup?.markAsTouched();
      }
      if (!currentAttackRateVaccinatedGroup?.valid) {
        currentAttackRateVaccinatedGroup?.markAsTouched();
      }
      if (!currentLethalDose?.valid) {
        currentLethalDose?.markAsTouched();
      }
      if (!currentEffectiveDose?.valid) {
        currentEffectiveDose?.markAsTouched();
      }
      if (!currentAdverseEventsVaccinatedGroup?.valid) {
        currentAdverseEventsVaccinatedGroup?.markAsTouched();
      }
      this.spinner.hide();
    }

    currentTotalVaccinatedAnimals?.clearValidators();
    currentAnimalsWithDetectableImmuneResponse?.clearValidators();
    currentAttackRateUnvaccinatedGroup?.clearValidators();
    currentAttackRateVaccinatedGroup?.clearValidators();
    currentLethalDose?.clearValidators();
    currentEffectiveDose?.clearValidators();
    currentAdverseEventsVaccinatedGroup?.clearValidators();
  }

  public get form() {
    return this.evaluateForm.controls;
  }

}
