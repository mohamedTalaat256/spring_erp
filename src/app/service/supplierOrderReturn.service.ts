import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class SupplierOrderReturnService {

  constructor(private http: HttpClient) { }



  findAll(pageIndex, pageSize): Observable<any> {
    return this.http.get(baseURL + '/supplierOrderReturn?pageIndex='+pageIndex+'&pageSize='+pageSize);
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


  search(formData: any): Observable<any> {

    var id = Number(formData.id);
    var supplierId =Number( formData.supplier);
    var storeId = Number(formData.store);


    if(formData.toDate !== null && formData.fromDate !== null){

      var toDate = new Date(formData.toDate);
      toDate.setDate(toDate.getDate() + 1);
      var to_Date = toDate.toISOString().substring(0, 10);

      var fromDate = new Date(formData.fromDate);
      fromDate.setDate(fromDate.getDate() + 1);
      var from_Date = fromDate.toISOString().substring(0, 10);

      return this.http.get(`${baseURL}/supplierOrderReturn/search?id=${id}&supplierId=${supplierId}&toDate=${to_Date}&fromDate=${from_Date}`);
    }else{
      return this.http.get(`${baseURL}/supplierOrderReturn/search?id=${id}&supplierId=${supplierId}&storeId=${storeId}`);
    }

  }
}
