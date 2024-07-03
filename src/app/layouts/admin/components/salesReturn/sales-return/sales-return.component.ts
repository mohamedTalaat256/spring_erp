import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith, take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
import { Account } from 'src/app/model/accounty';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  searchForm: FormGroup;
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
    private salesReturnService: SalesReturnService,
    private fb: FormBuilder

    ) { 
      this.searchForm = this.fb.group({
        barCode: [null],
        store: [null],
        supplier: [null],
        fromDate: [null],
        toDate: [null]
      });
    }



  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.salesReturnService.findAll().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.customers = response.data.customers;
          this.salesReturn = response.data.salesReturn;

          this.dataSource = new MatTableDataSource<any>(this.salesReturn);
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

  onSubmitSearch(){}


  openAddNew() {

    const data = {
      title: 'اضافة فاتورة مرتجع مبيعات عام',
      formMode: FormMode.CREATE,
      customers: this.customers
    };
      this.dialog.open(SaleReturnFormDialogComponent, {
      width: '650px',
      height: 'auto',
      data: data
    }); 
  }


  openEditDialog(order: any) {
    const data = {
      title: 'تعديل فاتورة مرتجع مبيعات عام',
      formMode: FormMode.EDIT,
      salesOrder: order,
      customers: this.customers

    };
    const dialogRef = this.dialog.open(SaleReturnFormDialogComponent, {
      width: '650px',
      height: 'auto',
      data: data
    });
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

        this.salesReturnService.delete(invoiceId).subscribe(
          {
            next:(response: AppResponse)=>{
              if(response.ok){

                Swal.fire({
                  icon: "success",
                  title: response.message,
                  showConfirmButton: false,
                  timer: 1500
                });
                this.salesReturn = this.salesReturn.filter(i=> i.id !== invoiceId);
                this.dataSource = new MatTableDataSource<any>(this.salesReturn);
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
