import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class SalesReturnOrderDetailsService {

  constructor(private http: HttpClient) { }



  public save(data: any, formMode: FormMode): Observable<any> {
    if(formMode === FormMode.CREATE){
      return this.http.post<any>(baseURL + '/salesInvoiceReturnDetails/saveItemInSalesInvoiceReturn',  data);
    }else{
      return this.http.put<any>(baseURL + '/salesInvoiceReturnDetails/updateItemInSalesInvoiceReturn',  data);
    }
  }



  public delete(id: number): Observable<any> {
    return this.http.delete<any>(baseURL + '/salesInvoiceReturnDetails/deleteItemInOrderReturn/'+id);
  }


}
