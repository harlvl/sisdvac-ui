import {Component, EventEmitter, Injectable, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-evaluation-results',
  templateUrl: './evaluation-results.component.html',
  styleUrls: ['./evaluation-results.component.scss']
})

@Injectable({providedIn: 'root'})
export class EvaluationResultsComponent implements OnInit {
  @Output() oGoBackToFormulations = new EventEmitter<any>();

  evaluationResults: any;


  ngOnInit(): void {

  }

  goBackToFormulations() {
    this.oGoBackToFormulations.emit(true);
  }

}
