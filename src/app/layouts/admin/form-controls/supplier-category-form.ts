import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import { SupplierCategory } from 'src/app/model/supplierCategory';
 
@Injectable({
  providedIn: 'root'
})
export class SupplierCategoryForm {
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
  
  setForm(data: SupplierCategory) {
    console.log(data);
    return this.fb.group(
      {
        id:        [data.id],
        name:      [data.name, [Validators.required, Validators.maxLength(255)]],
        active:    [data.active, [Validators.required]],
      }
    );
  } 
}