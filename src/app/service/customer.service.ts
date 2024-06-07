import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class CustomerService {



  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(baseURL + '/customers');
  }



  public save(data: any, formMode: FormMode): Observable<any> {

    if (formMode === FormMode.CREATE) {
    
      return this.http.post<any>(baseURL + '/customers/create', data);

    } else {
       
      return this.http.put<any>(baseURL + '/customers/update', data);
    }


  }


}