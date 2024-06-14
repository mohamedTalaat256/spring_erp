import { FormBuilder, Validators} from '@angular/forms';
import { Injectable } from '@angular/core'; 

@Injectable({
  providedIn: 'root'
})
export class SupplierOrderDetailsItemForm {
  constructor(public fb: FormBuilder ) {
  } 

  createForm() {
    return this.fb.group(
      {
        id:                [null],
        orderId:           [null],
        invItemCard:       [null, [Validators.required] ],
        uom:               [null, [Validators.required]],
        deliveredQuantity: [null, [Validators.required, Validators.max(100000)]],
        unitPrice:         [null, [Validators.required, Validators.max(100000)]],
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
        deliveredQuantity: [data.deliveredQuantity, [Validators.required, Validators.max(100000)]],
        unitPrice:         [data.unitPrice,         [Validators.required, Validators.max(100000)]],
      }
    );
  } 
}