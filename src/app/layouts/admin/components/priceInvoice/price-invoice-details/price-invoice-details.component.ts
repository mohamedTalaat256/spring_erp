import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormMode } from 'src/app/constants/constants';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, startWith, take } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
 import { AppResponse } from 'src/app/model/app_response.model';
import { ActivatedRoute } from '@angular/router';
  import { emptySalesOrder } from 'src/app/model/sales-order.model';
import { PriceInvoiceDetailsFormDialogComponent } from '../price-invoice-details-form-dialog/price-invoice-details-form-dialog.component';
import { PriceInvoiceService } from 'src/app/service/priceInvoice.service';
@Component({
  selector: 'app-price-invoice-details',
  templateUrl: './price-invoice-details.component.html',
  styleUrls: ['./price-invoice-details.component.scss']
})
export class PriceInvoiceDetailsComponent {

  invoiceForm: FormGroup;

  priceInvoice: any = emptySalesOrder;

  invoceTotal: number = 0;
  displayedColumns: string[] = ['id',  'orderItem', 'unit', 'price', 'amount', 'total', 'actions'];


  priceInvoiceDetails: any[] = [];
  dataSource = new MatTableDataSource<any>(this.priceInvoiceDetails);
  id: number;


  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
     private priceInvoiceService: PriceInvoiceService,
    private route: ActivatedRoute,

  ) {
    this.invoiceForm = this.fb.group({
      id: [0,],
    });
  }

  filteredClients: Observable<any[]>;


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getDetails(params['id']);

    });
  }


  getDetails(id: number) {
    this.priceInvoiceService.findById(id).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.priceInvoiceDetails = response.data.priceInvoiceDetails;
          this.dataSource = new MatTableDataSource<any>(this.priceInvoiceDetails);

          this.priceInvoice = response.data;
          this.setInvoice();
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

  setInvoice() {
    this.invoiceForm = this.fb.group({
      id: [this.priceInvoice.id,],
    });
  }

  openAddInvItemDialog() {
    const data = {
      title: 'اضافة صنف الي الفاتورة',
      formMode: FormMode.CREATE,
      priceInvoiceId: this.id
    };
    const dialogRef = this.dialog.open(PriceInvoiceDetailsFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {

      if (result !== null) {

        this.priceInvoice = result;
        this.priceInvoiceDetails = this.priceInvoice.priceInvoiceDetails;
        this.dataSource = new MatTableDataSource<any>(this.priceInvoiceDetails);
        this.setInvoice();


      }
    });
  }

  deleteInvItem(invItem) {

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

        this.priceInvoiceService.deleteItem(invItem.id).subscribe(
          {
            next: (response: any) => {

              if (response.ok) {
                Swal.fire({
                  icon: "success",
                  title: response.message,
                  showConfirmButton: false,
                  timer: 1500
                });
                this.priceInvoice = response.data;

                this.priceInvoiceDetails = response.data.priceInvoiceDetails;
                this.dataSource = new MatTableDataSource<any>(this.priceInvoiceDetails);

              }


            },
            error: (error: AppResponse) => {
              Swal.fire({
                icon: "error",
                title: error.message,
                showConfirmButton: false,
                timer: 1500
              });
            }
          }
        );
      }
    }
    );
  }

}
