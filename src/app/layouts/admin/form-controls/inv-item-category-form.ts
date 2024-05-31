import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import { InvItemCategory } from 'src/app/model/invItemCategory';

@Injectable({
  providedIn: 'root'
})
export class InvItemCategoryForm {
  constructor(public fb: FormBuilder ) {
  } 

  createForm() {
    return this.fb.group(
      {
        id:       [null],
        name:     [null, [Validators.required, Validators.maxLength(255)]],
        active:   [null, [Validators.required]],
      }
    );
  }
  
  setForm(data: InvItemCategory) {
    return this.fb.group(
      {
        id:        [data.id],
        name:      [data.name, [Validators.required, Validators.maxLength(255)]],
        active:    [data.active, [Validators.required]],
      }
    );
  } 
}