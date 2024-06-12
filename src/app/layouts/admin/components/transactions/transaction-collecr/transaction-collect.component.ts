import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MovType, movTypes } from 'src/app/model/MovType';
import { Account } from 'src/app/model/accounty';
import { AppResponse } from 'src/app/model/app_response.model';
import { AccountService } from 'src/app/service/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaction-collect',
  templateUrl: './transaction-collect.component.html',
  styleUrls: ['./transaction-collect.component.scss']
})
export class TransactionCollectComponent implements OnInit {

  collectTransactionForm: FormGroup;

  accounts: Account[]=[];
  movTypes: MovType[] = movTypes;

  startBalanceStatus: number= 0;
  currentBalance: number= 0;

  constructor(private fb: FormBuilder,private accountService: AccountService){

    this.collectTransactionForm = this.fb.group({
      date: [null, [Validators.required]],
      account: [null, [Validators.required]],
      movType: [null, [Validators.required]],
      money: [null, [Validators.required]],
      bayan: [null, [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(){
    
    this.accountService.findAll().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.accounts = response.data.accounts;
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
  }


  onAccountChange(event: MatSelectChange){
    this.currentBalance = this.accounts.find(i=> i.id=== event.value ).currentBalance ;
  }

  onSubmit(){

  }

}
