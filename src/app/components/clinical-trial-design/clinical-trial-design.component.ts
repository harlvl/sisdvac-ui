import {Component, Injectable, OnInit} from '@angular/core';
import {ResearchService} from "../../services/research.service";
import {AuthService} from "../../services/auth.service";
import {NgxSpinnerService} from "ngx-spinner";
import {map} from "rxjs";
import {EvaluationStatusEnum} from "../enums/evaluation-status-enum";

@Component({
  selector: 'app-clinical-trial-design',
  templateUrl: './clinical-trial-design.component.html',
  styleUrls: ['./clinical-trial-design.component.scss']
})
@Injectable({providedIn: 'root'})
export class ClinicalTrialDesignComponent implements OnInit {

  // for displaying studies
  documentNumber: any;
  studies: any = [];

  constructor(private researchService: ResearchService,
              private authService: AuthService,
              private spinner: NgxSpinnerService) {
  }
  ngOnInit(): void {
    this.spinner.show();
    this.documentNumber = this.authService.getDocumentNumber();
    this.researchService.findClinicalStudiesByUserDocumentNumber(this.documentNumber).pipe(map((res) =>{
      return res;
    })).subscribe((response) => {
      this.studies = response.body.payload;
      this.spinner.hide();
    })
  }

  getEvaluationStatusLabel(study: any) {
    if (study.evaluation != null) {
      return EvaluationStatusEnum.EVALUATED;
    } else {
      return EvaluationStatusEnum.NOT_EVALUATED;
    }
  }

  getStudyPhase(phase: any) {
    if (phase != null) {
      return "Fase " + phase;
    } else {
      return "";
    }
  }

}
