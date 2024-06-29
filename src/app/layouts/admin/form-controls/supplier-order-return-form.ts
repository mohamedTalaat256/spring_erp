import {FormBuilder, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
 import { SupplierOrderReturn } from 'src/app/model/supplierOrderReturn';

@Injectable({
  providedIn: 'root'
})
export class SupplierOrderReturnFormControl {
  constructor(public fb: FormBuilder ) {
  }

  createForm() {
    return this.fb.group(
      {
        id:        [null],
        orderDate: [null, [Validators.required]],
        supplier:  [null, [Validators.required]],
        pillType:  [null, [Validators.required]],
        store:     [null, [Validators.required]],
        notes:     [null, [Validators.maxLength(1000)]],
      }
    );
  }

  setForm(data: SupplierOrderReturn) {
    return this.fb.group(
      {
        id:        [data.id],
        orderDate: [data.orderDate, [Validators.required]],
        supplier:  [data.supplier, [Validators.required]],
        pillType:  [data.pillType, [Validators.required]],
        store:     [data.store, [Validators.required]],
        notes:     [data.notes, [Validators.maxLength(1000)]],
      }
    );
  }
}
