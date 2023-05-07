import { Injectable } from '@angular/core';
import {Endpoints} from "../components/constants/endpoints";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api_url = Endpoints.apiV1;
  private user_path = Endpoints.user;
  private userServiceUrl = this.api_url + this.user_path;
  constructor(private _http: HttpClient) { }

  public findByRole(role: any):Observable<any> {
    const url = this.userServiceUrl + Endpoints.usersByRole + role;
    return this._http.get<HttpResponse<any>>(url, {observe: "response"});
  }

  public findByDocumentNumber(documentNumber: any): Observable<any> {
    const url = this.userServiceUrl + Endpoints.usersByDocumentNumber + documentNumber;
    return this._http.get<HttpResponse<any>>(url, {observe: "response"});
  }
  public findByName(key: any): Observable<any> {
    const url = this.userServiceUrl + Endpoints.usersByName + key;
    return this._http.get<HttpResponse<any>>(url, {observe: "response"});
  }
}
