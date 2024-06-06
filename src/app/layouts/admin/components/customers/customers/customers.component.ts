import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
  import { AccountService } from 'src/app/service/account.service';
 import { MatPaginator } from '@angular/material/paginator';
import { CustomerFormDialogComponent } from '../customer-form-dialog/customer-form-dialog.component';
import { Customer } from 'src/app/model/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {

  customers: Customer[] = [];
  createData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedColumns: string[] = [
    'name',
    'accountNumber',
    'currentBalance',
    'address',
    'phones',
    'notes',
    'active',
    'actions'];
  dataSource = new MatTableDataSource<Customer>(this.customers);

  constructor(public dialog: MatDialog, private accountService: AccountService) { }



  ngOnInit(): void {
    //this.findAll();
  }

  findAll() {
    this.accountService.findAll().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.customers = response.data.accounts;
          
          this.dataSource = new MatTableDataSource<Customer>(this.customers);
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
      title: 'اضافة عميل جديد',
      formMode: FormMode.CREATE,
    };
    const dialogRef = this.dialog.open(CustomerFormDialogComponent, {
      width: '80%',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {
        this.customers.push(result);
        this.dataSource = new MatTableDataSource<Customer>(this.customers);
      }
    });
  }


  openEditInvItemDialog(customer: Customer) {
    const data = {
      title: 'تعديل عميل',
      formMode: FormMode.EDIT,
      customer: customer,

    };
    const dialogRef = this.dialog.open(CustomerFormDialogComponent, {
      width: '80%',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {
        this.customers.push(result);
        this.dataSource = new MatTableDataSource<Customer>(this.customers);
      }
    });
  }
}
