import {Component, EventEmitter, Injectable, OnInit, Output} from '@angular/core';
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
  trialList: Trial [];
  currentUserType: number = 0;

  // for editing
  @Output() goToViewTrialUsersMode = new EventEmitter<any>();
  public isViewUsers: boolean = false;
  public userType: string = '';
  public trialView = {} as Trial;

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
      const hits = response.hits;
      this.trialList = response.body.payload;
    })
  }

  onSelectDetalle(project: any) {
    console.log("onSelectDetalle");
  }

  onSelectUpdateProject(project: any) {
    console.log("onSelectUpdateProject");
  }

  checkTrial(i: number) {
    console.log("checking %d", i);
  }

  checkAdvance() {

  }

  // user types: 1: sponsor, 2: main doctor, 3: member doctor, 4: asistant
  checkUser(userType: number, i: number) {
    console.log("Editing user type: %d", userType);
    switch (userType) {
      case 1:
        this.isViewUsers = true;
        this.userType = 'Patrocinadores';
        // this.goToViewTrialUsersMode.emit(true);
        this.trialView = this.trialList[i];
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      default:
        console.log("Current user type is not valid: %d", this.currentUserType);
        break;
    }
  }
}
