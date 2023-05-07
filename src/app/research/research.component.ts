import {Component, EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TrialService} from "../services/trial.service";
import {map} from "rxjs";
import {Trial} from "../components/interfaces/trial";
import {ResearchService} from "../services/research.service";
import {Role} from "../components/constants/role";
import {RoleEnum} from "../components/enums/roleEnum";

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss'],
})

@Injectable({providedIn: 'root'})
export class ResearchComponent implements OnInit {
  researchList: any [];
  trialList: Trial [];
  currentUserType: number = 0;

  // for research view
  public isViewResearch: boolean = true;
  public isViewTrials: boolean = false;
  currentResearch: any = {};

  // for view user view
  @Output() goToViewTrialUsersMode = new EventEmitter<any>();
  public isViewUsers: boolean = false;
  public userType: string = '';
  public trialView = {} as Trial;
  public userListView: any = [];

  constructor(private route: ActivatedRoute,
              private trialsService: TrialService,
              private researchService: ResearchService,
              private router: Router) {
    this.trialList = [];
    this.researchList = [];
    this.userListView.push({name: "Luis", role: "DOCTOR", docNumber:"71271921"});
  }

  public ngOnInit(): void {
    this.trialList = [];
    // this.getTrials();
    this.getResearches();
  }

  getResearches() {
    this.researchService.findAll().pipe(map((res) => {
      return res;
    })).subscribe((response) => {
      const hits = response.hits;
      this.researchList = response.body.payload;
      this.trialList = response.body.payload[0].trials;
    });
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
        this.isViewUsers = true;
        this.userType = 'Doctores principales';
        // this.goToViewTrialUsersMode.emit(true);
        this.trialView = this.trialList[i];
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

  editUser(i: number) {
    console.log("Editing");
  }

  // returns from user list view
  goBack() {
    this.isViewUsers = false;
  }

  checkTrials(i: number) {
    this.isViewResearch = false;
    this.isViewUsers = false;
    this.isViewTrials = true;
  }

  checkUsers(i: number) {
    this.isViewUsers = true;
    this.isViewResearch = false;
    this.isViewTrials = false;

    this.currentResearch = this.researchList[i];
  }

  getRole(code: string) {
    switch (code) {
      case RoleEnum.DOCTOR_MEMBER:
        return Role.doctor_member;
      default:
        return Role.admin;
    }
  }
}
