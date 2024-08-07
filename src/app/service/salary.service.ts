import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class SalaryService {

  constructor(private http: HttpClient) { }

  getAllData(): Observable<any> {
    return this.http.get(baseURL + '/payments/getAllData');
  }


  findAllByProjectId(projectId: number): Observable<any> {
    return this.http.get(baseURL + `/salaries/project/${projectId}`);
  }

  findAllByWorkerId(workerId: number): Observable<any> {
    return this.http.get(baseURL + `/salaries/worker/${workerId}`);
  }
  public save(requestbody: any, formMode: FormMode): Observable<any> {
    if(formMode === FormMode.CREATE){
      return this.http.post<any>(baseURL + '/salaries', requestbody);

    }else{
      return this.http.put<any>(baseURL + `/salaries`, requestbody);

    }
  }


}
