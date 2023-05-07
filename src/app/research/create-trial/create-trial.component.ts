import {Component, Injectable, OnInit} from '@angular/core';
import {TrialService} from "../../services/trial.service";
import {TagNames} from "../../components/constants/tag-names";
import {Router} from "@angular/router";
import {RouteNames} from "../../components/constants/route-names";
import {Trial} from "../../components/interfaces/trial";
import {TrialStage} from "../../components/enums/trialStage";
import {TppItem} from "../../components/interfaces/tppItem";
import {TppItemType} from "../../components/enums/tppItemType";
import {FormulationItem} from "../../components/interfaces/formulationItem";
import {FormulationItemType} from "../../components/enums/formulationItemType";
import {map} from "rxjs";

@Component({
  selector: 'app-create-research',
  templateUrl: './create-trial.component.html',
  styleUrls: ['./create-trial.component.scss']
})

@Injectable({providedIn: 'root'})
export class CreateTrialComponent{
  public tagCreateNew: string = TagNames.trialCreate;
  public currentStep: number = 1;
  public trialReady: boolean = false;
  public creationCompleted: boolean = false;

  // START input fields
  private trialToBeCreated = {} as Trial;

  // START step 1
  // END step 1

  // START step 1
  // END step 1

  // START step 3
  public tpp_target_population: string = "";
  public tpp_efficacy_profile: string = "";
  public tpp_immuno_response: string = "";
  public tpp_route_of_administration: string = "";
  public tpp_storage_conditions: string = "";
  public tpp_other: string = "";

  // END step 3

  // START step 4
  // END step 4
  // END input fields

  constructor(private trialsService: TrialService, private router: Router) {
    this.currentStep = 1;
  }
  ngOnInit(): void {
    this.currentStep = 1;
  }

  private doCreateTrial(input: any) {

  }

  public nextStep() {
    this.currentStep = (this.currentStep + 1) % 4;
    if (this.currentStep == 0) {
      this.currentStep = 4;
    }

    if (this.currentStep == 1) {
      // TODO actions
    } else if (this.currentStep == 2) {
      // TODO actions
    }else if (this.currentStep == 3) {
      // TODO actions
    }else if (this.currentStep == 4) {
      //update object
      this.trialToBeCreated.title = "Test title";
      this.trialToBeCreated.insNumber = "15871236521121";
      this.trialToBeCreated.stage = TrialStage.PRECLINICAL;
      this.trialToBeCreated.startDate = "2023-05-04";
      this.trialToBeCreated.status = {startDate: "2023-05-04", name: "Estado inicial", endDate: ""};

      const targetPopulationItem: TppItem = {type: TppItemType.TARGET_POPULATION, detail: this.tpp_target_population}
      const efficacyProfileItem: TppItem = {type: TppItemType.DESIRED_EFFICACY_PROFILE, detail: this.tpp_efficacy_profile}
      const immunoResponseItem: TppItem = {type: TppItemType.DESIRED_IMMUNOLOGICAL_RESPONSE, detail: this.tpp_immuno_response}
      const adminRouteItem: TppItem = {type: TppItemType.ADMINISTRATION_ROUTE, detail: this.tpp_route_of_administration}
      const storageConditionsItem: TppItem = {type: TppItemType.STORAGE_CONDITION, detail: this.tpp_storage_conditions}
      const tppItems = [];
      tppItems.push(targetPopulationItem, efficacyProfileItem, immunoResponseItem, adminRouteItem, storageConditionsItem);
      console.log("tpp items: " + tppItems); // TODO fix printing
      this.trialToBeCreated.tpp = {items: tppItems};

      const formulationItem: FormulationItem = {type: FormulationItemType.COMPOSITION, detail: "Biocompatible"};
      this.trialToBeCreated.formulation = {items: [formulationItem]};

      this.trialReady = true;
    }
    console.log("Current step is now %d", this.currentStep);
  }

  public confirm(input_form:any) {
    console.log("Confirmada la creación");
    // TODO add loading icon

    console.log("Trial to be created:")
    // TODO add validations
    console.log(this.trialToBeCreated);

    // START service call
    this.trialsService.createTrial(this.trialToBeCreated).pipe(map((res) => {
      return res;
    })).subscribe((response) => {
      console.log("status code: %s", response.status);
    });

    this.creationCompleted = true; // this is update somewhere in the service call
    // END service call

    // TODO show success/error message

    // send user to research tab
    this.router.navigate([RouteNames.trials]);

  }

  private createTrial() {

  }

}
