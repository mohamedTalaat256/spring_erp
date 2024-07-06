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



}
