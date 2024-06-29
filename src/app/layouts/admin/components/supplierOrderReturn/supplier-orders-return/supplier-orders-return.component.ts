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
import { SupplierOrdersReturnDetailsFormDialogComponent } from '../supplier-orders-return-details-form-dialog/supplier-orders-return-details-form-dialog.component';
import { SupplierOrderReturnService } from 'src/app/service/supplierOrderReturn.service';
import { SupplierOrdersReturnFormDialogComponent } from '../supplier-orders-return-form-dialog/supplier-orders-return-form-dialog.component';
import { SupplierOrderReturn } from 'src/app/model/supplierOrderReturn';

@Component({
  selector: 'app-supplier-orders-return',
  templateUrl: './supplier-orders-return.component.html',
  styleUrls: ['./supplier-orders-return.component.scss']
})
export class SupplierOrdersReturnComponent {

  supplierFormControl = new FormControl<string | any>('');
  storeFormControl = new FormControl<string | any>('');


  suppliers: any[] = [];
  filteredSuppliers: Observable<any[]>;
  filteredStores: Observable<any[]>;

  stores: any[] = [];
  supplierOrdersReturn: SupplierOrderReturn[] = [];

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
  dataSource = new MatTableDataSource<SupplierOrderReturn>(this.supplierOrdersReturn);

  constructor(public dialog: MatDialog,
    private supplierOrderReturnService: SupplierOrderReturnService

    ) { }



  ngOnInit(): void {
    this.findAll();



  }

  findAll() {
    this.supplierOrderReturnService.findAll().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.suppliers = response.data.suppliers;
          this.supplierOrdersReturn = response.data.suppliersWithOrdersReturns;
          this.stores = response.data.stores;

          this.dataSource = new MatTableDataSource<SupplierOrderReturn>(this.supplierOrdersReturn);
          this.dataSource.paginator = this.paginator;

          this.setFilters();
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


  openAddInvItemDialog() {

    const data = {
      title: 'اضافة فاتورة مرتجع مشتريات عام من مورد',
      formMode: FormMode.CREATE,
      suppliers: this.suppliers,
      stores: this.stores
    };
    /* const dialogRef = */ this.dialog.open(SupplierOrdersReturnFormDialogComponent, {
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
   /*  const dialogRef = this.dialog.open(SupplierOrdersReturnDetailsFormDialogComponent, {
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
    this.filteredSuppliers = this.supplierFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._supplierFilter(name as string) : this.suppliers.slice();
      }),
    );
    this.filteredStores = this.storeFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._storeFilter(name as string) : this.stores.slice();
      }),
    );

  }

  supplierDisplayFn(supplier: any): string {
    return supplier && supplier.name ? supplier.name : '';
  }

  private _supplierFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.suppliers.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  storeDisplayFn(store: any): string {
    return store && store.name ? store.name : '';
  }

  private _storeFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.stores.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}
