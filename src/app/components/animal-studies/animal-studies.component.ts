import {Component, Injectable, OnInit} from '@angular/core';
import {RouteNames} from "../constants/route-names";

@Component({
  selector: 'app-animal-studies',
  templateUrl: './animal-studies.component.html',
  styleUrls: ['./animal-studies.component.scss']
})

@Injectable({providedIn: 'root'})
export class AnimalStudiesComponent implements OnInit {
  createNewAnimalStudy() {

  }

  ngOnInit(): void {
  }
}
