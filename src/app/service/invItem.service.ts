import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormMode, baseURL } from "../constants/constants";
import { FormGroup } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class InvItemService {

  constructor(private http: HttpClient) { }
  findAll(): Observable<any> {
    return this.http.get(baseURL + '/itemcards');
  }


  findCreateData(): Observable<any> {
    return this.http.get(baseURL + '/itemcards/createData');
  }


  public save(form: FormGroup, formMode:FormMode): Observable<any> {

    const payLoad =  {
      id: form.value.id,
        barcode:               form.value.barcode,
        name:                  form.value.name,
        itemType:              form.value.itemType,
        invItemCategory:{
          id: form.value.invItemCategory
        },
        parentInvItemCard: form.value.parentInvItemCard === 0 ? null : { id: form.value.parentInvItemCard} ,

        uom:{
          id: form.value.uom
        },
        doesHasRetailUnit:     form.value.doesHasRetailUnit,
        retailUom:{
          id: form.value.retailUom
        },
        retailUomQuntToParent: form.value.retailUomQuntToParent,
        price:                 form.value.price,
        nosGomlaPrice:         form.value.nosGomlaPrice,
        gomlaPrice:            form.value.gomlaPrice,
        costPrice:             form.value.costPrice,
        priceRetail:           form.value.priceRetail,
        nosGomlaPriceRetail:   form.value.nosGomlaPriceRetail,
        gomlaPriceRetail:      form.value.gomlaPriceRetail,
        costPriceRetail:       form.value.costPriceRetail,
        hasFixcedPrice:        form.value.hasFixcedPrice,
        active:                form.value.active
    }

    console.log(payLoad);
    if(formMode===FormMode.CREATE){
      return this.http.post<any>(baseURL + '/itemcards/save', payLoad);
    }else{
    return this.http.put<any>(baseURL + '/itemcards/update', payLoad);
    }

  }


}
