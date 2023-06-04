import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ResearchService} from "../../../services/research.service";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Location} from "@angular/common";
import {CreateClinicalDesignRequest} from "../../interfaces/CreateClinicalDesignRequest";
import {phases} from "../../../models/phases";
import {TrialService} from "../../../services/trial.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-design',
  templateUrl: './add-design.component.html',
  styleUrls: ['./add-design.component.scss']
})
@Injectable({providedIn: 'root'})
export class AddDesignComponent implements OnInit {
  documentNumber: any;
  errorMessageRequired: string = "Requerido";
  mainForm: FormGroup;
  phasesList: any [] = phases;

  trialList: any[] = [];

  trialId: any;
  request: CreateClinicalDesignRequest = {
    objectives: '',
    phase: 0,
    sampleSize: 0,
    ethicalGuide: '',
    ethicalGuideUri: '',
    animalModel: 'HUMAN',
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private trialService: TrialService,
              private researchService: ResearchService,
              private userService: UserService,
              private authService: AuthService,
              private spinner: NgxSpinnerService,
              private currentLocation: Location) {

    this.mainForm = this.formBuilder.group({
      trialId: [ '', { } ],
      objectives: [ '', { } ],
      phase: [ '', { } ],
      sampleSize: [ '', { } ],
      ethicalGuide: [ '', { } ],
      ethicalGuideUri: [ '', { } ],
    });
  }
  ngOnInit(): void {
    this.spinner.show();
    this.mainForm = this.formBuilder.group({
      trialId: [ '', { } ],
      objectives: [ '', { } ],
      phase: [ '', { } ],
      sampleSize: [ '', { } ],
      ethicalGuide: [ '', { } ],
      ethicalGuideUri: [ '', { } ],
    });

    this.documentNumber = this.authService.getDocumentNumber();
    this.researchService.findClinicalTrialsByUserDocumentNumber(this.documentNumber).subscribe(
      {
        next: (response:HttpResponse<any>) => {
          this.trialList = response.body.payload;
          this.spinner.hide();
        },
        error: (err) => {
          if (err.status == 403) {
            this.handleTokenInvalidError();
          }
          this.spinner.hide();
        }
      }
    );
  }

  onSubmit() {
    this.spinner.show();
    let currentTrialId = this.mainForm.get('trialId');
    let currentObjectives = this.mainForm.get('objectives');
    let currentPhase = this.mainForm.get('phase');
    let currentSampleSize = this.mainForm.get('sampleSize');
    let currentEthicalGuide = this.mainForm.get('ethicalGuide');
    let currentEthicalGuideUri = this.mainForm.get('ethicalGuideUri');

    currentTrialId?.setValidators(Validators.required);
    currentObjectives?.setValidators(Validators.required);
    currentPhase?.setValidators(Validators.required);
    currentSampleSize?.setValidators(Validators.required);
    currentEthicalGuide?.setValidators(Validators.required);
    currentEthicalGuideUri?.setValidators(Validators.required);

    currentTrialId?.updateValueAndValidity();
    currentObjectives?.updateValueAndValidity();
    currentPhase?.updateValueAndValidity();
    currentSampleSize?.updateValueAndValidity();
    currentEthicalGuide?.updateValueAndValidity();
    currentEthicalGuideUri?.updateValueAndValidity();

    if (currentTrialId?.valid &&
      currentObjectives?.valid &&
      currentPhase?.valid &&
      currentSampleSize?.valid &&
      currentEthicalGuide?.valid &&
      currentEthicalGuideUri?.valid
    ) {
      console.log("Fields are valid");
      let formData = this.mainForm.getRawValue();

      this.trialId = formData.trialId.trim();
      this.request.objectives = formData.objectives.trim();
      this.request.phase = formData.phase.trim();
      this.request.sampleSize = formData.sampleSize.trim();
      this.request.ethicalGuide = formData.ethicalGuide.trim();
      this.request.ethicalGuideUri = formData.ethicalGuideUri.trim();
      console.log("Trial id: ", this.trialId);
      console.log("request: ", this.request);

    //   CALL SERVICE
      this.trialService.saveClinicalStudy(this.trialId, this.request).subscribe(
        {
          next: (response: HttpResponse<any>) => {
            console.log("Response status: ", response.status);
            this.spinner.hide();
            this.currentLocation.back();
          },
          error: (err) => {
            if (err.status == 403) {
              this.handleTokenInvalidError();
            }
            this.spinner.hide();
          }
        }
      );

    } else {
      console.log("Fields are invalid");
      if (!currentTrialId?.valid) {
        currentTrialId?.markAsTouched();
      }
      if (!currentObjectives?.valid) {
        currentObjectives?.markAsTouched();
      }
      if (!currentPhase?.valid) {
        currentPhase?.markAsTouched();
      }
      if (!currentSampleSize?.valid) {
        currentSampleSize?.markAsTouched();
      }
      if (!currentEthicalGuide?.valid) {
        currentEthicalGuide?.markAsTouched();
      }
      if (!currentEthicalGuideUri?.valid) {
        currentEthicalGuideUri?.markAsTouched();
      }
    }

    currentTrialId?.clearValidators();
    currentObjectives?.clearValidators();
    currentPhase?.clearValidators();
    currentSampleSize?.clearValidators();
    currentEthicalGuide?.clearValidators();
    currentEthicalGuideUri?.clearValidators();

    this.spinner.hide();
  }

  public get form() {
    return this.mainForm.controls;
  }

  handleTokenInvalidError() {
    console.log("Invalid token.");
    this.authService.clearLocalStorage();
    alert("Su sesión ha finalizado, por favor ingrese sus credenciales nuevamente.");
    this.authService.updateResult(false);
    this.router.navigate(['login']);
  }
}
