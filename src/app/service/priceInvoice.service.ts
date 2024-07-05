import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class PriceInvoiceService {

  constructor(private http: HttpClient) { }



  findAll(): Observable<any> {
    return this.http.get(baseURL + '/priceInvoice');
  }

  findById(id : number):Observable<any> {
    return this.http.get(baseURL + '/priceInvoice/'+id);
  }



  public save(data: any, formMode: FormMode): Observable<any> {
    if(formMode === FormMode.CREATE){
      return this.http.post<any>(baseURL + '/priceInvoice',  data);
    }else{
      return this.http.put<any>(baseURL + '/priceInvoice',  data);
    }
  }


  public delete(id: number): Observable<any> {
    return this.http.delete<any>(baseURL + '/priceInvoice/'+id);
  }

  public saveItem(data: any): Observable<any> {
    return this.http.post<any>(baseURL + '/priceInvoice/saveItem',  data);
  }


  public deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(baseURL + '/priceInvoice/deleteItem/'+id);
  }


}
