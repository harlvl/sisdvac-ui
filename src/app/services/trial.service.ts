import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Endpoints} from "../components/constants/endpoints";
import {Trial} from "../components/interfaces/trial";

@Injectable({
  providedIn: 'root'
})
export class TrialService {
  private rootHost = Endpoints.apiV1 + Endpoints.trial;
  private api_url = Endpoints.apiV1;
  private trial_endpoint = Endpoints.trial
  private headers = new HttpHeaders({
    // 'Authorization': 'Bearer ' + this.bearer_token
  });
  constructor(private _http: HttpClient) {
    console.log("Using host: %s", this.api_url);
  }

  public getTrials():Observable<any> {
    const url = this.api_url + this.trial_endpoint;
    return this._http.get<HttpResponse<any>>(url, {headers: this.headers, observe: 'response'});
  }

  public createTrial(trial: Trial) {
    const url = this.api_url + this.trial_endpoint;
    return this._http.post<any>(url, trial, {observe: 'response'});
  }

  public addFormulation(id: any, formulation: any) {
    const url = this.rootHost + Endpoints.addFormulation.replace("{id}", id);
    return this._http.post(url, formulation, {observe: "response"});
  }

  public evaluateFormulation(trialId: any, formulationId: any, body: any) {
    const url = this.rootHost + Endpoints.evaluateFormulation.replace("{tid}", trialId).replace("{fid}", formulationId);
    return this._http.post(url, body, {observe: "response"});
  }

  public findFormulationEvaluation(trialId: any, formulationId: any) {
    const url = this.rootHost + Endpoints.findFormulationEvaluationById.replace("{tid}", trialId).replace("{fid}", formulationId);
    return this._http.get(url, {observe: "response"});
  }

}
