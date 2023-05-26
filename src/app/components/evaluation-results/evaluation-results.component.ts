import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import {map, Observable, Subscription} from "rxjs";
import {TrialService} from "../../services/trial.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-evaluation-results',
  templateUrl: './evaluation-results.component.html',
  styleUrls: ['./evaluation-results.component.scss']
})

@Injectable({providedIn: 'root'})
export class EvaluationResultsComponent implements OnInit, OnChanges, OnDestroy {
  // used for showing results
  @Input() evaluationResult: any = null;
  resultList: any = [];
  @Input() formulationTitle: any;

  // used to discern evaluation completed from evaluation displaying
  @Input() isEvaluationPerformed = false;
  @Input() isEvaluationView = false;

  // used for services
  @Input() trialId: any;
  @Input() formulationId: any;

  // used to going back to formulation
  @Output() oGoBackToFormulations = new EventEmitter<any>();

  constructor(private trialsService: TrialService) {
    console.log("results constructor");
    this.buildResultsListFromEvaluationResult();
  }

  ngOnDestroy(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
    let change: SimpleChange = changes['data'];
  }

  ngOnInit(): void {
    console.log("Results on init");
    if (this.isEvaluationView) {
      // retrieve from service
      if (this.trialId == null || this.formulationId == null) {
        console.log("TRIAL ID OR FORMULATION ID are null values.");
      } else {
        console.log("Retrieving formulation evaluation from service...");
        this.trialsService.findFormulationEvaluation(this.trialId, this.formulationId).pipe(map((res) => {
          return res;
        })).subscribe((response: HttpResponse<any>) => {
          console.log("findFormulationEvaluation status code: %d", response.status);
          this.evaluationResult = response.body.payload.items;
          console.log("Creating result list...");
          this.buildResultsListFromEvaluationResult();
        });
      }
    }else if (this.isEvaluationPerformed) {
      this.buildResultsListFromEvaluationResult();
    }



    // this.eventsSubscription = this.events.subscribe(() => this.doSomething());
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


  goBackToFormulations() {
    this.oGoBackToFormulations.emit(true);
  }

  footerTpp(input: any) {
    return "Ok";
  }
}
