import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class SupplierOrderReturnService {

  constructor(private http: HttpClient) { }



  findAll(): Observable<any> {
    return this.http.get(baseURL + '/supplierOrderReturn');
  }

  findById(id : number):Observable<any> {
    return this.http.get(baseURL + '/supplierOrderReturn/'+id);
  }



  public save(data: any, formMode: FormMode): Observable<any> {
    if(formMode === FormMode.CREATE){
      return this.http.post<any>(baseURL + '/supplierOrderReturn',  data);
    }else{
      return this.http.put<any>(baseURL + '/supplierOrderReturn',  data);
    }

  }


  public upprove(data: any): Observable<any> {
    return this.http.post<any>(baseURL + '/supplierOrderReturn/approve',  data);
  }


  public delete(id: any): Observable<any> {
    return this.http.delete<any>(baseURL + '/supplierOrderReturn/'+id);
  }



}
