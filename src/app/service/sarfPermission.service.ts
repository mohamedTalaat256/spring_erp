import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class SarfPermissionService {

  constructor(private http: HttpClient) { }



  findAll(): Observable<any> {
    return this.http.get(baseURL + '/sarfPermissions');
  }

  findById(id : number):Observable<any> {
    return this.http.get(baseURL + '/sarfPermissions/'+id);
  }



  public save(data: any, formMode: FormMode): Observable<any> {
    if(formMode === FormMode.CREATE){
      return this.http.post<any>(baseURL + '/sarfPermissions',  data);
    }else{
      return this.http.put<any>(baseURL + '/sarfPermissions',  data);
    }
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(baseURL + '/sarfPermissions/'+id);
  }


}
