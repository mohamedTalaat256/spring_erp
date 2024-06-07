import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode } from 'src/app/constants/constants';
import { InvUomForm } from '../../../form-controls/inv-oum-form';
import { InvUomService } from 'src/app/service/invUom.service';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inv-uoms-form-dialog',
  templateUrl: './inv-uoms-form-dialog.component.html',
  styleUrls: ['./inv-uoms-form-dialog.component.scss']
})
export class InvUomsFormDialogComponent {

  
  invUomForm: FormGroup;
  title:string;
 
  constructor(
    private invUomFormContrl : InvUomForm,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<InvUomsFormDialogComponent>,
    private invUomService: InvUomService
  ){


    if(this.data.formMode === FormMode.CREATE){
      this.invUomForm =  this.invUomFormContrl.createForm();
    }else{
      this.invUomForm =  this.invUomFormContrl.setForm(this.data.invUom);
    } 
    this.title = this.data.title;
  } 
 

  onSubmit(){

    this.invUomService.save(this.invUomForm.value, this.data.formMode ).subscribe({
      next:(response: AppResponse)=>{  
        if(response.ok){
          this.dialogRef.close(response.data);
          Swal.fire({
            icon: "success",
            title: response.message,
            showConfirmButton: true,
            timer: 1500
          });
         
        }
      },
      error:(error: Error)=>{
        Swal.fire({
          icon: "error",
          title: error.message,
          showConfirmButton: true
        });
      }

    });

    this.dialogRef.close(this.invUomForm.value);
  }
}
