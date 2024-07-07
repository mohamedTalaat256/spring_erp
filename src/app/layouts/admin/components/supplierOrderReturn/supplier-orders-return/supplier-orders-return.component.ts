import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith, take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
import { Account } from 'src/app/model/accounty';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SupplierOrdersReturnDetailsFormDialogComponent } from '../supplier-orders-return-details-form-dialog/supplier-orders-return-details-form-dialog.component';
import { SupplierOrderReturnService } from 'src/app/service/supplierOrderReturn.service';
import { SupplierOrdersReturnFormDialogComponent } from '../supplier-orders-return-form-dialog/supplier-orders-return-form-dialog.component';
import { SupplierOrderReturn } from 'src/app/model/supplierOrderReturn';
import { SupplierOrder } from 'src/app/model/supplierOrder';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-supplier-orders-return',
  templateUrl: './supplier-orders-return.component.html',
  styleUrls: ['./supplier-orders-return.component.scss']
})
export class SupplierOrdersReturnComponent {
  pageIndex:number = 0;
  pageSize: number  = 10;
  totalElements: number  =0;

  supplierFormControl = new FormControl<string | any>('');
  storeFormControl = new FormControl<string | any>('');

  searchForm: FormGroup;
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
    private fb: FormBuilder,
    private supplierOrderReturnService: SupplierOrderReturnService

    ) {
      this.searchForm = this.fb.group({
        id: [null],
        supplier: [null],
        store: [null],
        fromDate: [null],
        toDate: [null]
      });
    }



    ngOnInit(): void {
      this.findAll(this.pageIndex, this.pageSize);
    }

    findAll(pageIndex, pageSize) {
    this.supplierOrderReturnService.findAll(pageIndex, pageSize).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.suppliers = response.data.suppliers;
          this.supplierOrdersReturn = response.data.suppliersWithOrdersReturns.content;
          this.totalElements = response.data.suppliersWithOrdersReturns.totalElements;

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

  onSubmit(){}  onSubmitSearch(){
    this.supplierOrderReturnService.search(this.searchForm.value).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.supplierOrdersReturn = response.data;
          this.totalElements = response.data.length;
          this.dataSource = new MatTableDataSource<any>(this.supplierOrdersReturn);
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


  openAddNew() {

    const data = {
      title: 'اضافة فاتورة مرتجع مشتريات عام من مورد',
      formMode: FormMode.CREATE,
      suppliers: this.suppliers,
      stores: this.stores
    };
      this.dialog.open(SupplierOrdersReturnFormDialogComponent, {
      width: '650px',
      height: 'auto',
      data: data
    });

  }


  openEditInvItemDialog(account: Account) {
    const data = {
      title: 'تعديل الحساب',
      formMode: FormMode.EDIT,
      account: account

    };
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


  deleteInvoice(invoiceId: number){

    Swal.fire({
      icon: 'warning',
      title: 'تأكيد',
      showDenyButton: true,
      confirmButtonText: 'نعم',
      confirmButtonColor: '#ed1818',
      denyButtonText: 'لا',
      denyButtonColor: '#54e9ac',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2'
      },
    }).then((result) => {
      if (result.isConfirmed) {

        this.supplierOrderReturnService.delete(invoiceId).subscribe(
          {
            next:(response: AppResponse)=>{
              if(response.ok){

                Swal.fire({
                  icon: "success",
                  title: response.message,
                  showConfirmButton: false,
                  timer: 1500
                });
                this.supplierOrdersReturn = this.supplierOrdersReturn.filter(i=> i.id !== invoiceId);
                this.dataSource = new MatTableDataSource<any>(this.supplierOrdersReturn);
                this.dataSource.paginator = this.paginator;
              }


            },
            error:(error: AppResponse)=>{
              Swal.fire({
                icon: "error",
                title: error.message,
                showConfirmButton: false,
                timer: 1500
              });
            }
          }
        );
       }}
      );

  }

  openEditDialog(order: SupplierOrder) {
    const data = {
      title: 'تعديل فاتورة مرتجع مبيعات',
      formMode: FormMode.EDIT,
      supplierOrder: order,
      suppliers: this.suppliers,
      stores: this.stores

    };

    const dialogRef = this.dialog.open(SupplierOrdersReturnFormDialogComponent, {
      width: '650px',
      height: 'auto',
      data: data
    });


   /*
    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if (result) {
        this.accounts.push(result);
        this.dataSource = new MatTableDataSource<Account>(this.accounts);
      }
    }); */
  }
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.totalElements = e.length;


    this.findAll(this.pageIndex, this.pageSize);
  }

  selectedSupplier(event: MatAutocompleteSelectedEvent) {

    this.searchForm.patchValue({
      supplier: event.option.value.id
    }, { onlySelf: true, emitEvent: true });
  }
}
