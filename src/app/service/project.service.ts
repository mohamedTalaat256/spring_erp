import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class ProjectService {

  constructor(private http: HttpClient) { }
  findAll(): Observable<any> {
    return this.http.get(baseURL + '/projects');
  }
  public save(requestbody: any, formMode: FormMode): Observable<any> {
    if(formMode === FormMode.CREATE){
      return this.http.post<any>(baseURL + '/projects', requestbody);

    }else{
      return this.http.put<any>(baseURL + `/projects/${requestbody.id}`, requestbody);

    }
  }

  expenses(id: number): Observable<any> {
    return this.http.get(baseURL + `/projects/${id}/expenses`);
  }

}
