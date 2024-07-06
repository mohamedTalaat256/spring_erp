import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { MovType, movTypes } from 'src/app/model/MovType';
import { Account } from 'src/app/model/accounty';
import { AppResponse } from 'src/app/model/app_response.model';
import { TransactionService } from 'src/app/service/transactions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaction-collect',
  templateUrl: './transaction-collect.component.html',
  styleUrls: ['./transaction-collect.component.scss']
})
export class TransactionCollectComponent implements OnInit {
  pageIndex:number = 0;
  pageSize: number  = 10;
  totalElements: number  =0;

  collectTransactionForm: FormGroup;
  availableBalance: number=0;

  accounts: Account[]=[];
  movTypes: MovType[] = movTypes;

  startBalanceStatus: number= 0;
  currentBalance: number= 0;

  transactions: any[]=[];


  displayedColumns: string[] = ['id', 'treasure', 'money', 'moveType', 'account', 'bayan', 'by'];
  dataSource = new MatTableDataSource<any>(this.transactions);


  constructor(private fb: FormBuilder
    ,private transactionService: TransactionService
  ){

    this.collectTransactionForm = this.fb.group({
      moveDate:    [null, [Validators.required]],
      account: [null, [Validators.required]],
      movType: [null, [Validators.required]],
      money:   [null, [Validators.required]],
      byan:   [null, [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.findAll(this.pageIndex, this.pageSize);
  }

  findAll(pageIndex,pageSize){

    this.transactionService.collectFindAll(pageIndex,pageSize).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.accounts = response.data.accounts;
          this.transactions = response.data.treasuresTransactions.content;
          this.totalElements = response.data.treasuresTransactions.totalElements;
          this.availableBalance = response.data.availableBalance;
          this.dataSource = new MatTableDataSource<any>(this.transactions);
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

    this.transactionService.collect(this.collectTransactionForm.value).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.accounts = response.data.accounts;
          this.transactions.push(response.data.transaction);
          this.availableBalance = response.data.availableBalance;
          this.dataSource = new MatTableDataSource<any>(this.transactions);

          Swal.fire({
            icon: "success",
            title: response.message,
            showConfirmButton: true
          });
          this.collectTransactionForm.reset();
          this.currentBalance=0;
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
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.totalElements = e.length;


    this.findAll(this.pageIndex, this.pageSize);
  }
}
