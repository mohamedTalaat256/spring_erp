import { FormBuilder, Validators} from '@angular/forms';
import { Injectable } from '@angular/core';
import { AdminSetting } from 'src/app/model/adminSetting';

@Injectable({
  providedIn: 'root'
})
export class AdminSettingForm {
  constructor(public fb: FormBuilder ) {
  }

  setForm(data: AdminSetting) {
    return this.fb.group(
      {
        id:                           [data.id],
        systemName:                   [data.systemName,                   [Validators.required, Validators.maxLength(255)]],
        address:                      [data.address,                      [Validators.required]],
        phone:                        [data.phone,                        [Validators.required]],
        photo:                        [data.photo,                        [Validators.required]],
        notes:                        [data.notes,                        [Validators.maxLength(1000)]],

        customerParentAccountNumber:  [data.customerParentAccountNumber,  [Validators.required]],
        suppliersParentAccountNumber: [data.suppliersParentAccountNumber, [Validators.required]],
      }
    );
  }
}
