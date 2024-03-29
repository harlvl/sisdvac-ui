import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map} from "rxjs";
import {Credentials} from "../components/interfaces/credentials";
import {Endpoints} from "../components/constants/endpoints";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api_url = Endpoints.apiV1;
  private auth_endpoint = Endpoints.authenticate;

  constructor(private _http: HttpClient) {
    console.log("Using host: %s", this.api_url);
  }

  public login(credentials: Credentials) {
    const url = this.api_url + this.auth_endpoint;

    return this._http.post(url, credentials, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) => {
      console.log("Response body: %s", response.body);
      const body = response.body;
      localStorage.setItem('access_token', body.access_token);
      localStorage.setItem('refresh_token', body.refresh_token);
      return response.body;
    }));
  }

  public getAccessToken() {
    return localStorage.getItem('access_token')
  }

  public getRefreshToken() {
    return localStorage.getItem('refresh_token')
  }

}
