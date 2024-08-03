import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class PaymentService {

  constructor(private http: HttpClient) { }

  getAllData(): Observable<any> {
    return this.http.get(baseURL + '/payments/getAllData');
  }
  findAll(): Observable<any> {
    return this.http.get(baseURL + '/payments');
  }
  public save(requestbody: any, formMode: FormMode): Observable<any> {
    if(formMode === FormMode.CREATE){
      return this.http.post<any>(baseURL + '/payments', requestbody);

    }else{
      return this.http.put<any>(baseURL + `/payments/${requestbody.id}`, requestbody);

    }
  }

  expenses(id: number): Observable<any> {
    return this.http.get(baseURL + `/payments/${id}/expenses`);
  }

}