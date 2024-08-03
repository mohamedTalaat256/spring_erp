import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode } from 'src/app/constants/constants';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
import { WorkerService } from 'src/app/service/worker.service';
import { WorkerForm } from '../../../form-controls/worker-form';


@Component({
  selector: 'app-worker-dialog',
  templateUrl: './worker-dialog.component.html',
  styleUrls: ['./worker-dialog.component.scss']
})
export class WorkerDialogComponent {

  workerForm: FormGroup;
  title: string;

  constructor(
    private workerFormControl: WorkerForm,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<WorkerDialogComponent>,
    private workerService: WorkerService
  ) {


    if (this.data.formMode === FormMode.CREATE) {
      this.workerForm = this.workerFormControl.createForm();
    } else {
      this.workerForm = this.workerFormControl.setForm(this.data.worker);
    }
    this.title = this.data.title;
  }


  onSubmit() {

    this.workerService.save(this.workerForm.value, this.data.formMode).subscribe({
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

    this.dialogRef.close(this.workerForm.value);
  }
}
