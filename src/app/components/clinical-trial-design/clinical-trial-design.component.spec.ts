import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalTrialDesignComponent } from './clinical-trial-design.component';

describe('ClinicalTrialDesignComponent', () => {
  let component: ClinicalTrialDesignComponent;
  let fixture: ComponentFixture<ClinicalTrialDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalTrialDesignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalTrialDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
