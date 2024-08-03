import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class WorkerService {

  constructor(private http: HttpClient) { }
  findAll(): Observable<any> {
    return this.http.get(baseURL + '/workers');
  }
  public save(requestbody: any, formMode: FormMode): Observable<any> {
    if(formMode === FormMode.CREATE){
      return this.http.post<any>(baseURL + '/workers/create', requestbody);

    }else{
      return this.http.put<any>(baseURL + `/workers/${requestbody.id}`, requestbody);

    }
  }

  history(id: number): Observable<any> {
    return this.http.get(baseURL + `/workers/${id}/history`);
  }

}
