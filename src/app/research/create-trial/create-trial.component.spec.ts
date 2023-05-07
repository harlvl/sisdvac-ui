import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrialComponent } from './create-trial.component';

describe('CreateTrialComponent', () => {
  let component: CreateTrialComponent;
  let fixture: ComponentFixture<CreateTrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTrialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
