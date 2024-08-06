import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectForm {
  constructor(public fb: FormBuilder ) {
  }

  createForm() {
    return this.fb.group(
      {
        id:        [null],
        projectName:      [null, [Validators.required, Validators.maxLength(255)]],
        startDate: [null, [Validators.required]],
        endDate:   [null, [Validators.required]],
      }
    );
  }

  setForm(data: any) {
    return this.fb.group(
      {
        id:        [data.id],
        projectName:      [data.projectName, [Validators.required, Validators.maxLength(255)]],
        startDate: [data.startDate, [Validators.required]],
        endDate:   [data.endDate, [Validators.required]],
      }
    );
  }
}
