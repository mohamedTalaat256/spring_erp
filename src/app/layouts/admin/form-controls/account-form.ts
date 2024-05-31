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
        accountType:         [null, [Validators.required, Validators.maxLength(255)]],
        isParent:            [null, [Validators.required, Validators.maxLength(255)]],
        parentAccountNumber: [null, [Validators.required, Validators.maxLength(255)]],
        accountNumber:       [null, [Validators.required, Validators.maxLength(255)]],
        startBalanceStatus:  [null, [Validators.required, Validators.maxLength(255)]],
        startBalance:        [null, [Validators.required, Validators.maxLength(255)]],
        currentBalance:      [null, [Validators.required, Validators.maxLength(255)]],
        notes:               [null, [Validators.required, Validators.maxLength(255)]],
        active:               [null, [Validators.required, Validators.maxLength(255)]],
      }
    );
  }
  
  setForm(data: Account) {
    return this.fb.group(
      {
        id:                  [data.id], 
        name:                [data.name, [Validators.required, Validators.maxLength(255)]],
        accountType:         [data.account_type, [Validators.required, Validators.maxLength(255)]],
        isParent:            [data.is_parent, [Validators.required, Validators.maxLength(255)]],
        parentAccountNumber: [data.parent_account_number, [Validators.required, Validators.maxLength(255)]],
        accountNumber:       [data.account_number, [Validators.required, Validators.maxLength(255)]],
        startBalanceStatus:  [data.start_balance_status, [Validators.required, Validators.maxLength(255)]],
        startBalance:        [data.start_balance, [Validators.required, Validators.maxLength(255)]],
        currentBalance:      [data.current_balance, [Validators.required, Validators.maxLength(255)]],
        notes:               [data.notes, [Validators.required, Validators.maxLength(255)]],
        active:               [data.active, [Validators.required, Validators.maxLength(255)]],
      }
    );
  } 
}