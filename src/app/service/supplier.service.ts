import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class SupplierService {

  constructor(private http: HttpClient) { }
  

  getSupplierCategories(): Observable<any> {
    return this.http.get(baseURL + '/supplierCategories');
  }

  

  public saveSupplierCategory(data: any): Observable<any> {
    return this.http.post<any>(baseURL + '/supplierCategories/save',  data);
  }

  findAccountTypes(): Observable<any> {
    return this.http.get(baseURL + '/accountTypes');
  }


  findAll(): Observable<any> {
    return this.http.get(baseURL + '/suppliers_orders');
  }



  public save(data: any): Observable<any> {
    return this.http.post<any>(baseURL + '/suppliers_orders/save',  data);
  }
 

}