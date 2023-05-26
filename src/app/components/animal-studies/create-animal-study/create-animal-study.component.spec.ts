import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnimalStudyComponent } from './create-animal-study.component';

describe('CreateAnimalStudyComponent', () => {
  let component: CreateAnimalStudyComponent;
  let fixture: ComponentFixture<CreateAnimalStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAnimalStudyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAnimalStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
