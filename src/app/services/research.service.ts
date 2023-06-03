import { Injectable } from '@angular/core';
import {Endpoints} from "../components/constants/endpoints";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResearchService {
  private rootHost = Endpoints.apiV1 + Endpoints.research
  constructor(private client: HttpClient) { }

  public findAll(): Observable<any> {
    const url = this.rootHost;
    return this.client.get<HttpResponse<any>>(url, {observe: "response"});
  }

  public findById(id: any): Observable<any> {
    const url = this.rootHost + "/" + id;
    console.log("Using URI: %s", url);
    return this.client.get<HttpResponse<any>>(url, {observe: "response"});
  }

  public findUsersByRole(id: any, role: any): Observable<any> {
    const url = this.rootHost +
      Endpoints.findUsersByRole.replace("{id}", id).replace("{key}", role);
    console.log("Using URI: %s", url);
    return this.client.get<HttpResponse<any>>(url, {observe: "response"});
  }

  public addUsers(id: any, users: any): Observable<any> {
    const url = this.rootHost + Endpoints.addUsers.replace("{id}", id);
    console.log("Using URI: %s", url);
    return this.client.post(url, {"users": users}, {observe: "response"});
  }

  public findAnimalStudiesByUserDocumentNumber(documentNumber: string): Observable<any> {
    const url = this.rootHost + Endpoints.findAnimalStudiesByUser
        .replace("{documentNumber}", documentNumber);
    return this.client.get<HttpResponse<any>>(url, {observe: "response"})
  }

  public findClinicalStudiesByUserDocumentNumber(documentNumber: string):Observable<any> {
    const url = this.rootHost + Endpoints.findClinicalStudiesByUser
      .replace("{documentNumber}", documentNumber);
    return this.client.get<HttpResponse<any>>(url, {observe: "response"})
  }

  public findTrialsByUserDocumentNumber(documentNumber: string): Observable<any> {
    const url = this.rootHost +
      Endpoints.findTrialsByUserDocumentNumber.replace("{documentNumber}", documentNumber);
    return this.client.get(url, {observe: "response"})

  }
}
