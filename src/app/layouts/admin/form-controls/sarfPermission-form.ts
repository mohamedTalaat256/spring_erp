import {FormBuilder, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SarfPermissionFormControl {
  constructor(public fb: FormBuilder ) {
  }

  createForm() {
    return this.fb.group(
      {
        id:             [null],
        permissionDate: [null, [Validators.required]],
        customer:       [null, [Validators.required]],
        notes:          [null, [Validators.maxLength(1000)]],
        receiverName:   [null, [Validators.required, Validators.maxLength(100)]],
      }
    );
  }

  setForm(data: any) {
    return this.fb.group(
      {
        id:             [data.id],
        permissionDate: [data.permissionDate, [Validators.required]],
        customer:       [data.customer, [Validators.required]],
        notes:          [data.notes, [Validators.maxLength(1000)]],
        receiverName:   [data.receiverName, [Validators.required, Validators.maxLength(100)]],
      }
    );
  }
}
