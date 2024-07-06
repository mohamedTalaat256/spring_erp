import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";

@Injectable({ providedIn: 'root' })
export class ReportService {



  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(baseURL + '/customers');
  }


  supplierAccountReport(formData: any): Observable<any> {

    var toDate =  new Date(formData.toDate).toISOString().substring(0,10);
    var fromDate =new Date(formData.fromDate).toISOString().substring(0,10);
    return this.http.get(`${baseURL}/reports/supplierAccountReport?supplierId=${formData.supplier}&fromDate=${fromDate}&toDate=${toDate}`);
  }

  supplierCustomerReport(formData: any): Observable<any> {

    var toDate =  new Date(formData.toDate).toISOString().substring(0,10);
    var fromDate =new Date(formData.fromDate).toISOString().substring(0,10);
    return this.http.get(`${baseURL}/reports/supplierCustomerReport?customerId=${formData.customer}&fromDate=${fromDate}&toDate=${toDate}`);
  }



}
