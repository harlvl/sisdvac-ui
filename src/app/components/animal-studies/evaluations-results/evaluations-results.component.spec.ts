import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationsResultsComponent } from './evaluations-results.component';

describe('EvaluationsResultsComponent', () => {
  let component: EvaluationsResultsComponent;
  let fixture: ComponentFixture<EvaluationsResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationsResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
