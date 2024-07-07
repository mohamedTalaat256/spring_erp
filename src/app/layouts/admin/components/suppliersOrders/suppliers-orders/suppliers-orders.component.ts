import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith, take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SupplierOrder } from 'src/app/model/supplierOrder';
import { SupplierOrderService } from 'src/app/service/supplierOrder.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SuppliersOrderFormDialogComponent } from '../suppliers-order-form-dialog/suppliers-order-form-dialog.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-suppliers-orders',
  templateUrl: './suppliers-orders.component.html',
  styleUrls: ['./suppliers-orders.component.scss']
})
export class SuppliersOrdersComponent {
  pageIndex:number = 0;
  pageSize: number  = 10;
  totalElements: number  =0;
  supplierFormControl = new FormControl<string | any>('');


  suppliers: any[] = [];
  filteredSuppliers: Observable<any[]>;

  stores: any[] = [];
  supplierOrders: SupplierOrder[] = [];

  createData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  searchForm: FormGroup;



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
    private fb: FormBuilder,
    private supplierOrderService: SupplierOrderService
    ) {

      this.searchForm = this.fb.group({
        id: [null],
        store: [null],
        supplier: [null],
        fromDate: [null],
        toDate: [null]
      });

    }

    ngOnInit(): void {
      this.findAll(this.pageIndex, this.pageSize);
    }

    findAll(pageIndex, pageSize) {
    this.supplierOrderService.findAll(pageIndex, pageSize).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.suppliers = response.data.suppliers;
          this.supplierOrders = response.data.suppliersWithOrders.content;
          this.totalElements = response.data.suppliersWithOrders.totalElements;

          this.stores = response.data.stores;

          this.dataSource = new MatTableDataSource<SupplierOrder>(this.supplierOrders);
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

  onSubmitSearch(){
    console.log(this.searchForm.value);

    this.supplierOrderService.search(this.searchForm.value).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.supplierOrders = response.data;
          this.totalElements = response.data.length;
          this.dataSource = new MatTableDataSource<any>(this.supplierOrders);
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


  openAddDialog() {
    const data = {
      title: 'اضافة فاتورة مشتريات من مورد',
      formMode: FormMode.CREATE,
      suppliers: this.suppliers,
      stores: this.stores
    };
     this.dialog.open(SuppliersOrderFormDialogComponent, {
      width: '650px',
      height: 'auto',
      data: data
    });
  }


  openEditDialog(order: SupplierOrder) {
    const data = {
      title: 'تعديل الحساب',
      formMode: FormMode.EDIT,
      supplierOrder: order,
      suppliers: this.suppliers,
      stores: this.stores

    };

    const dialogRef = this.dialog.open(SuppliersOrderFormDialogComponent, {
      width: '650px',
      height: 'auto',
      data: data
    });
  }




  setFilters(){
    this.filteredSuppliers = this.supplierFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._supplierFilter(name as string) : this.suppliers.slice();
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

        this.supplierOrderService.delete(invoiceId).subscribe(
          {
            next:(response: AppResponse)=>{
              if(response.ok){

                Swal.fire({
                  icon: "success",
                  title: response.message,
                  showConfirmButton: false,
                  timer: 1500
                });
                this.supplierOrders = this.supplierOrders.filter(i=> i.id !== invoiceId);

                this.dataSource = new MatTableDataSource<any>(this.supplierOrders);
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
