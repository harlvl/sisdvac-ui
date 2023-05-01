import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrialService {
  private api_host = "http://localhost:8080/sisdvac"
  private api_version = "/api/v1"

  private api_url = this.api_host + this.api_version
  private trial_endpoint = "/trial"
  private bearer_token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsdWlzLnZpZ3VyaWFAcHVjcC5wZSIsImlhdCI6MTY4Mjg5OTA0OCwiZXhwIjoxNjgyOTA1MDQ4fQ._RONnSPiudNVFyLJvFCx-ipzpXs0IhZrsWvqzBwQZ5c";
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.bearer_token
  });
  constructor(private _http: HttpClient) {
    console.log("Using host: %s", this.api_url);
  }

  getTrials():Observable<any> {
    const url = this.api_url + this.trial_endpoint;
    return this._http.get<any>(url, {headers: this.headers});
  }

}
