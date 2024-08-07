import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class ExpensesService {

  constructor(private http: HttpClient) { }


  findAllByProjectId(projectId: number): Observable<any> {
    return this.http.get(baseURL + `/expenses/project/${projectId}`);
  }


  public save(requestbody: any, formMode: FormMode): Observable<any> {
    if(formMode === FormMode.CREATE){
      return this.http.post<any>(baseURL + '/expenses', requestbody);

    }else{
      return this.http.put<any>(baseURL + `/expenses/${requestbody.id}`, requestbody);

    }
  }

  expenses(id: number): Observable<any> {
    return this.http.get(baseURL + `/expenses/${id}/expenses`);
  }

}
