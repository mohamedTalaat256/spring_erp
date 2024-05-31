import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';   
import { InvUom } from 'src/app/model/invUom';
import { Store } from 'src/app/model/store';

@Injectable({
  providedIn: 'root'
})
export class StoreForm {
  constructor(public fb: FormBuilder ) {
  } 

  createForm() {
    return this.fb.group(
      {
        id:       [null],
        name:     [null, [Validators.required, Validators.maxLength(255)]],
        address: [null, [Validators.required]],
        phone: [null, [Validators.required]],
        active:   [null, [Validators.required]],
      }
    );
  }
  
  setForm(data: Store) {
    return this.fb.group(
      {
        id:        [data.id],
        name:      [data.name, [Validators.required, Validators.maxLength(255)]],
        address:   [data.address, [Validators.required]],
        phone:     [data.phone, [Validators.required]],
        active:    [data.active, [Validators.required]],
      }
    );
  } 
}