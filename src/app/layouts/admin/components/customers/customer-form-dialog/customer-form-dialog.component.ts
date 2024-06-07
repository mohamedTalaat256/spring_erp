import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode, ITEM_TYPES } from 'src/app/constants/constants';
import { Observable, map, startWith } from 'rxjs';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
import { MatSelectChange } from '@angular/material/select';
import { CustomerForm } from '../../../form-controls/customer-form';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-form-dialog',
  templateUrl: './customer-form-dialog.component.html',
  styleUrls: ['./customer-form-dialog.component.scss']
})
export class CustomerFormDialogComponent {
 
  customerForm: FormGroup;
  title:string;
  startBalanceReadOnly: boolean = false;
  formMode: FormMode;

  showParentAccounts: boolean= false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CustomerFormDialogComponent>,
    private customerFormControl: CustomerForm,
    private customerService: CustomerService
  ){


    if(this.data.formMode === FormMode.CREATE){
      this.customerForm =  this.customerFormControl.createForm();
    }else{
      this.customerForm =  this.customerFormControl.setForm(this.data.customer);
    } 
    this.title = this.data.title;
    this.formMode = this.data.formMode;
  }


  filteredIems: Observable<any[]>;

  ngOnInit() { 
    
 
  } 
 

  onSubmit(){ 

    this.customerService.save(this.customerForm.value, this.data.formMode).subscribe({
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
      this.customerForm.patchValue({
        startBalance: 0
      });
      this.startBalanceReadOnly = true; 

    }
    else{
      this.customerForm.patchValue({
        startBalance: null
      });
      this.startBalanceReadOnly = false;

    }
  }
}
