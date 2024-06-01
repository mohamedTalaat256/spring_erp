import {FormBuilder, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import { SupplierOrder } from 'src/app/model/supplierOrder';

@Injectable({
  providedIn: 'root'
})
export class supplierOrderFormControl {
  constructor(public fb: FormBuilder ) {
  } 

  createForm() {
    return this.fb.group(
      {
        id:            [null],
        orderDate:     [null, [Validators.required]],
        docNo:         [null, [Validators.required, Validators.maxLength(255)]],
        supplierCode:  [null, [Validators.required]],
        pillType:      [null, [Validators.required]],
        storeId:       [null, [Validators.required]],
        notes:         [null, [Validators.maxLength(1000)]],
      }
    );
  }
  
  setForm(data: SupplierOrder) {
    return this.fb.group(
      {
        id:           [data.id],
        orderDate:    [data.order_date, [Validators.required]],
        docNo:        [data.DOC_NO, [Validators.required, Validators.maxLength(255)]],
        supplierCode: [data.suuplier_code, [Validators.required]],
        pillType:     [data.pill_type, [Validators.required]],
        storeId:      [data.store_id, [Validators.required]],
        notes:        [data.notes, [Validators.maxLength(1000)]],
      }
    );
  } 
}