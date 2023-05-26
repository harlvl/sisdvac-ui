import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalStudiesComponent } from './animal-studies.component';

describe('AnimalStudiesComponent', () => {
  let component: AnimalStudiesComponent;
  let fixture: ComponentFixture<AnimalStudiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalStudiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
