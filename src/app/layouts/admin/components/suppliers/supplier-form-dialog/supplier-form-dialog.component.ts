import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup,   } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode, ITEM_TYPES } from 'src/app/constants/constants';
import { Observable, map, startWith } from 'rxjs';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
import { MatSelectChange } from '@angular/material/select';
import { AccountService } from 'src/app/service/account.service';
import { SupplierCategory } from 'src/app/model/supplierCategory';
import { SupplierFormControl } from '../../../form-controls/supplier-form';

@Component({
  selector: 'app-supplier-form-dialog',
  templateUrl: './supplier-form-dialog.component.html',
  styleUrls: ['./supplier-form-dialog.component.scss']
})
export class SupplierFormDialogComponent {
 
  supplierForm: FormGroup;
  title:string;
  startBalanceReadOnly: boolean = false;

 
  supplierCategories: SupplierCategory[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SupplierFormDialogComponent>,
    private supplierFormControl: SupplierFormControl,
    private accountService: AccountService
  ){


    if(this.data.formMode === FormMode.CREATE){
      this.supplierForm =  this.supplierFormControl.createForm();
    }else{
      this.supplierForm =  this.supplierFormControl.setForm(this.data.customer);
    } 
    this.title = this.data.title;
    this.supplierCategories = this.data.supplierCategories;
  }


  filteredIems: Observable<any[]>;

  ngOnInit() { 
    
 
  } 
 

  onSubmit(){
    console.log(this.supplierForm.value);

    this.accountService.save(this.supplierForm.value).subscribe({
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
 
  balanceStatusChange(event:MatSelectChange){

    if(event.value === 3){
      this.supplierForm.patchValue({
        startBalance: 0
      });
      this.startBalanceReadOnly = true; 

    }
    else{
      this.supplierForm.patchValue({
        startBalance: null
      });
      this.startBalanceReadOnly = false;

    }
  }
}
