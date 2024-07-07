import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class SalesReturnService {

  constructor(private http: HttpClient) { }



  findAll(pageIndex, pageSize): Observable<any> {
    return this.http.get(baseURL + '/salesInvoiceReturn?pageIndex='+pageIndex+'&pageSize='+pageSize);
  }

  findById(id : number):Observable<any> {
    return this.http.get(baseURL + '/salesInvoiceReturn/'+id);
  }



  public save(data: any,formMode: FormMode): Observable<any> {

    if(formMode === FormMode.CREATE){
      return this.http.post<any>(baseURL + '/salesInvoiceReturn',  data);
    }else{
      return this.http.put<any>(baseURL + '/salesInvoiceReturn',  data);
    }
  }


  public approve(data: any): Observable<any> {
    return this.http.post<any>(baseURL + '/salesInvoiceReturn/approveSalesReturnInvoice',  data);
  }

  getAllData(): Observable<any> {
    return this.http.get(baseURL + '/salesInvoiceReturn/getAllData');
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(baseURL + '/salesInvoiceReturn/'+id);
  }


  search(formData: any): Observable<any> {

    var id = Number(formData.id);
    var customerId =Number( formData.customer);


    if(formData.toDate !== null && formData.fromDate !== null){

      var toDate = new Date(formData.toDate);
      toDate.setDate(toDate.getDate() + 1);
      var to_Date = toDate.toISOString().substring(0, 10);

      var fromDate = new Date(formData.fromDate);
      fromDate.setDate(fromDate.getDate() + 1);
      var from_Date = fromDate.toISOString().substring(0, 10);

      return this.http.get(`${baseURL}/salesInvoiceReturn/search?id=${id}&customerId=${customerId}&toDate=${to_Date}&fromDate=${from_Date}`);
    }else{
      return this.http.get(`${baseURL}/salesInvoiceReturn/search?id=${id}&customerId=${customerId}`);
    }

  }
}
