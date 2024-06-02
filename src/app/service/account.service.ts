import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { baseURL, baseURLNew } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class AccountService {

  

  constructor(private http: HttpClient) { }
  
  findAccountTypes(): Observable<any> {
    return this.http.get(baseURLNew + '/account_types');
  }


  findAll(): Observable<any> {
    return this.http.get(baseURLNew + '/accounts');
  }


   
  public save(data: any): Observable<any> {

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
    return this.http.post<any>(baseURLNew + '/accounts/save',  payLoad);
  }


}