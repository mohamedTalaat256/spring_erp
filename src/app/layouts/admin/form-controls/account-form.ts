import { FormBuilder, Validators} from '@angular/forms';
import { Injectable } from '@angular/core'; 
import { Account } from 'src/app/model/accounty';

@Injectable({
  providedIn: 'root'
})
export class AccountForm {
  constructor(public fb: FormBuilder ) {
  } 

  createForm() {
    return this.fb.group(
      {
        id:                  [null], 
        name:                [null, [Validators.required, Validators.maxLength(255)]],
        accountType:         [null, [Validators.required]],
        isParent:            [null, [Validators.required]],
        parentAccountNumber: [null, ],
        startBalanceStatus:  [null, [Validators.required]],
        startBalance:        [null, [Validators.required]],
        currentBalance:      [null],
        notes:               [null, [Validators.maxLength(1000)]],
        active:              [null, [Validators.required]],
      }
    );
  }
  
  setForm(data: Account) {
    return this.fb.group(
      {
        id:                  [data.id], 
        name:                [data.name,                [Validators.required, Validators.maxLength(255)]],
        accountType:         [data.accountType.id,      [Validators.required]],
        isParent:            [data.isParent,            [Validators.required]],
        parentAccountNumber: [data.parentAccount_number, ],
        startBalanceStatus:  [data.startBalanceStatus,  [Validators.required]],
        startBalance:        [data.startBalance,        [Validators.required]],
        currentBalance:      [data.currentBalance,      [Validators.required]],
        notes:               [data.notes,               [Validators.maxLength(1000)]],
        active:              [data.active,              [Validators.required]],
      }
    );
  } 
}