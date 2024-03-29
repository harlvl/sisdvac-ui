import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Endpoints} from "../components/constants/endpoints";
import {Trial} from "../components/interfaces/trial";

@Injectable({
  providedIn: 'root'
})
export class TrialService {
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

}
