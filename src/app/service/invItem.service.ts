import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class InvItemService {

  constructor(private http: HttpClient) { }
  findAll(): Observable<any> {
    return this.http.get(baseURL + '/itemcard');
  }


  findCreateData(): Observable<any> {
    return this.http.get(baseURL + '/itemcard/createData');
  }
    
  
  public save(requestbody: any): Observable<any> {
    return this.http.post<any>(baseURL + '/itemcard/save', requestbody);
  }

  public update(requestbody: any): Observable<any> {
    return this.http.put<any>(baseURL + '/itemcard/update', requestbody);
  }

}