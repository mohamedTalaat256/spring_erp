import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpensForm {
  constructor(public fb: FormBuilder ) {
  }

  createForm() {
    return this.fb.group(
      {
        id:        [null],
        project: [null, [Validators.required]],
        expenseDate: [null, [Validators.required]],
        category:   [null, [Validators.required]],
        amount:   [null, [Validators.required]],
        description:   [null,  ],
      }
    );
  }

  setForm(data: any) {
    return this.fb.group(
      {
        id:        [data.id],
        project:   [data.project.id,  ],
        expenseDate: [data.expenseDate, [Validators.required]],
        category:   [data.category, [Validators.required]],
        amount:    [data.amount, [Validators.required]],
        description:   [data.description, ],
      }
    );
  }
}
