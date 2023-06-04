import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ResearchService} from "../../../../services/research.service";
import {AuthService} from "../../../../services/auth.service";
import {NgxSpinnerService} from "ngx-spinner";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Utils} from "../../../../helpers/utils";
import {map} from "rxjs";
import {UserService} from "../../../../services/user.service";
import {roles} from "../../../../models/roles";
import {searchParams} from "../../../../models/search-params";
import {HttpResponse} from "@angular/common/http";
import {Location} from "@angular/common";

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.scss']
})
@Injectable({providedIn: 'root'})
export class AddMembersComponent implements OnInit  {
  researchId: any;
  searchResults: any;

  public selectedUsers: any = [];
  searchForm: FormGroup;

  rolesList: any [] = roles;
  searchParams: any [] = searchParams;
  invalidSearchForm: boolean = false;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private researchService: ResearchService,
              private userService: UserService,
              private router: Router,
              private authService: AuthService,
              private spinner: NgxSpinnerService,
              private currentLocation: Location) {

    this.searchForm = this.formBuilder.group({
      searchKey: [ '', { } ],
      searchValue: [ '', { } ],
    });
  }
  ngOnInit(): void {
    this.researchId = this.route.snapshot.paramMap.get('id');
    console.log("Research %d", this.researchId);

    this.searchForm = this.formBuilder.group({
      searchKey: [ '', { } ],
      searchValue: [ '', { } ],
    });
  }

  onSubmit() {
    this.searchResults = [];

    let currentKey = this.searchForm.get('searchKey');
    let currentValue = this.searchForm.get('searchValue');

    this.invalidSearchForm = false;

    currentKey?.setValidators(Validators.required);
    currentValue?.setValidators(Validators.required);

    currentKey?.updateValueAndValidity();
    currentValue?.updateValueAndValidity();

    if (currentKey?.valid && currentValue?.valid) {
      this.spinner.show();
      console.log("Search parameters are valid");
      currentKey?.markAsUntouched();
      currentValue?.markAsUntouched();

      // START SEARCH

      let value = this.searchForm.getRawValue();
      console.log(value);
      let searchKey = value.searchKey;
      let searchValue = value.searchValue;
      searchValue = searchValue.trim();
      console.log(searchKey);
      console.log(searchValue);

      if (searchKey == 'ROLE') {
        this.userService.findByRole(searchValue).subscribe(
          {
            next: (response: HttpResponse<any>) => {
              this.searchResults = response.body.payload;
              this.spinner.hide();
            },
            error: (err) => {
              console.log("Error encountered at researchService.findUsersByRole service call: ", err);
              if (err.status == 403) {
                console.log("Invalid token.");
                this.authService.clearLocalStorage();
                alert("Su sesión ha finalizado, por favor ingrese sus credenciales nuevamente.");
                this.authService.updateResult(false);
                this.router.navigate(['login']);
              }

              this.spinner.hide();
            }
          }
        );
      } else if (searchKey == 'NAME') {
        this.userService.findByName(searchValue).subscribe(
          {
            next: (response: HttpResponse<any>) => {
              this.searchResults = response.body.payload;
              this.spinner.hide();
            },
            error: (err) => {
              console.log("Error encountered at researchService.findUsersByRole service call: ", err);
              if (err.status == 403) {
                console.log("Invalid token.");
                this.authService.clearLocalStorage();
                alert("Su sesión ha finalizado, por favor ingrese sus credenciales nuevamente.");
                this.authService.updateResult(false);
                this.router.navigate(['login']);
              }
              this.spinner.hide();
            }
          }
        );
      } else if (searchKey == 'DOCUMENT_NUMBER') {

      }

      // END SEARCH
    }else{
      this.invalidSearchForm = true;
      if (!currentKey?.valid) {
        currentKey?.markAsTouched();
      }
      if (!currentValue?.valid) {
        currentValue?.markAsTouched();
      }
    }

    currentKey?.setValidators(null);
    currentValue?.setValidators(null);

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
    this.researchService.addUsers(this.researchId, usersToSend).subscribe(
      {
        next: (response: HttpResponse<any>) => {
          console.log("Response status: %d", response.status);
          this.spinner.hide();
          this.currentLocation.back(); // using this because navigate does not work (redirects to welcome page)
          // this.router.navigate(['..']);
        },
        error: (err) => {
          console.log("Error encountered at researchService.addUsers service call: ", err);
          if (err.status == 403) {
            console.log("Invalid token.");
            this.authService.clearLocalStorage();
            alert("Su sesión ha finalizado, por favor ingrese sus credenciales nuevamente.");
            this.authService.updateResult(false);
            this.spinner.hide();
            this.router.navigate(['login']);
          } else {
            this.spinner.hide();
          }
        }

      }
    );
  }

  handleSelectedUser(event: Event, index: number){
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

  getRoleName(code: string) {
    return Utils.getRoleName(code);
  }
}
