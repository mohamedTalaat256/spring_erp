import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
import { InvItem } from 'src/app/model/invItem';
import { AccountFormDialogComponent } from '../account-form-dialog/account-form-dialog.component';
import { AccountService } from 'src/app/service/account.service';
import { Account } from 'src/app/model/accounty';
import { AccountType } from 'src/app/model/account-type';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  accounts: Account[] = [];
  accountTypes: AccountType[] = [];
  parentAccounts: Account[] = [];
  createData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedColumns: string[] = [
    'name',
    'accountNumber',
    'accountType',
    'isParent',
    'parentAccount',
    'currentBalance',
    'active',
    'actions'];
  dataSource = new MatTableDataSource<Account>(this.accounts);

  constructor(public dialog: MatDialog, private notes: AccountService) { }



  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.notes.findAll().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.accounts = response.data.accounts;
          this.accountTypes =  response.data.accountTypes;
          this.parentAccounts = response.data.parentAccounts;
          this.dataSource = new MatTableDataSource<Account>(this.accounts);
          this.dataSource.paginator = this.paginator;
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


  openAddInvItemDialog() {

    const data = {
      title: 'اضافة حساب جديد',
      formMode: FormMode.CREATE,
      accountTypes: this.accountTypes,
      parentAccounts: this.parentAccounts
    };
    const dialogRef = this.dialog.open(AccountFormDialogComponent, {
      width: '80%',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {
        this.accounts.push(result);
        this.dataSource = new MatTableDataSource<Account>(this.accounts);
      }
    });
  }


  openEditInvItemDialog(account: Account) {
    const data = {
      title: 'تعديل الحساب',
      formMode: FormMode.EDIT,
      account: account,
      accountTypes: this.accountTypes,
      parentAccounts: this.parentAccounts

    };
    const dialogRef = this.dialog.open(AccountFormDialogComponent, {
      width: '80%',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {
        this.accounts.push(result);
        this.dataSource = new MatTableDataSource<Account>(this.accounts);
      }
    });
  }
}
