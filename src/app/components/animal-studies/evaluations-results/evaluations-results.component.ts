import {Component, Injectable, Input, OnInit} from '@angular/core';
import {ResearchService} from "../../../services/research.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {NgxSpinnerService} from "ngx-spinner";
import {TrialService} from "../../../services/trial.service";

@Component({
  selector: 'app-evaluations-results',
  templateUrl: './evaluations-results.component.html',
  styleUrls: ['./evaluations-results.component.scss']
})
@Injectable({providedIn: 'root'})
export class EvaluationsResultsComponent implements OnInit {
  trialId: any;
  advanceId: any;
  evaluationResult: any = null;
  resultList: any = [];

  constructor(private researchService: ResearchService,
              private trialService: TrialService,
              private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private spinner: NgxSpinnerService) {
    this.trialId = null;
    this.advanceId = null;
  }


  ngOnInit(): void {
    this.spinner.show();
    this.route.queryParams.subscribe(params => {
      this.trialId = params['tid'];
      this.advanceId = params['aid'];
    });

    if (this.trialId == null || this.advanceId == null) {
      console.log("Trial id or advance id are null");
      return;
    }

    this.trialService.findAnimalStudyEvaluation(this.trialId, this.advanceId).subscribe(
      {
        next: (response) => {
          this.evaluationResult = response.body.payload.items;
          this.buildResultsListFromEvaluationResult();
          this.spinner.hide();
        },
        error: (err) => {
          console.log("Error encountered at trialService.findAnimalStudyEvaluation service call: ", err);
          this.spinner.hide();
          if (err.status == 403) {
            this.handleTokenInvalidError();
          }
        }
      }
    );
  }

  private buildResultsListFromEvaluationResult() {
    if (this.evaluationResult != null) {
      this.resultList.push({'value': this.evaluationResult['IMMUNOGENICITY'], 'key': this.translateKey('IMMUNOGENICITY')});
      this.resultList.push({'value': this.evaluationResult['EFFICACY'], 'key': this.translateKey('EFFICACY')});
      this.resultList.push({'value': this.evaluationResult['SAFETY_INDEX'], 'key': this.translateKey('SAFETY_INDEX')});
      this.resultList.push({'value': this.evaluationResult['EFFICIENCY'], 'key': this.translateKey('EFFICIENCY')});
    }
  }
  translateKey(key: any) {
    if (key == 'IMMUNOGENICITY') {
      return 'Inmunogenicidad';
    }else if (key == 'EFFICACY') {
      return 'Eficacia';
    }else if (key == 'SAFETY_INDEX') {
      return 'Índice de seguridad';
    }else if (key == 'EFFICIENCY') {
      return 'Eficiencia';
    } else {
      return 'Sin input';
    }
  }


  footerTpp(input: any) {
    return "--";
  }

  handleTokenInvalidError() {
    console.log("Invalid token.");
    this.authService.clearLocalStorage();
    alert("Su sesión ha finalizado, por favor ingrese sus credenciales nuevamente.");
    this.authService.updateResult(false);
    this.router.navigate(['login']);
  }

}
