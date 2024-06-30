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
        id:        [null],
        orderDate: [null, [Validators.required]],
        docNo:     [null, [Validators.required, Validators.maxLength(255)]],
        supplier:  [null, [Validators.required]],
        pillType:  [null, [Validators.required]],
        store:     [null, [Validators.required]],
        notes:     [null, [Validators.maxLength(1000)]],
      }
    );
  }

  setForm(data: any) {
    return this.fb.group(
      {
        id:        [data.id],
        orderDate: [data.orderDate, [Validators.required]],
        docNo:     [data.docNo, [Validators.required, Validators.maxLength(255)]],
        supplier:  [data.suuplier, [Validators.required]],
        pillType:  [data.pillType, [Validators.required]],
        store:     [data.store.id, [Validators.required]],
        notes:     [data.notes, [Validators.maxLength(1000)]],
      }
    );
  }
}
