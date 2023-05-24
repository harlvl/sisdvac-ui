import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateFormulationComponent } from './evaluate-formulation.component';

describe('EvaluateFormulationComponent', () => {
  let component: EvaluateFormulationComponent;
  let fixture: ComponentFixture<EvaluateFormulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluateFormulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluateFormulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
