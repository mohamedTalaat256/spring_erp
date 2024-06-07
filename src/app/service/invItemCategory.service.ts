import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class InvItemCategoryService {

  constructor(private http: HttpClient) { }
  findAll(): Observable<any> {
    return this.http.get(baseURL + '/inv_itemcard_categories');
  }
  public save(requestbody: any, formMode: FormMode): Observable<any> {
    if(formMode === FormMode.CREATE){
      return this.http.post<any>(baseURL + '/inv_itemcard_categories/save', requestbody);
    }else{
      return this.http.put<any>(baseURL + '/inv_itemcard_categories/update', requestbody);
    }
  }
}