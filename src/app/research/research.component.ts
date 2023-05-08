import {Component, EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TrialService} from "../services/trial.service";
import {map} from "rxjs";
import {Trial} from "../components/interfaces/trial";
import {ResearchService} from "../services/research.service";
import {UserService} from "../services/user.service";
import {TagNames} from "../components/constants/tag-names";
import {NgForm} from "@angular/forms";
import {Utils} from "../helpers/utils";
import {FormulationItemTypeEnum} from "../components/enums/formulationItemTypeEnum";
import {FormulationItem} from "../components/interfaces/formulationItem";
import {HttpResponse} from "@angular/common/http";

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

  // for research trials view
  public isViewTrials: boolean = false;
  public currentTrialList: Trial [];

  // for trial view
  public isViewTrial: boolean = false;
  public currentTrial: any;

  // for searching
  public searchResults: any = [];
  public selectedUsers: any = [];
  public searchKey: string = "Nombre";
  public searchValue: string = "";
  public isViewAddFormulation: boolean = false;

  // for adding new formulation
  public addFormulationStep: number = 1;
  isFormulationReady: boolean = false;
  formulationSize: string = "";
  formulationIntegrity: string = "";
  formulationComposition: string = "";
  formulationSterility: string = "";
  formulationOsmolality: string = "";

  // for viewing formulations
  isViewFormulations: boolean = false;

  // for evaluating formulation
  isViewEvaluateFormulation: boolean = false;

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

  goToSingleTrialView(i: number) {
    this.currentTrial = this.currentTrialList[i];
    this.setViewToTrial();
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
    this.isViewTrial = false;
    this.isViewFormulations = false;
    this.isViewEvaluateFormulation = false;
  }

  private setViewToResearches() {
    this.isViewUsers = false;
    this.isViewTrials = false;
    this.isViewResearch = true;
    this.isViewAddMember = false;
    this.isViewTrial = false;
    this.isViewAddFormulation = false;
    this.isViewFormulations = false;
    this.isViewEvaluateFormulation = false;
  }
  private setViewToTrials() {
    this.isViewUsers = false;
    this.isViewTrials = true;
    this.isViewResearch = false;
    this.isViewAddMember = false;
    this.isViewTrial = false;
    this.isViewAddFormulation = false;
    this.isViewFormulations = false;
    this.isViewEvaluateFormulation = false;
  }

  private setViewToTrial() {
    this.isViewUsers = false;
    this.isViewTrials = false;
    this.isViewResearch = false;
    this.isViewAddMember = false;
    this.isViewTrial = true;
    this.isViewAddFormulation = false;
    this.isViewFormulations = false;
    this.isViewEvaluateFormulation = false;
  }

  private setViewToAddMember() {
    this.isViewUsers = false;
    this.isViewTrials = false;
    this.isViewResearch = false;
    this.isViewAddMember = true;
    this.isViewTrial = false;
    this.isViewAddFormulation = false;
    this.isViewFormulations = false;
    this.isViewEvaluateFormulation = false;
  }

  private setViewToAddFormulation() {
    this.isViewUsers = false;
    this.isViewTrials = false;
    this.isViewResearch = false;
    this.isViewAddMember = false;
    this.isViewTrial = false;
    this.isViewAddFormulation = true;
    this.isViewFormulations = false;
    this.isViewEvaluateFormulation = false;
  }

  public setViewToFormulations() {
    this.isViewUsers = false;
    this.isViewTrials = false;
    this.isViewResearch = false;
    this.isViewAddMember = false;
    this.isViewTrial = false;
    this.isViewAddFormulation = false;
    this.isViewFormulations = true;
    this.isViewEvaluateFormulation = false;
  }

  public setViewToEvaluateFormulation() {
    this.isViewUsers = false;
    this.isViewTrials = false;
    this.isViewResearch = false;
    this.isViewAddMember = false;
    this.isViewTrial = false;
    this.isViewAddFormulation = false;
    this.isViewFormulations = false;
    this.isViewEvaluateFormulation = true;
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
    return Utils.getRoleName(code);
  }

  getTrialStageName(code: string) {
    return Utils.getTrialStage(code);
  }

  goBackToResearches() {
    this.setViewToResearches();
  }

  goBackToTrials() {
    this.setViewToTrials();
  }

  goBackToMembers() {
    //TODO refresh members list
    this.setViewToUsers();
  }

  goBackToTrial() {
    this.setViewToTrial();
  }

  doSearch(form: NgForm) {
    // clear results table
    this.searchResults = [];

    if (this.searchKey == null || this.searchValue == null || this.searchValue == "") {
      console.log("No search parameters provided!");
      //TODO add error message when parameters are missing
      return;
    }

    // TODO validations
    if (this.searchKey == "role") {
      this.userService.findByRole(this.searchValue.trim()).pipe(map((res) => {
        return res;
      })).subscribe((response) => {
        this.searchResults = response.body.payload;
        // this.selectedUsers = this.searchResults; // TODO update to only include selected users
        console.log("Search results by role:")
        console.log(this.searchResults);
      });
    } else if (this.searchKey == 'name') {
      this.userService.findByName(this.searchValue.trim()).pipe(map((res) => {
        return res;
      })).subscribe((response) => {
        this.searchResults = response.body.payload;
        // this.selectedUsers = this.searchResults; // TODO update to only include selected users
        console.log("Search results by name:")
        console.log(this.searchResults);
      });
    }else if (this.searchKey == 'docNumber') {
      this.userService.findByDocumentNumber(this.searchValue.trim()).pipe(map((res) => {
        return res;
      })).subscribe((response) => {
        this.searchResults = response.body.payload;
        // this.selectedUsers = this.searchResults; // TODO update to only include selected users
        console.log("Search results by document number:")
        console.log(this.searchResults);
      });
    } else {
      console.log("Invalid search key");
    }
  }

  doAddMembers() {
    if (this.selectedUsers == null || this.selectedUsers.length == 0) {
      console.log("No users have been selected.");
      return;
    }

    let usersToSend = [];
    for (let i = 0; i < this.selectedUsers.length; i++) {
      usersToSend.push(this.selectedUsers[i].content);
    }
    // at this point we do have users
    this.researchService.addUsers(this.currentResearch.id, usersToSend).pipe(map((res) => {
      return res;
    })).subscribe((response) => {
      console.log("Response status: %d", response.status);
      console.log(response.body.payload);
    });
  // TODO add success message or toast
    this.goBackToMembers();
  }

  handleSelectedUser(event: Event, index: number) {
    const isChecked = (<HTMLInputElement>event.target).checked;
    if (isChecked) {
      console.log("Element checked: %d", index);
      let currentId = this.searchResults[index].id;
      let element = {"id": this.searchResults[index].id, "content": this.searchResults[index]};
      if (this.selectedUsers != null && this.selectedUsers.length == 0) {
        this.selectedUsers.push(element);
        console.log("Selected users size: %d", this.selectedUsers.length);
        console.log(this.selectedUsers);
        return;
      }

      for (let i = 0; i < this.selectedUsers.length; i++) {
        if (currentId == this.selectedUsers[i].id) {
          break;
        }
        this.selectedUsers.push(element);
      }

      console.log("Selected users size: %d", this.selectedUsers.length);
      console.log(this.selectedUsers);
    } else {
      console.log("Element unchecked: %d", index);
      let currentId = this.searchResults[index].id;
      for (let i = 0; i < this.selectedUsers.length; i++) {
        if (currentId == this.selectedUsers[i].id) {
          this.selectedUsers.splice(i, 1);
        }
      }

      console.log("Selected users size: %d", this.selectedUsers.length);
      console.log(this.selectedUsers);
    }
  }

  goToFormulations(formulations: any) {
    this.setViewToFormulations();
  }

  goToAddFormulation(currentResearch: any, currentTrial: any) {
    this.setViewToAddFormulation();
  }

  confirmAddFormulation(form: any) {
    console.log("Confirmada la creación");
    //TODO add loading icon

    //TODO add validations
    let items: FormulationItem [] = [];


    items.push({
      type: FormulationItemTypeEnum.SIZE,
      detail: this.formulationSize,
    });

    items.push({
      type: FormulationItemTypeEnum.INTEGRITY,
      detail: this.formulationIntegrity,
    });

    items.push({
      type: FormulationItemTypeEnum.COMPOSITION,
      detail: this.formulationComposition,
    });

    items.push({
      type: FormulationItemTypeEnum.STERILITY,
      detail: this.formulationSterility,
    });

    items.push({
      type: FormulationItemTypeEnum.OSMOLALITY,
      detail: this.formulationOsmolality,
    });
    let payload = {"items": items};

    this.trialsService.addFormulation(this.currentTrial.id, payload).pipe(map((res) => {
      return res;
    })).subscribe((response:HttpResponse<any>) => {
      console.log("Add formulation status code: %d", response.status);
      console.log(response.body.payload);
    });

    //TODO add router to navigate
    this.setViewToTrial();

  }

  getFormulationStatus(status: any) {
    if (status == 'ACTIVE') {
      return 'Activa';
    } else {
      return 'Inactiva';
    }
  }

  goToEvaluateFormulationView(index: number, id: any, formulation: any) {
    console.log("Starting evaluation for formulation [%d]...", formulation.id);

    //TODO create and call evaluate formulation service
  }
}
