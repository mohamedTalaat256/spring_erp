import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';   
import { InvUom } from 'src/app/model/invUom';

@Injectable({
  providedIn: 'root'
})
export class InvUomForm {
  constructor(public fb: FormBuilder ) {
  } 

  createForm() {
    return this.fb.group(
      {
        id:       [null],
        name:     [null, [Validators.required, Validators.maxLength(255)]],
        is_master: [null, [Validators.required]],
        active:   [null, [Validators.required]],
      }
    );
  }
  
  setForm(invUom: InvUom) {
    return this.fb.group(
      {
        id:        [invUom.id],
        name:      [invUom.name, [Validators.required, Validators.maxLength(255)]],
        is_master: [invUom.is_master, [Validators.required]],
        active:    [invUom.active, [Validators.required]],
      }
    );
  } 
}