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
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-evaluation-results',
  templateUrl: './evaluation-results.component.html',
  styleUrls: ['./evaluation-results.component.scss']
})

@Injectable({providedIn: 'root'})
export class EvaluationResultsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() evaluationResult: any = null;
  resultList: any = [];
  @Output() oGoBackToFormulations = new EventEmitter<any>();

  private eventsSubscription: Subscription = new Subscription();
  @Input() events: Observable<void> = new Observable<void>();


  constructor() {
    console.log("results constructor");
    if (this.evaluationResult != null) {
      this.resultList.push({'key': this.evaluationResult['IMMUNOGENICITY'], 'value': 'IMMUNOGENICITY'});
      this.resultList.push({'key': this.evaluationResult['EFFICACY'], 'value': 'EFFICACY'});
      this.resultList.push({'key': this.evaluationResult['SAFETY_INDEX'], 'value': 'SAFETY_INDEX'});
      this.resultList.push({'key': this.evaluationResult['EFFICIENCY'], 'value': 'EFFICIENCY'});
    }
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }


  ngOnChanges(changes: SimpleChanges): void {
    let change: SimpleChange = changes['data'];
  }

  ngOnInit(): void {
    console.log("Results on init");
    if (this.evaluationResult != null) {
      this.resultList.push({'key': this.evaluationResult['IMMUNOGENICITY'], 'value': 'IMMUNOGENICITY'});
      this.resultList.push({'key': this.evaluationResult['EFFICACY'], 'value': 'EFFICACY'});
      this.resultList.push({'key': this.evaluationResult['SAFETY_INDEX'], 'value': 'SAFETY_INDEX'});
      this.resultList.push({'key': this.evaluationResult['EFFICIENCY'], 'value': 'EFFICIENCY'});
    } else {
      console.log("Evaluation result is null");
    }
    // this.eventsSubscription = this.events.subscribe(() => this.doSomething());
  }


  doSomething() {

  }


  goBackToFormulations() {
    this.oGoBackToFormulations.emit(true);
  }

  footerTpp(input: any) {
    return "Ok";
  }
}
