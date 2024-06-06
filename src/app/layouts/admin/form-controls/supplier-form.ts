import { FormBuilder, Validators} from '@angular/forms';
import { Injectable } from '@angular/core'; 
import { Account } from 'src/app/model/accounty';
import { Supplier } from 'src/app/model/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierFormControl {
  constructor(public fb: FormBuilder ) {
  } 

  createForm() {
    return this.fb.group(
      {
        id:                  [null], 
        name:                [null, [Validators.required, Validators.maxLength(255)]],
        supplierCategory:    [null, [Validators.required]],
        startBalanceStatus:  [null, [Validators.required]],
        startBalance:        [null, [Validators.required]],
        currentBalance:      [null],
        phones:              [null, [Validators.maxLength(1000)]],
        address:             [null, [Validators.maxLength(1000)]],
        notes:               [null, [Validators.maxLength(1000)]],
        active:              [null, [Validators.required]],
      }
    );
  }
  
  setForm(data: Supplier) {
    return this.fb.group(
      {
        id:                  [data.id], 
        name:                [data.name,                [Validators.required, Validators.maxLength(255)]],
        supplierCategory:    [data.supplierCategory.id,      [Validators.required]],
        startBalanceStatus:  [data.startBalanceStatus,  [Validators.required]],
        startBalance:        [data.startBalance,        [Validators.required]],
        currentBalance:      [data.currentBalance,      [Validators.required]],
        address:             [data.address,             [Validators.maxLength(1000)]],
        phones:              [data.phones,              [Validators.maxLength(1000)]],
        notes:               [data.notes,               [Validators.maxLength(1000)]],
        active:              [data.active,              [Validators.required]],
      }
    );
  } 
}