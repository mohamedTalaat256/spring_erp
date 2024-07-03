import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith, take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
import { MatPaginator } from '@angular/material/paginator';
import { SupplierOrder } from 'src/app/model/supplierOrder';
import { SupplierOrderService } from 'src/app/service/supplierOrder.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SuppliersOrderFormDialogComponent } from '../suppliers-order-form-dialog/suppliers-order-form-dialog.component';

@Component({
  selector: 'app-suppliers-orders',
  templateUrl: './suppliers-orders.component.html',
  styleUrls: ['./suppliers-orders.component.scss']
})
export class SuppliersOrdersComponent {

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
        barCode: [null],
        supplier: [null],
        fromDate: [null],
        toDate: [null]
      });

    }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.supplierOrderService.findAll().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.suppliers = response.data.suppliers;
          this.supplierOrders = response.data.suppliersWithOrders;
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


   /*
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

}
