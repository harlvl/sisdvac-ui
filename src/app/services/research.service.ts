import { Injectable } from '@angular/core';
import {Endpoints} from "../components/constants/endpoints";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map, Observable} from "rxjs";

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

  public findUsersByRole(id: any, role: any) {
    let output;
    this.findUsersByRoleUtil(id, role).pipe(map((res) => {
      return res;
    })).subscribe((response) => {
      output = response.body.payload;
      console.log(output);
    })

    return output;
  }

  public findUsersByRoleUtil(id: any, role: any): Observable<any> {
    const url =
      this.api_url + Endpoints.research +
      Endpoints.findUsersByRole.replace("{id}", id).replace("{key}", role);
    console.log("Using URI: %s", url);
    return this._http.get<HttpResponse<any>>(url, {observe: "response"});
  }
}
