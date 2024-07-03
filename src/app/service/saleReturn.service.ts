import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class SalesReturnService {

  constructor(private http: HttpClient) { }



  findAll(): Observable<any> {
    return this.http.get(baseURL + '/salesInvoiceReturn');
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

}
