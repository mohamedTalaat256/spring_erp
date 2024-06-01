import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { baseURL } from "../constants/constants"; 
import { User } from "../model/user,model";

@Injectable({ providedIn: 'root' })
export class InvUomService {

  constructor(private http: HttpClient) { }
  findAll(): Observable<any> {
    return this.http.get(baseURL + '/uoms');
  }
  public save(requestbody: any): Observable<any> {
    return this.http.post<any>(baseURL + '/uoms/save', requestbody);
  }


  getItemUoms(itemCode: number){
    return this.http.get(baseURL + '/uoms/get_item_uoms/'+itemCode);
  }

  public update(requestbody: any): Observable<any> {
    return this.http.put<any>(baseURL + '/uoms/update', requestbody);
  }

}