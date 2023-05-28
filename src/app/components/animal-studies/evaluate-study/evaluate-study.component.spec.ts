import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateStudyComponent } from './evaluate-study.component';

describe('EvaluateStudyComponent', () => {
  let component: EvaluateStudyComponent;
  let fixture: ComponentFixture<EvaluateStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluateStudyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluateStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
