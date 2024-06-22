import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class SupplierOrderDetailsService {

  constructor(private http: HttpClient) { }


  public save(data: any, formMode: FormMode): Observable<any> {
    if(formMode === FormMode.CREATE){
      return this.http.post<any>(baseURL + '/supplierOrderDetails/saveItemInOrder',  data);
    }else{
      return this.http.put<any>(baseURL + '/supplierOrderDetails/updateItemInOrder',  data);
    }
  }


  public delete(id: number): Observable<any> {
    return this.http.delete<any>(baseURL + '/supplierOrderDetails/deleteItemInOrder/'+id);
  }


}
