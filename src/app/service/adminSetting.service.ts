import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class AdminSettingService {

  

  constructor(private http: HttpClient) { }
  
  getData(): Observable<any> {
    return this.http.get(baseURL + '/adminPanelSettings');
  }
 

   
save(data: any): Observable<any> {

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
    return this.http.put<any>(baseURL+ '/adminPanelSettings/update',  data);
  }


}