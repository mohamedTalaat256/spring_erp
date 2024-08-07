import { FormBuilder, Validators} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SarfPermissionDetailsFormControl {
  constructor(public fb: FormBuilder ) {
  }

  createForm() {
    return this.fb.group(
      {
        id:                [null],
        permissionId:           [null],
        invItemCard:       [null, [Validators.required] ],
        uom:               [null, [Validators.required]],
        store:               [null, [Validators.required]],
        itemQuantity: [null, [Validators.required, Validators.max(100000)]],
      }
    );
  }

  setForm(data: any) {
    return this.fb.group(
      {
        id:                [data.id],
        permissionId:      [data.permissionId],
        invItemCard:       [data.invItemCard.id,       [Validators.required]],
        uom:               [data.uom.id,            [Validators.required]],
        store:             [data.store.id,            [Validators.required]],
        itemQuantity: [data.deliveredQuantity, [Validators.required, Validators.max(100000)]],
      }
    );
  }
}
