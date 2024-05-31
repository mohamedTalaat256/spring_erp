import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode } from 'src/app/constants/constants';
import { InvUomForm } from '../../../form-controls/inv-oum-form';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
import { StoreService } from 'src/app/service/store.service';
import { StoreForm } from '../../../form-controls/store-form';

@Component({
  selector: 'app-store-form-dialog',
  templateUrl: './store-form-dialog.component.html',
  styleUrls: ['./store-form-dialog.component.scss']
})
export class StoreFormDialogComponent {


  storeForm: FormGroup;
  title: string;

  constructor(
    private storeFormControl: StoreForm,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<StoreFormDialogComponent>,
    private storeService: StoreService
  ) {


    if (this.data.formMode === FormMode.CREATE) {
      this.storeForm = this.storeFormControl.createForm();
    } else {
      this.storeForm = this.storeFormControl.setForm(this.data.store);
    }
    this.title = this.data.title;
  }


  onSubmit() {

    this.storeService.save(this.storeForm.value).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: response.message,
            showConfirmButton: true,
            timer: 1500
          });
          this.dialogRef.close(response.data);
        }
      },
      error: (error: Error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
          showConfirmButton: true
        });
      }

    });

    this.dialogRef.close(this.storeForm.value);
  }
}
