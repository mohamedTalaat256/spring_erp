import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode } from 'src/app/constants/constants';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
import { ProjectService } from 'src/app/service/project.service';
import { ProjectForm } from '../../../form-controls/project-form';



@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent {

  projectForm: FormGroup;
  title: string;

  constructor(
    private projectFormControl: ProjectForm,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProjectDialogComponent>,
    private projectService: ProjectService
  ) {


    if (this.data.formMode === FormMode.CREATE) {
      this.projectForm = this.projectFormControl.createForm();
    } else {
      this.projectForm = this.projectFormControl.setForm(this.data.project);
    }
    this.title = this.data.title;
  }


  onSubmit() {

    this.projectService.save(this.projectForm.value, this.data.formMode).subscribe({
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

    this.dialogRef.close(this.projectForm.value);
  }
}
