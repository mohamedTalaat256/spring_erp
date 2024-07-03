import {FormBuilder, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class salesFormControl {
  constructor(public fb: FormBuilder ) {
  }

  createForm() {
    return this.fb.group(
      {
        id:             [null],
        date:           [null, [Validators.required]],
        isHasCustomer:  [false],
        customer:       [null, [Validators.required]],
        pillType:       [null, [Validators.required]],
        notes:          [null, [Validators.maxLength(1000)]],
      }
    );
  }

  setForm(data: any) {
    return this.fb.group(
      {
        id:             [data.id],
        date:           [data.invoiceDate, [Validators.required]],
        isHasCustomer:  [data.isHasCustomer !== null? data.isHasCustomer : false],
        customer:       [data.customer, [Validators.required]],
        pillType:       [data.pillType, [Validators.required]],
        notes:          [data.notes, [Validators.maxLength(1000)]],
      }
    );
  }
}
