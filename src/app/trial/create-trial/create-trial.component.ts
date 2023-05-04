import {Component, Injectable, OnInit} from '@angular/core';
import {TrialService} from "../../services/trial.service";
import {TagNames} from "../../components/constants/tag-names";
import {Router} from "@angular/router";
import {RouteNames} from "../../components/constants/route-names";

@Component({
  selector: 'app-create-trial',
  templateUrl: './create-trial.component.html',
  styleUrls: ['./create-trial.component.scss']
})

@Injectable({providedIn: 'root'})
export class CreateTrialComponent implements OnInit{
  public tagCreateNew: string = TagNames.trialCreate;
  public currentStep: number = 1;
  public trialCreated: boolean = false;
  public creationCompleted: boolean = false;

  constructor(private trialsService: TrialService, private router: Router) {
    this.currentStep = 1;
    console.log("current step: %d", this.currentStep);
  }
  ngOnInit(): void {
    this.currentStep = 1;
    console.log("current step: %d", this.currentStep);
  }

  private doCreateTrial(input: any) {

  }

  public nextStep() {
    this.currentStep = (this.currentStep + 1) % 4;
    if (this.currentStep == 0) {
      this.currentStep = 4;
    }
    console.log("Current step is now %d", this.currentStep);
  }

  public confirm() {
    console.log("Confirmada la creación");
    // TODO add loading icon

    // TODO CALL SERVICE
    this.creationCompleted = true; // this is update somewhere in the service call

    // TODO show success/error message

    // send user to trial tab
    this.router.navigate([RouteNames.trials]);

  }

}
