import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class InvItemCategoryService {

  constructor(private http: HttpClient) { }
  findAll(): Observable<any> {
    return this.http.get(baseURL + '/inv_itemcard_categories');
  }
  public save(requestbody: any): Observable<any> {
    return this.http.post<any>(baseURL + '/inv_itemcard_categories/save', requestbody);
  }

  public update(requestbody: any): Observable<any> {
    return this.http.put<any>(baseURL + '/inv_itemcard_categories/update', requestbody);
  }

}