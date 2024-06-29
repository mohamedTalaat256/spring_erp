import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class TransactionService {



  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(baseURL + '/accounts');
  }



  public save(data: any, formMode:FormMode): Observable<any> {

    if(formMode=== FormMode.CREATE){
      const payLoad = {
        name: data.name,
        accountType: {
          id: data.accountType
        },
        isParent:   data.isParent,
        accountNumber: data.accountNumber,
        startBalanceStatus: data.startBalanceStatus,
        startBalance: data.startBalance,
        notes: data.notes,
        active: data.active
        }
      return this.http.post<any>(baseURL+ '/accounts/save',  payLoad);
    }else{
      const payLoad = {
        id: data.id,
        name: data.name,
        accountType: {
          id: data.accountType
        },
        isParent:   data.isParent,
        accountNumber: data.accountNumber,
        startBalanceStatus: data.startBalanceStatus,
        startBalance: data.startBalance,
        notes: data.notes,
        active: data.active
        }
      return this.http.put<any>(baseURL+ '/accounts/update',  payLoad);
    }


  }


}
