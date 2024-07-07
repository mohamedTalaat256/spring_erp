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

      return this.http.get(`${baseURL}/supplierOrder/search?id=${id}&supplierId=${supplierId}&toDate=${to_Date}&fromDate=${from_Date}`);
    }else{
      return this.http.get(`${baseURL}/supplierOrder/search?id=${id}&supplierId=${supplierId}&storeId=${storeId}`);
    }

  }


}
