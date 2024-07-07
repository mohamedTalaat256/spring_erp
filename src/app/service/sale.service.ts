import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class SalesService {

  constructor(private http: HttpClient) { }



  findAll(pageIndex, pageSize): Observable<any> {
    return this.http.get(baseURL + '/salesInvoice?pageIndex='+pageIndex+'&pageSize='+pageSize);
  }

  findById(id : number):Observable<any> {
    return this.http.get(baseURL + '/salesInvoice/'+id);
  }



  public save(data: any, formMode: FormMode): Observable<any> {
    if(formMode === FormMode.CREATE){
      return this.http.post<any>(baseURL + '/salesInvoice',  data);
    }else{
      return this.http.put<any>(baseURL + '/salesInvoice',  data);
    }
  }


  public approve(data: any): Observable<any> {
    return this.http.post<any>(baseURL + '/salesInvoice/approveSalesInvoice',  data);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(baseURL + '/salesInvoice/'+id);
  }

  getAllData(): Observable<any> {
    return this.http.get(baseURL + '/salesInvoice/getAllData');
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




      return this.http.get(`${baseURL}/salesInvoice/search?id=${id}&customerId=${customerId}&toDate=${to_Date}&fromDate=${from_Date}`);
    }else{
      return this.http.get(`${baseURL}/salesInvoice/search?id=${id}&customerId=${customerId}`);
    }

  }


}
