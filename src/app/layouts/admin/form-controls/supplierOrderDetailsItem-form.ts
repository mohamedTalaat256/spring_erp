import { FormBuilder, Validators} from '@angular/forms';
import { Injectable } from '@angular/core'; 
import { InvItem } from 'src/app/model/invItem';

@Injectable({
  providedIn: 'root'
})
export class SupplierOrderDetailsItemForm {
  constructor(public fb: FormBuilder ) {
  } 

  createForm() {
    return this.fb.group(
      {
        id:       [null],
        item_code_add:     [null, [Validators.maxLength(255)]],
        uom_id_Add:     [null, [Validators.required, Validators.maxLength(255)]],
        quantity_add:     [null, [Validators.required, Validators.maxLength(255)]],
        price_add:     [null, [Validators.required, Validators.maxLength(255)]],
      }
    );
  }
  
  setForm(data: InvItem) {
    return this.fb.group(
      {
        id:                      [data.id],
        item_code_add:     [null, [Validators.maxLength(255)]],
        uom_id_Add:     [null, [Validators.required, Validators.maxLength(255)]],
        quantity_add:     [null, [Validators.required, Validators.maxLength(255)]],
        price_add:     [null, [Validators.required, Validators.maxLength(255)]],
      }
    );
  } 
}