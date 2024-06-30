import { FormBuilder, Validators} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesReturnOrderDetailsItemForm {
  constructor(public fb: FormBuilder ) {
  }

  createForm() {
    return this.fb.group(
      {
        id:                [null],
        orderId:           [null],
        invItemCard:       [null, [Validators.required] ],
        uom:               [null, [Validators.required]],
        store:               [null, [Validators.required]],
        batch:               [null, [Validators.required]],
        itemQuantity: [null, [Validators.required, Validators.max(100000)]],
        unitPrice:         [null, [Validators.required, Validators.max(100000)]],
        unitCostPrice:         [null, [Validators.required, Validators.max(100000)]],
      }
    );
  }

  setForm(data: any) {
    return this.fb.group(
      {
        id:                [data.id],
        orderId:           [data.orderId],
        invItemCard:       [data.invItemCard.id,       [Validators.required]],
        uom:               [data.uom.id,            [Validators.required]],
        store:             [data.store.id,            [Validators.required]],
        batch:             [null,            [Validators.required]],
        itemQuantity: [data.deliveredQuantity, [Validators.required, Validators.max(100000)]],
        unitPrice:         [data.unitPrice,         [Validators.required, Validators.max(100000)]],
        unitCostPrice:     [data.unitCostPrice,         [Validators.required, Validators.max(100000)]],
      }
    );
  }
}
