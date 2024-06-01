import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
import { AccountService } from 'src/app/service/account.service';
import { Account } from 'src/app/model/accounty';
import { AccountType } from 'src/app/model/account-type';
import { MatPaginator } from '@angular/material/paginator';
import { SupplierOrder } from 'src/app/model/supplierOrder';
import { SupplierOrderService } from 'src/app/service/supplierOrder.service';

@Component({
  selector: 'app-suppliers-orders',
  templateUrl: './suppliers-orders.component.html',
  styleUrls: ['./suppliers-orders.component.scss']
})
export class SuppliersOrdersComponent {

  accounts: Account[] = []; 
  supplierOrders: SupplierOrder[] = []; 
  createData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedColumns: string[] = [
    'autoSerial',
    'supplierName',
    'orderDate',
    'pillType',
    'storeName',
    'totalCost',
    'approveStatus',
    'actions'
  ];
  dataSource = new MatTableDataSource<SupplierOrder>(this.supplierOrders);

  constructor(public dialog: MatDialog,
    private supplierOrderService: SupplierOrderService
    
    ) { }



  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.supplierOrderService.findAll().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.accounts = response.data.accounts;
          this.supplierOrders = response.data.suppliersOrders;
         
          this.dataSource = new MatTableDataSource<SupplierOrder>(this.supplierOrders);
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
      formMode: FormMode.CREATE
    };
    /* const dialogRef = this.dialog.open(AccountFormDialogComponent, {
      width: '80%',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {
        this.accounts.push(result);
        this.dataSource = new MatTableDataSource<Account>(this.accounts);
      }
    }); */
  }


  openEditInvItemDialog(account: Account) {
    const data = {
      title: 'تعديل الحساب',
      formMode: FormMode.EDIT,
      account: account

    };
   /*  const dialogRef = this.dialog.open(AccountFormDialogComponent, {
      width: '80%',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {
        this.accounts.push(result);
        this.dataSource = new MatTableDataSource<Account>(this.accounts);
      }
    }); */
  }
}
