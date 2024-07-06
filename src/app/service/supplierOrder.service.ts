import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class SupplierOrderService {

  constructor(private http: HttpClient) { }



  findAll(pageIndex, pageSize): Observable<any> {
    return this.http.get(baseURL + '/supplierOrder?pageIndex='+pageIndex+'&pageSize='+pageSize);
  }

  findById(id : number):Observable<any> {
    return this.http.get(baseURL + '/supplierOrder/'+id);
  }



  public save(data: any, formMode: FormMode): Observable<any> {
    if(formMode=== FormMode.CREATE){
      return this.http.post<any>(baseURL + '/supplierOrder',  data);
    }else{
      return this.http.put<any>(baseURL + '/supplierOrder',  data);
    }
  }

  public delete(id: any): Observable<any> {
    return this.http.delete<any>(baseURL + '/supplierOrder/'+id);
  }



  public upprove(data: any): Observable<any> {
    return this.http.post<any>(baseURL + '/supplierOrder/approve',  data);
  }


}
