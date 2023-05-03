import {Component, Injectable, OnInit} from '@angular/core';
import {TrialService} from "../../services/trial.service";

@Component({
  selector: 'app-create-trial',
  templateUrl: './create-trial.component.html',
  styleUrls: ['./create-trial.component.scss']
})

@Injectable({providedIn: 'root'})
export class CreateTrialComponent implements OnInit{

  constructor(private trialsService: TrialService) {

  }
  ngOnInit(): void {
  }

  private doCreateTrial(input: any) {

  }

}
