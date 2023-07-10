import { Injectable } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ParamService {

  constructor(private activatedRoute: ActivatedRoute) { }
  getParams(): HttpParams {
    let orgId: string = this.activatedRoute.snapshot.queryParamMap.get("organizationId")
    if (orgId) {
      localStorage.setItem("organizationId", orgId)
      return new HttpParams().set("organizationId", orgId)
    } else if (localStorage.getItem("organizationId")) {
      orgId = localStorage.getItem("organizationId")
      return new HttpParams().set("organizationId", orgId)
    }
    return null
  }
}
