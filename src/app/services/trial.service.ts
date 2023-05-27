import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Endpoints} from "../components/constants/endpoints";
import {Trial} from "../components/interfaces/trial";

@Injectable({
  providedIn: 'root'
})
export class TrialService {
  private rootHost = Endpoints.apiV1 + Endpoints.trial;
  constructor(private httpClient: HttpClient) {
  }

  public getTrials():Observable<any> {
    const url = this.rootHost;
    return this.httpClient.get<HttpResponse<any>>(url, {observe: 'response'});
  }

  public createTrial(trial: Trial) {
    const url = this.rootHost;
    return this.httpClient.post<any>(url, trial, {observe: 'response'});
  }

  public addFormulation(id: any, formulation: any) {
    const url = this.rootHost + Endpoints.addFormulation.replace("{id}", id);
    return this.httpClient.post(url, formulation, {observe: "response"});
  }

  public evaluateFormulation(trialId: any, formulationId: any, body: any) {
    const url = this.rootHost + Endpoints.evaluateFormulation.replace("{tid}", trialId).replace("{fid}", formulationId);
    return this.httpClient.post(url, body, {observe: "response"});
  }

  public findFormulationEvaluation(trialId: any, formulationId: any) {
    const url = this.rootHost + Endpoints.findFormulationEvaluationById.replace("{tid}", trialId).replace("{fid}", formulationId);
    return this.httpClient.get(url, {observe: "response"});
  }

  public saveAnimalStudy(trialId: any, animalStudy: any) {
    const url = this.rootHost + Endpoints.saveAnimalStudy.replace("{tid}", trialId);
    return this.httpClient.post(url, animalStudy, {observe: "response"});
  }

}
