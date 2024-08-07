import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryForm {
  constructor(public fb: FormBuilder ) {
  }

  createForm() {
    return this.fb.group(
      {
        id:        [null],
        worker:      [null, [Validators.required, Validators.maxLength(255)]],
        project: [null, [Validators.required]],
        amount:   [null, [Validators.required]],
        deduction:   [null, [Validators.required]],
        salaryDate:   [null, [Validators.required]],
        isPaid:   [null,  ],
      }
    );
  }

  setForm(data: any) {
    return this.fb.group(
      {
        id:        [data.id],
        worker:    [data.worker.id,  ],
        project:   [data.project.id,  ],
        amount:    [data.amount, [Validators.required]],
        deduction:    [data.deduction, [Validators.required]],
        salaryDate: [data.salaryDate, [Validators.required]],
        isPaid:   [data.description, ],
      }
    );
  }
}
