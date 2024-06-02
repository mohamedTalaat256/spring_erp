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

 

}