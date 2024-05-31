import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class AccountService {

  constructor(private http: HttpClient) { }
  
  findAccountTypes(): Observable<any> {
    return this.http.get(baseURL + '/accountTypes');
  }


  findAll(): Observable<any> {
    return this.http.get(baseURL + '/accounts');
  }

 

}