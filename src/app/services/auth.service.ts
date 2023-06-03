import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Credentials} from "../components/interfaces/credentials";
import {Endpoints} from "../components/constants/endpoints";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api_url = Endpoints.apiV1;
  private auth_endpoint = Endpoints.authenticate;

  private result: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  public result$: Observable<any> = this.result.asObservable();

  public updateResult(updatedValue: any) {
    this.result.next(updatedValue);

  }

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
      localStorage.setItem('firstName', body.firstName);
      localStorage.setItem('lastName', body.lastName);
      localStorage.setItem('documentNumber', body.documentNumber);
      localStorage.setItem('role', body.role);
      return response.body;
    }));
  }

  public getAccessToken() {
    return localStorage.getItem('access_token')
  }

  public getRefreshToken() {
    return localStorage.getItem('refresh_token')
  }

  public getFirstName() {
    if (localStorage.getItem("firstName") != null) {
      return localStorage.getItem("firstName");
    } else {
      return "No output";
    }

  }

  public getRole() {
    if (localStorage.getItem("role") != null) {
      return localStorage.getItem("role");
    } else {
      return "No output";
    }
  }

  public getDocumentNumber() {
    if (localStorage.getItem("documentNumber") != null) {
      return localStorage.getItem("documentNumber");
    } else {
      return "No output";
    }
  }

}
