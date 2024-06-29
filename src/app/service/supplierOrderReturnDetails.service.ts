import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class SupplierOrderReturnDetailsService {

  constructor(private http: HttpClient) { }


  public save(data: any, formMode: FormMode): Observable<any> {
    if(formMode === FormMode.CREATE){
      return this.http.post<any>(baseURL + '/supplierOrderReturnDetails/saveItemInOrderReturn',  data);
    }else{
      return this.http.put<any>(baseURL + '/supplierOrderReturnDetails/updateItemInOrderReturn',  data);
    }
  }


  public delete(id: number): Observable<any> {
    return this.http.delete<any>(baseURL + '/supplierOrderReturnDetails/deleteItemInOrderReturn/'+id);
  }


  getAllData(): Observable<any> {
    return this.http.get(baseURL + '/salesInvoice/getAllData');
  }


}
