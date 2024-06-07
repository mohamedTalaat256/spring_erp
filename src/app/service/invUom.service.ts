import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants"; 
import { User } from "../model/user,model";

@Injectable({ providedIn: 'root' })
export class InvUomService {

  constructor(private http: HttpClient) { }
  findAll(): Observable<any> {
    return this.http.get(baseURL + '/InvUoms');
  }
  public save(requestbody: any, formMode: FormMode): Observable<any> {

    if (formMode === FormMode.CREATE) {
      return this.http.post<any>(baseURL + '/InvUoms/save', requestbody);
    }else{
      return this.http.put<any>(baseURL + '/InvUoms/update', requestbody);

    }
  }


  getItemUoms(itemCode: number){
    return this.http.get(baseURL + '/InvUoms/get_item_uoms/'+itemCode);
  } 

}