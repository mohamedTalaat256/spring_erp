import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";
import { FormGroup } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class SupplierService {

  constructor(private http: HttpClient) { }
  

  getSupplierCategories(): Observable<any> {
    return this.http.get(baseURL + '/supplierCategories');
  }

  

  public saveSupplierCategory(data: any): Observable<any> {
    return this.http.post<any>(baseURL + '/supplierCategories/save',  data);
  }

 

  findAll(): Observable<any> {
    return this.http.get(baseURL + '/suppliers');
  }



  public save(data: any,formMode: FormMode): Observable<any> {
    if(formMode === FormMode.CREATE){
      const payLoad = {
        name: data.name,
        supplierCategory:{
          id: 1
        },
        startBalanceStatus: data.startBalanceStatus,
        startBalance: data.startBalance,
        notes: data.notes,
        address: data.address,
        phones: data.phones,
        active: data.active
        }
      
      
      return this.http.post<any>(baseURL + '/suppliers/create',  payLoad);
    }else{
      const payLoad = {
        id: data.id,
        name: data.name,
        supplierCategory:{
          id: 1
        },
        startBalanceStatus: data.startBalanceStatus,
        startBalance: data.startBalance,
        notes: data.notes,
        address: data.address,
        phones: data.phones,
        active: data.active
        }
      
      
      return this.http.put<any>(baseURL + '/suppliers/update',  payLoad);
    }
    
  }
 

}