import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode } from 'src/app/constants/constants';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
import { InvItemCategoryService } from 'src/app/service/invItemCategory.service';
import { InvItemCategoryForm } from '../../../form-controls/inv-item-category-form';


@Component({
  selector: 'app-inv-item-category-form-dialog',
  templateUrl: './inv-item-category-form-dialog.component.html',
  styleUrls: ['./inv-item-category-form-dialog.component.scss']
})
export class InvItemCategoryFormDialogComponent {

  invItemCategoryForm: FormGroup;
  title:string;
 
  constructor(
    private invItemCategoryFormContrl : InvItemCategoryForm,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<InvItemCategoryFormDialogComponent>,
    private invItemCategoryService: InvItemCategoryService
  ){


    if(this.data.formMode === FormMode.CREATE){
      this.invItemCategoryForm =  this.invItemCategoryFormContrl.createForm();
    }else{
      this.invItemCategoryForm =  this.invItemCategoryFormContrl.setForm(this.data.invItemCategory);
    } 
    this.title = this.data.title;
  } 
 

  onSubmit(){

    this.invItemCategoryService.save(this.invItemCategoryForm.value, this.data.formMode).subscribe({
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
  }
}
