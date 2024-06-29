import {FormBuilder, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import { SupplierOrder } from 'src/app/model/supplierOrder';

@Injectable({
  providedIn: 'root'
})
export class salesFormControl {
  constructor(public fb: FormBuilder ) {
  }

  createForm() {
    return this.fb.group(
      {
        id:        [null],
        date:      [null, [Validators.required]],
        customer:  [null, [Validators.required]],
        pillType:  [null, [Validators.required]],
        notes:     [null, [Validators.maxLength(1000)]],
      }
    );
  }

  setForm(data: any) {
    return this.fb.group(
      {
        id:        [data.id],
        date:      [data.date, [Validators.required]],
        customer:  [data.customer, [Validators.required]],
        pillType:  [data.pillType, [Validators.required]],
        notes:     [data.notes, [Validators.maxLength(1000)]],
      }
    );
  }
}