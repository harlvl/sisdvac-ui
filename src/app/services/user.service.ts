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
    return this._http.get<HttpResponse<any>>(this.userServiceUrl + Endpoints.userByRole + role, {observe: "response"});
  }
}
