import {Component, Injectable, OnInit} from '@angular/core';
import {TrialService} from "../../services/trial.service";
import {TagNames} from "../../components/constants/tag-names";

@Component({
  selector: 'app-create-trial',
  templateUrl: './create-trial.component.html',
  styleUrls: ['./create-trial.component.scss']
})

@Injectable({providedIn: 'root'})
export class CreateTrialComponent implements OnInit{
  public tagCreateNew: string = TagNames.trialCreate;
  public currentStep: number = 1;

  constructor(private trialsService: TrialService) {

  }
  ngOnInit(): void {
  }

  private doCreateTrial(input: any) {

  }

}
