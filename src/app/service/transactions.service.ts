import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class TransactionService {



  constructor(private http: HttpClient) { }

  collectFindAll(pageIndex,pageSize): Observable<any> {
    return this.http.get(baseURL + '/transactions/collectFindAll?pageIndex='+pageIndex+'&pageSize='+pageSize);
  }

  exchangeFindAll(pageIndex,pageSize): Observable<any> {
    return this.http.get(baseURL + '/transactions/exchangeFindAll?pageIndex='+pageIndex+'&pageSize='+pageSize);
  }



  public collect(data: any ): Observable<any> {
    return this.http.post<any>(baseURL+ '/transactions/collect',  data);
  }

  public exchange(data: any ): Observable<any> {
    return this.http.post<any>(baseURL+ '/transactions/exchange',  data);
  }


  search(formData: any, type: number): Observable<any> {

    var id = Number(formData.id);
    var accountId =Number( formData.account);
    var movType =Number( formData.movType);

    if(formData.toDate !== null && formData.fromDate !== null){

      var toDate = new Date(formData.toDate);
      toDate.setDate(toDate.getDate() + 1);
      var to_Date = toDate.toISOString().substring(0, 10);

      var fromDate = new Date(formData.fromDate);
      fromDate.setDate(fromDate.getDate() + 1);
      var from_Date = fromDate.toISOString().substring(0, 10);




      return this.http.get(`${baseURL}/transactions/search?id=${id}&type=${type}&accountId=${accountId}&movType=${movType}&toDate=${to_Date}&fromDate=${from_Date}`);
    }else{
      return this.http.get(`${baseURL}/transactions/search?id=${id}&type=${type}&accountId=${accountId}&movType=${movType}`);
    }

  }


}
