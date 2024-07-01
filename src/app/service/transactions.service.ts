import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class TransactionService {



  constructor(private http: HttpClient) { }

  collectFindAll(): Observable<any> {
    return this.http.get(baseURL + '/transactions/collectFindAll');
  }

  exchangeFindAll(): Observable<any> {
    return this.http.get(baseURL + '/transactions/exchangeFindAll');
  }



  public collect(data: any ): Observable<any> {
    return this.http.post<any>(baseURL+ '/transactions/collect',  data);
  }

  public exchange(data: any ): Observable<any> {
    return this.http.post<any>(baseURL+ '/transactions/exchange',  data);
  }


}
