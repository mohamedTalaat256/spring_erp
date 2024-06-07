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
        isMaster: [null, [Validators.required]],
        active:   [null, [Validators.required]],
      }
    );
  }
  
  setForm(invUom: InvUom) {
    return this.fb.group(
      {
        id:        [invUom.id],
        name:      [invUom.name, [Validators.required, Validators.maxLength(255)]],
        isMaster:  [invUom.isMaster, [Validators.required]],
        active:    [invUom.active, [Validators.required]],
      }
    );
  } 
}