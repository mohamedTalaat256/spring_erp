import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL, baseURLNew } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class CustomerService {



  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(baseURLNew + '/customers');
  }



  public save(data: any, formMode: FormMode): Observable<any> {

    if (formMode === FormMode.CREATE) {
    
      return this.http.post<any>(baseURLNew + '/customers/create', data);

    } else {
       
      return this.http.put<any>(baseURLNew + '/customers/update', data);
    }


  }


}