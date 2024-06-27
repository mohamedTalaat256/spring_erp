import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class SalesOrderDetailsService {

  constructor(private http: HttpClient) { }


  getItemBatches(formData): Observable<any>{
    return this.http.post(baseURL + '/salesInvoiceDetails/getItemBatches', formData);
  }

  public save(data: any, formMode: FormMode): Observable<any> {
    if(formMode === FormMode.CREATE){
      return this.http.post<any>(baseURL + '/salesInvoiceDetails/saveItemInSalesInvoice',  data);
    }else{
      return this.http.put<any>(baseURL + '/salesInvoiceDetails/updateItemInSalesInvoice',  data);
    }
  }



  public delete(id: number): Observable<any> {
    return this.http.delete<any>(baseURL + '/salesInvoiceDetails/deleteItemInOrder/'+id);
  }


}
