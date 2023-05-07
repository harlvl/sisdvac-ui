import {Component, EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TrialService} from "../services/trial.service";
import {map} from "rxjs";
import {Trial} from "../components/interfaces/trial";
import {ResearchService} from "../services/research.service";
import {Role} from "../components/constants/role";
import {RoleEnum} from "../components/enums/roleEnum";
import {UserService} from "../services/user.service";

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

  // for users view
  public userList: any;

  // for research view
  public isViewResearch: boolean = true;
  public isViewTrials: boolean = false;
  currentResearch: any = {};
  currentResearchUserList: any = [];
  currentResearchMainDoctors: any = [];

  // for view user view
  @Output() goToViewTrialUsersMode = new EventEmitter<any>();
  public isViewUsers: boolean = false;
  public userType: string = '';
  public trialView = {} as Trial;

  constructor(private route: ActivatedRoute,
              private trialsService: TrialService,
              private researchService: ResearchService,
              private userService : UserService,
              private router: Router) {
    this.trialList = [];
    this.researchList = [];
    this.currentResearchUserList = [];
    // this.getUsersByRole("ADMIN");
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

  goToResearchUsersView(i: any, id: any, role: any) {
    this.researchService.findUsersByRoleUtil(id, role).pipe(map((res) => {
      return res;
    })).subscribe((response) => {
      this.currentResearchUserList = response.body.payload;
      this.currentResearch = this.researchList[i];
      console.log(this.currentResearchUserList);
      this.setViewToUsers(role);
    });

  }

  private setViewToUsers(role: any) {
    this.isViewUsers = true;
    this.isViewTrials = false;
    this.isViewResearch = false;
  }

  private setViewToResearches() {
    this.isViewUsers = false;
    this.isViewTrials = false;
    this.isViewResearch = true;
  }
  private setViewToTrials() {
    this.isViewUsers = false;
    this.isViewTrials = true;
    this.isViewResearch = false;
  }

  findUsersByRole(id: any, role: any) {
    this.userList = this.researchService.findUsersByRole(id, role);
  }

  getUsersByRole(role: any) {
    this.userService.findByRole(role).pipe(map((res) => {
      return res;
    })).subscribe((response) => {
      const hits = response.hits;
      this.userList = response.body.payload;
      console.log(this.userList);
    })
  }

  checkTrial(i: number) {
    console.log("checking %d", i);
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

  checkTrials(i: number) {
    this.isViewResearch = false;
    this.isViewUsers = false;
    this.isViewTrials = true;
  }

  getRoleName(code: string) {
    switch (code) {
      case RoleEnum.DOCTOR_MAIN:
        return Role.doctor_main;
      case RoleEnum.DOCTOR_MEMBER:
        return Role.doctor_member;
      case RoleEnum.SPONSOR:
        return Role.sponsor;
      default:
        return Role.admin;
    }
  }

  goBackToResearches() {
    this.setViewToResearches();
  }
}
