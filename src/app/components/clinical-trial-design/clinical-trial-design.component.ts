import {Component, Injectable, OnInit} from '@angular/core';
import {ResearchService} from "../../services/research.service";
import {AuthService} from "../../services/auth.service";
import {NgxSpinnerService} from "ngx-spinner";
import {map} from "rxjs";
import {EvaluationStatusEnum} from "../enums/evaluation-status-enum";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";

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
              private router: Router,
              private authService: AuthService,
              private spinner: NgxSpinnerService) {
  }
  ngOnInit(): void {
    this.spinner.show();
    this.documentNumber = this.authService.getDocumentNumber();
    this.researchService.findClinicalStudiesByUserDocumentNumber(this.documentNumber).subscribe(
      {
        next: (response:HttpResponse<any>) => {
          this.studies = response.body.payload;
          this.spinner.hide();
        },
        error: (err) => {
          console.log("Error encountered at researchService.findClinicalStudiesByUserDocumentNumber service call: ", err);
          this.spinner.hide();
          if (err.status == 403) {
            console.log("Invalid token.");
            this.authService.clearLocalStorage();
            alert("Su sesión ha finalizado, por favor ingrese sus credenciales nuevamente.");
            this.authService.updateResult(false);
            this.router.navigate(['login']);
          }
        }
      }
    );
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
