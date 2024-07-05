import {FormBuilder, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceInvoiceFormControl {
  constructor(public fb: FormBuilder ) {
  }

  createForm() {
    return this.fb.group(
      {
        id:             [null],
        invoiceDate:           [null, [Validators.required]],
        notes:          [null, [Validators.maxLength(1000)]],
      }
    );
  }

  setForm(data: any) {
    return this.fb.group(
      {
        id:             [data.id],
        invoiceDate:           [data.invoiceDate, [Validators.required]],
        notes:          [data.notes, [Validators.maxLength(1000)]],
      }
    );
  }
}
