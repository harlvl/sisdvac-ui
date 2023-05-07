import {Component, EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TrialService} from "../services/trial.service";
import {map} from "rxjs";
import {Trial} from "../components/interfaces/trial";
import {ResearchService} from "../services/research.service";
import {Role} from "../components/constants/role";
import {RoleEnum} from "../components/enums/roleEnum";
import {UserService} from "../services/user.service";
import {TagNames} from "../components/constants/tag-names";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss'],
})

@Injectable({providedIn: 'root'})
export class ResearchComponent implements OnInit {
  // START tags
  tgMyTrials: string = "";
  tgNewTrial: string = "";
  tgActiveTrials: string = "";
  // END tags
  researchList: any [];

  currentUserType: number = 0;

  // for users view
  public userList: any;

  // for research view
  public isViewResearch: boolean = true;
  currentResearch: any = {};
  currentResearchUserList: any = [];

  // for view user view
  // @Output() goToViewTrialUsersMode = new EventEmitter<any>();
  public isViewUsers: boolean = false;
  public userType: string = '';
  public trialView = {} as Trial;

  // for adding members view
  isViewAddMember: boolean = false;

  // for trial view
  public isViewTrials: boolean = false;
  public currentTrialList: Trial [];

  // for searching
  public searchResults: any = [];
  public usersToAdd: any = [];
  public searchKey: string = "Nombre";
  public searchValue: string = "";


  constructor(private route: ActivatedRoute,
              private trialsService: TrialService,
              private researchService: ResearchService,
              private userService : UserService,
              private router: Router) {
    this.tgNewTrial = TagNames.trialCreate;
    this.tgMyTrials = TagNames.myTrials;
    this.tgActiveTrials = TagNames.activeTrials;
    this.currentTrialList = [];
    this.researchList = [];
    this.currentResearchUserList = [];
  }

  public ngOnInit(): void {
    this.currentTrialList = [];
    // this.getTrials();
    this.getResearches();
  }

  getResearches() {
    this.researchService.findAll().pipe(map((res) => {
      return res;
    })).subscribe((response) => {
      const hits = response.hits;
      this.researchList = response.body.payload;
      this.currentTrialList = response.body.payload[0].trials;
    });
  }

  goToAddMember(currentResearch: any) {
    this.setViewToAddMember();
  }

  goToResearchTrialsView(i: number, id: any) {
    console.log("Trial list length: %d", this.currentTrialList.length);
    this.setViewToTrials();
  }

  goToResearchUsersView(i: any, id: any, role: any) {
    if (role != null) {
      // search by role
      this.researchService.findUsersByRole(id, role).pipe(map((res) => {
        return res;
      })).subscribe((response) => {
        this.currentResearchUserList = response.body.payload;
        this.currentResearch = this.researchList[i];
        console.log(this.currentResearchUserList);
        this.setViewToUsers();
      });
    } else {
      // search all
      this.researchService.findById(id).pipe(map((res) => {
        return res;
      })).subscribe((response) => {
        this.currentResearchUserList = response.body.payload.users;
        this.currentResearch = this.researchList[i];
        console.log(this.currentResearchUserList);
        this.setViewToUsers();
      });
    }
  }

  private setViewToUsers() {
    this.isViewUsers = true;
    this.isViewTrials = false;
    this.isViewResearch = false;
    this.isViewAddMember = false;
  }

  private setViewToResearches() {
    this.isViewUsers = false;
    this.isViewTrials = false;
    this.isViewResearch = true;
    this.isViewAddMember = false;
  }
  private setViewToTrials() {
    this.isViewUsers = false;
    this.isViewTrials = true;
    this.isViewResearch = false;
    this.isViewAddMember = false;
  }

  private setViewToAddMember() {
    this.isViewUsers = false;
    this.isViewTrials = false;
    this.isViewResearch = false;
    this.isViewAddMember = true;
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
        this.trialView = this.currentTrialList[i];
        break;
      case 2:
        this.isViewUsers = true;
        this.userType = 'Doctores principales';
        // this.goToViewTrialUsersMode.emit(true);
        this.trialView = this.currentTrialList[i];
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

  goBackToMembers() {
    //TODO refresh members list
    this.setViewToUsers();
  }

  doSearch(form: NgForm) {
    if (this.searchKey == null || this.searchValue == null || this.searchValue == "") {
      console.log("No search parameters provided!");
      return;
    }

    // TODO validations
    if (this.searchKey == "role") {
      this.userService.findByRole(this.searchValue).pipe(map((res) => {
        return res;
      })).subscribe((response) => {
        this.searchResults = response.body.payload;
        this.usersToAdd = this.searchResults; // TODO update to only include selected users
        console.log("Search results:")
        console.log(this.searchResults);
      });
    }
  }

  doAddMembers() {
    if (this.usersToAdd == null || this.usersToAdd.length == 0) {
      console.log("No users have been selected.");
      return;
    }

    // at this point we do have users
    this.researchService.addUsers(this.currentResearch.id, this.usersToAdd).pipe(map((res) => {
      return res;
    })).subscribe((response) => {
      console.log("Response status: %d", response.status);
      console.log(response.body.payload);
    });

    this.goBackToMembers();
  }
}
