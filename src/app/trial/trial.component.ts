import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TrialService} from "../services/trial.service";
import {map} from "rxjs";
import {Trial} from "../components/interfaces/trial";

@Component({
  selector: 'app-trial',
  templateUrl: './trial.component.html',
  styleUrls: ['./trial.component.scss'],
})

@Injectable({providedIn: 'root'})
export class TrialComponent implements OnInit {

  projects: any;
  trialList: Trial [];

  constructor(private route: ActivatedRoute, private trialsService: TrialService, private router: Router) {
    this.trialList = [];
  }

  public ngOnInit(): void {
    this.trialList = [];
    this.getTrials();
  }

  getTrials() {
    this.trialsService.getTrials().pipe(map((res) => {
      return res;
    })).subscribe((response) => {
      console.log(response);
      var hits = response.hits;
      this.trialList = response.payload;
    })
  }

  onSelectDetalle(project: any) {
    console.log("onSelectDetalle");
  }

  onSelectUpdateProject(project: any) {
    console.log("onSelectUpdateProject");
  }

  checkTrial(i: number) {

  }

  checkAdvance() {

  }
}
