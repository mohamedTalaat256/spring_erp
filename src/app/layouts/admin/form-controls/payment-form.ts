import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentForm {
  constructor(public fb: FormBuilder ) {
  }

  createForm() {
    return this.fb.group(
      {
        id:        [null],
        worker:      [null, [Validators.required, Validators.maxLength(255)]],
        project: [null, [Validators.required]],
        amount:   [null, [Validators.required]],
        paymentDate:   [null, [Validators.required]],
        description:   [null, [Validators.required]],
      }
    );
  }

  setForm(data: any) {
    return this.fb.group(
      {
        id:        [data.id],
        name:      [data.name, [Validators.required, Validators.maxLength(255)]],
        worker:    [data.worker.id, [Validators.required]],
        project:   [data.project.id, [Validators.required]],
        amount:    [data.amount, [Validators.required]],
        paymentDate: [data.paymentDate, [Validators.required]],
        description:   [data.description, [Validators.required]],
      }
    );
  }
}
