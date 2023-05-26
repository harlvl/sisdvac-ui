import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalTrialEvaluationComponent } from './clinical-trial-evaluation.component';

describe('ClinicalTrialEvaluationComponent', () => {
  let component: ClinicalTrialEvaluationComponent;
  let fixture: ComponentFixture<ClinicalTrialEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalTrialEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalTrialEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
