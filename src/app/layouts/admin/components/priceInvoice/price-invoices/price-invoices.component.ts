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
import { PriceInvoiceService } from 'src/app/service/priceInvoice.service';
import { PriceInvoiceFormDialogComponent } from '../price-invoice-form-dialog/price-invoice-invoice-form-dialog.component';

@Component({
  selector: 'app-price-invoices',
  templateUrl: './price-invoices.component.html',
  styleUrls: ['./price-invoices.component.scss']
})
export class PriceInvoicesComponent implements OnInit {
  customerFormControl = new FormControl<string | any>('');
  storeFormControl = new FormControl<string | any>('');


  customers: any[] = [];
  filteredcustomer: Observable<any[]>;

  priceInvoices: any[] = [];

  createData: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedColumns: string[] = [
    'autoSerial',
    'orderDate',
    'totalCost',
    'notes',
    'actions'
  ];
  dataSource = new MatTableDataSource<any>(this.priceInvoices);

  constructor(public dialog: MatDialog,
    private priceInvoicesService: SalesService,
    private priceInvoiceService: PriceInvoiceService,
    private fb: FormBuilder
    ) {
     }



  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.priceInvoiceService.findAll().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.priceInvoices = response.data;

          this.dataSource = new MatTableDataSource<any>(this.priceInvoices);
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

  onSubmitSearch(){}


  openAddNew() {

    const data = {
      title: 'اضافة فاتورة عرض اسعار',
      formMode: FormMode.CREATE,
    };
    this.dialog.open( PriceInvoiceFormDialogComponent, {
      width: '650px',
      height: 'auto',
      data: data
    });
  }


  openEditDialog(invoice: any) {
    const data = {
      title: 'تعديل فاتورة عرض اسعار',
      formMode: FormMode.EDIT,
      priceInvoice: invoice,
      customers: this.customers

    };
    const dialogRef = this.dialog.open(PriceInvoiceFormDialogComponent, {
      width: '650px',
      height: 'auto',
      data: data
    });
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

        this.priceInvoicesService.delete(invoiceId).subscribe(
          {
            next:(response: AppResponse)=>{
              if(response.ok){

                Swal.fire({
                  icon: "success",
                  title: response.message,
                  showConfirmButton: false,
                  timer: 1500
                });
                this.priceInvoices = this.priceInvoices.filter(i=> i.id !== invoiceId);
                this.dataSource = new MatTableDataSource<any>(this.priceInvoices);
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
