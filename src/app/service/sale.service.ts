import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class SalesService {

  constructor(private http: HttpClient) { }



  findAll(): Observable<any> {
    return this.http.get(baseURL + '/salesInvoice');
  }

  findById(id : number):Observable<any> {
    return this.http.get(baseURL + '/salesInvoice/'+id);
  }



  public save(data: any): Observable<any> {
    return this.http.post<any>(baseURL + '/salesInvoice',  data);
  }


  public upprove(data: any): Observable<any> {
    return this.http.post<any>(baseURL + '/salesInvoice/approve',  data);
  }


}
