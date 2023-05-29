import {Component, Injectable, Input, OnInit} from '@angular/core';
import {ResearchService} from "../../services/research.service";
import {map} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Utils} from "../../helpers/utils";
import {EvaluationStatusEnum} from "../enums/evaluation-status-enum";

@Component({
  selector: 'app-animal-studies',
  templateUrl: './animal-studies.component.html',
  styleUrls: ['./animal-studies.component.scss']
})

@Injectable({providedIn: 'root'})
export class AnimalStudiesComponent implements OnInit {

  // for displaying animal studies
  documentNumber: any;
  @Input() trialId: any;
  animalStudies: any = [];

  // for viewing objectives
  isModeViewObjectives = false;
  animalStudy: any;

  constructor(private researchService: ResearchService,
              private authService: AuthService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    // TODO show spinner
    this.spinner.show();
    this.documentNumber = this.authService.getDocumentNumber();
    console.log("Document number: %s", this.documentNumber);
    this.researchService.findAnimalStudiesByUserDocumentNumber(this.documentNumber).pipe(map((res) => {
      return res;
    })).subscribe((response) => {
      console.log("Response status: %d", response.status);
      this.animalStudies = response.body.payload;
      this.spinner.hide();
    })
  }

  viewObjectives(i: number) {
    this.isModeViewObjectives = true;
    // EMIT A VALUE?
    this.animalStudy = this.animalStudies[i];
  }

  getAnimalModelName(input: any) {
    return Utils.getAnimalModelName(input);
  }

  getEvaluationStatusLabel(study: any) {
    if (study.evaluation != null) {
      return EvaluationStatusEnum.EVALUATED;
    } else {
      return EvaluationStatusEnum.NOT_EVALUATED;
    }
  }

  checkIfEvaluated(study: any) {
    return this.getEvaluationStatusLabel(study) == EvaluationStatusEnum.EVALUATED;
  }
}
