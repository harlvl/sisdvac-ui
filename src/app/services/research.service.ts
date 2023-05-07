import { Injectable } from '@angular/core';
import {Endpoints} from "../components/constants/endpoints";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResearchService {
  private api_url = Endpoints.apiV1;
  private research_path = Endpoints.research;
  constructor(private _http: HttpClient) { }

  public findAll(): Observable<any> {
    const url = this.api_url + this.research_path;
    return this._http.get<HttpResponse<any>>(url, {observe: "response"});
  }
}
