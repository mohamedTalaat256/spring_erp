import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith, take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
import { Account } from 'src/app/model/accounty'; 
import { MatPaginator } from '@angular/material/paginator';
import { SupplierOrder } from 'src/app/model/supplierOrder';
import { SupplierOrderService } from 'src/app/service/supplierOrder.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SuppliersOrderFormDialogComponent } from '../suppliers-order-form-dialog/suppliers-order-form-dialog.component';

@Component({
  selector: 'app-suppliers-orders',
  templateUrl: './suppliers-orders.component.html',
  styleUrls: ['./suppliers-orders.component.scss']
})
export class SuppliersOrdersComponent {

  supplierFormControl = new FormControl<string | any>(''); 
  storeFormControl = new FormControl<string | any>('');

  
  suppliers: any[] = [];
  filteredSuppliers: Observable<any[]>;
  filteredStores: Observable<any[]>;

  stores: any[] = []; 
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
    this.setFilters();

    
  }

  findAll() {
    this.supplierOrderService.findAll().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.suppliers = response.data.suppliers;
          this.supplierOrders = response.data.suppliersOrders;
          this.stores = response.data.stores;
         
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

  onSubmit(){}


  openAddInvItemDialog() {

    const data = {
      title: 'اضافة فاتورة مشتريات من مورد',
      formMode: FormMode.CREATE,
      suppliers: this.suppliers,
      stores: this.stores
    };
    /* const dialogRef = */ this.dialog.open(SuppliersOrderFormDialogComponent, {
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
