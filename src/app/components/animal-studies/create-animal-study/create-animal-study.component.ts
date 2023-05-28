import {Component, Injectable, OnInit} from '@angular/core';
import {AnimalStudyDto} from "../../interfaces/animalStudyDto";
import {NgForm} from "@angular/forms";
import {TrialService} from "../../../services/trial.service";
import {AuthService} from "../../../services/auth.service";
import {ResearchService} from "../../../services/research.service";
import {map} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {AnimalModelEnum} from "../../enums/animalModelEnum";
import {Router} from "@angular/router";
import {RouteNames} from "../../constants/route-names";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-create-animal-study',
  templateUrl: './create-animal-study.component.html',
  styleUrls: ['./create-animal-study.component.scss']
})
@Injectable({providedIn: 'root'})
export class CreateAnimalStudyComponent implements OnInit {
  documentNumber: any;

  trials: any;
  trialsSelect: any = [];
  chosenTrial: any;

  animalModelSelect = [
    {
      name: "Microorganismo", value: AnimalModelEnum.MICRO
    },
    {
      name: "Roedor", value: AnimalModelEnum.RODENT
    },
    {
      name: "Ave", value: AnimalModelEnum.BIRD
    },
    {
      name: "Primate", value: AnimalModelEnum.PRIMATE
    }
  ];


  // for saving animal study
  animalStudyDto: AnimalStudyDto = {
    objectives: "",
    animalModel: "",
    sampleSize: 1,
    ethicalGuidelines: "",
    ethicalGuidelinesUri: "",
  }

  constructor(private router: Router,
              private spinner: NgxSpinnerService,
              private authService: AuthService,
              private trialService: TrialService,
              private researchService: ResearchService) {
    this.documentNumber = authService.getDocumentNumber();
  }

  ngOnInit(): void {
    this.spinner.show();

    if (this.documentNumber == null) {
      console.log("WARNING! Document number is null");
    }

    this.researchService.findTrialsByUserDocumentNumber(this.documentNumber).pipe(map((res) => {
      return res;
    })).subscribe((response: HttpResponse<any>) => {
      console.log("Trials found: %d", response.body.hits);
      this.trials = response.body.payload;
      for (let i = 0; i < this.trials.length; i++) {
        let currentTrial = this.trials[i];
        let name = "[" + currentTrial.insNumber + "] " + currentTrial.title;
        this.trialsSelect.push(
          {id: currentTrial.id, researchId: currentTrial.researchId, name: name}
        )
      }

      console.log("Trials select: ");
      console.log(this.trialsSelect)
      this.spinner.hide();
    });
  }

  confirmCreation(form: NgForm) {
    console.log("form:");
    console.log(form);
    console.log("AnimalStudyDto:");
    console.log(this.animalStudyDto);
    this.spinner.show();
    this.trialService.saveAnimalStudy(this.chosenTrial.id, this.animalStudyDto).pipe(map((res) => {
      return res;
    })).subscribe((response:HttpResponse<any>) => {
      console.log("Response:");
      console.log(response.body.payload);
      this.spinner.hide();
      this.router.navigate([RouteNames.animalStudies]);
    });
  }

  goBackToAnimalStudies() {
    this.router.navigate(['/animal-studies']);
  }
}
