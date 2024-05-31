import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode, ITEM_TYPES } from 'src/app/constants/constants';
import { Observable, map, startWith } from 'rxjs';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
import { MatSelectChange } from '@angular/material/select';
import { AccountForm } from '../../../form-controls/account-form';
import { AccountType } from 'src/app/model/account-type';
import { Account } from 'src/app/model/accounty';

@Component({
  selector: 'app-account-form-dialog',
  templateUrl: './account-form-dialog.component.html',
  styleUrls: ['./account-form-dialog.component.scss']
})
export class AccountFormDialogComponent {



  accountTypes:AccountType[]=[]; 
  parentAccounts: Account[]=[];
  accountForm: FormGroup;
  title:string;

  showParentAccounts: boolean= false;
  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AccountFormDialogComponent>,
    private accountFormControl: AccountForm
  ){


    if(this.data.formMode === FormMode.CREATE){
      this.accountForm =  this.accountFormControl.createForm();
    }else{
      this.accountForm =  this.accountForm =  this.accountFormControl.setForm(this.data.account);
    }
 
    this.accountTypes = this.data.accountTypes;
    this.parentAccounts= this.data.parentAccounts;

    this.title = this.data.title;
  }


  filteredIems: Observable<any[]>;

  ngOnInit() { 

 
  } 
 

  onSubmit(){
    this.dialogRef.close(this.accountForm.value);
  }
 
  isParentChange(event:MatSelectChange){
    this.showParentAccounts = !event.value;
  } 


}