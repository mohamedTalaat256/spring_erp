import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith, take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
import { Account } from 'src/app/model/accounty';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
 import { SalesService } from 'src/app/service/sale.service';
import { SaleReturnFormDialogComponent } from '../sale-return-form-dialog/sale-return-form-dialog.component';
import { SalesReturnService } from 'src/app/service/saleReturn.service';

@Component({
  selector: 'app-sales-return',
  templateUrl: './sales-return.component.html',
  styleUrls: ['./sales-return.component.scss']
})
export class SalesReturnComponent {
  customerFormControl = new FormControl<string | any>('');
  storeFormControl = new FormControl<string | any>('');


  customers: any[] = [];
  filteredcustomer: Observable<any[]>;


  salesReturn: any[] = [];

  createData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedColumns: string[] = [
    'autoSerial',
    'supplierName',
    'orderDate',
    'pillType',
    'totalCost',
    'approveStatus',
    'actions'
  ];
  dataSource = new MatTableDataSource<any>(this.salesReturn);

  constructor(public dialog: MatDialog,
    private salesReturnService: SalesReturnService

    ) { }



  ngOnInit(): void {
    this.findAll();
    this.setFilters();


  }

  findAll() {
    this.salesReturnService.findAll().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.customers = response.data.customers;
          this.salesReturn = response.data.salesReturn;

          this.dataSource = new MatTableDataSource<any>(this.salesReturn);
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

  onSubmit(){}


  openAddNew() {

    const data = {
      title: 'اضافة فاتورة مرتجع مبيعات عام',
      formMode: FormMode.CREATE,
      customers: this.customers
    };
    /* const dialogRef = */ this.dialog.open(SaleReturnFormDialogComponent, {
      width: '650px',
      height: 'auto',
      data: data
    });

   /*  dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
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
   /*  const dialogRef = this.dialog.open(SaleDetailsFormDialogComponent, {
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




  setFilters(){
    this.filteredcustomer = this.customerFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._customerFilter(name as string) : this.customers.slice();
      }),
    );


  }

  customerDisplayFn(supplier: any): string {
    return supplier && supplier.name ? supplier.name : '';
  }

  private _customerFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.customers.filter(option => option.name.toLowerCase().includes(filterValue));
  }




}
