import {FormBuilder, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class WorkerForm {
  constructor(public fb: FormBuilder ) {
  }

  createForm() {
    return this.fb.group(
      {
        id:       [null],
        name:     [null, [Validators.required, Validators.maxLength(255)]],
        position:  [null, [Validators.required]],
        dailyRate: [null, [Validators.required]],
      }
    );
  }

  setForm(data: any) {
    return this.fb.group(
      {
        id:        [data.id],
        name:      [data.name, [Validators.required, Validators.maxLength(255)]],
        position:   [data.position, [Validators.required]],
        dailyRate:    [data.dailyRate, [Validators.required]],
      }
    );
  }
}
