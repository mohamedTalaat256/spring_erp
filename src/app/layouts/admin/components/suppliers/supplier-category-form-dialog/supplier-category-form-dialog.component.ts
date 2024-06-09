import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode } from 'src/app/constants/constants';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
 import { SupplierService } from 'src/app/service/supplier.service';
import { SupplierFormControl } from '../../../form-controls/supplier-form';
import { SupplierCategoryForm } from '../../../form-controls/supplier-category-form';


@Component({
  selector: 'app-supplier-category-form-dialog',
  templateUrl: './supplier-category-form-dialog.component.html',
  styleUrls: ['./supplier-category-form-dialog.component.scss']
})
export class SupplierCategoryFormDialogComponent {

  supplierCategoryForm: FormGroup;
  title:string;
 
  constructor(
    private supplierCategoryFormContrl : SupplierCategoryForm,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SupplierCategoryFormDialogComponent>,
    private supplierService: SupplierService
  ){


    if(this.data.formMode === FormMode.CREATE){
      this.supplierCategoryForm =  this.supplierCategoryFormContrl.createForm();
    }else{
      this.supplierCategoryForm =  this.supplierCategoryFormContrl.setForm(this.data.supplierCategory);
    } 
    this.title = this.data.title;
  } 
 

  onSubmit(){

    this.supplierService.saveSupplierCategory(this.supplierCategoryForm.value, this.data.formMode).subscribe({
      next:(response: AppResponse)=>{  
        if(response.ok){
          Swal.fire({
            icon: "success",
            title: response.message,
            showConfirmButton: true,
            timer: 1500
          });
          this.dialogRef.close(response.data);
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

    this.dialogRef.close(this.supplierCategoryForm.value);
  }
}
