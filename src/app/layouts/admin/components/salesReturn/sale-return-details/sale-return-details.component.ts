import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormMode } from 'src/app/constants/constants';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, startWith, take } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatSelectChange } from '@angular/material/select';
import { AppResponse } from 'src/app/model/app_response.model';
import { ActivatedRoute } from '@angular/router';
import { SalesOrderDetailsService } from 'src/app/service/salesOrderDetails.service';
import { emptySalesOrder } from 'src/app/model/sales-order.model';
import { SaleReturnDetailsFormDialogComponent } from '../sale-return-details-form-dialog/sale-return-details-form-dialog.component';
import { SalesReturnService } from 'src/app/service/saleReturn.service';
import { SalesReturnOrderDetailsService } from 'src/app/service/salesReturnOrderDetails.service';
@Component({
  selector: 'app-return-sale-details',
  templateUrl: './sale-return-details.component.html',
  styleUrls: ['./sale-return-details.component.scss']
})
export class SaleReturnDetailsComponent {



  discountType: number = 0;
  discountValue: number = 0;

  pillType: number = 0;
  whatPaid: number = 0;
  whatRemain: number = 0;
  invoiceForm: FormGroup;

  avialableBalance: number = 0;

  salesOrder: any = emptySalesOrder;

  invoceTotal: number = 0;
  displayedColumns: string[] = ['id', 'store', 'orderItem', 'unit', 'price', 'amount', 'total', 'actions'];


  salesInvoicesReturnDetails: any[] = [];
  dataSource = new MatTableDataSource<any>(this.salesInvoicesReturnDetails);
  id: number;


  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private salesReturnService: SalesReturnService,
    private salesReturnOrderDetailsService: SalesReturnOrderDetailsService,
    private route: ActivatedRoute,

  ) {
    this.invoiceForm = this.fb.group({
      id: [0,],
      discountType: [0, [Validators.required]],
      discountPercent: [0, [Validators.required]],
      discountValue: [0, [Validators.required]],
      pillType: [null, [Validators.required]],
      whatPaid: [null, [Validators.required]],
      whatRemain: [null, [Validators.required]],
      taxPercent: [null, [Validators.required]],
      notes: [null],
    });
  }

  filteredClients: Observable<any[]>;


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getSalesReturnOrderDetails(params['id']);

    });
  }



  onSubmit() {
    console.log(this.invoiceForm.value);

    Swal.fire({
      icon: 'warning',
      title: 'سيتم اعتماد الفاتورة و تصبح غير قابلة للتعدبل',
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
        this.salesReturnService.approve(this.invoiceForm.value).subscribe({
          next: (response: AppResponse) => {
            if (response.ok) {
              Swal.fire({
                icon: "success",
                title: response.message,
                showConfirmButton: true
              });

              this.salesOrder = response.data;
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
    });




  }

  getSalesReturnOrderDetails(id: number) {
    this.salesReturnService.findById(id).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.salesInvoicesReturnDetails = response.data.salesInvoicesReturnDetails;
          this.dataSource = new MatTableDataSource<any>(this.salesInvoicesReturnDetails);

          this.salesOrder = response.data;
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

  openAddInvItemDialog() {
    const data = {
      title: 'اضافة صنف الي الفاتورة',
      formMode: FormMode.CREATE,
      orderId: this.id
    };
    const dialogRef = this.dialog.open(SaleReturnDetailsFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {

      if (result !== null) {
        let index = this.salesInvoicesReturnDetails.find(i => i.item.invItemCard.id === result.invItemId);
        if (index) {
          Swal.fire({
            icon: "error",
            title: "الصنف موجود بالفعل بالفاتورة, يمكنك التعديل عليه",
            showConfirmButton: true,

          });
          return;
        }
        this.salesOrder = result;
        this.salesInvoicesReturnDetails = result.salesInvoicesReturnDetails;
        this.dataSource = new MatTableDataSource<any>(this.salesInvoicesReturnDetails);

        this.setInvoice();
      }
    });
  }

  openEditInvItemDialog(orderItem) {

    const data = {
      title: 'تعديل صنف في الفاتورة',
      formMode: FormMode.EDIT,
      orderItem: orderItem,
      orderId: this.id
    };
    const dialogRef = this.dialog.open(SaleReturnDetailsFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {


      if (result) {
        this.salesInvoicesReturnDetails = result;
        this.dataSource = new MatTableDataSource<any>(this.salesInvoicesReturnDetails);

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

        this.salesReturnOrderDetailsService.delete(invItem.id).subscribe(
          {
            next: (response: any) => {

              if (response.ok) {
                // this.salesInvoicesReturnDetails.removeAt(index);

                this.salesOrder = response.data;

                this.salesInvoicesReturnDetails = response.data.salesInvoicesReturnDetails;
                this.dataSource = new MatTableDataSource<any>(this.salesInvoicesReturnDetails);

                Swal.fire({
                  icon: "success",
                  title: response.message,
                  showConfirmButton: false,
                  timer: 1500
                });

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
        Swal.fire('تم الحذف', '', 'success')
      }
    }
    );
    this.salesInvoicesReturnDetails = this.salesInvoicesReturnDetails.filter(i => i.id !== invItem.invItem);
  }

  setInvoice() {
    this.invoiceForm = this.fb.group({
      id: [this.salesOrder.id,],
      discountType: [this.salesOrder.discountType !== null ? this.salesOrder.discountType : 0, [Validators.required]],
      discountPercent: [this.salesOrder.discountPercent !== null ? this.salesOrder.discountPercent : 0, [Validators.required]],
      discountValue: [this.salesOrder.discountValue !== null ? this.salesOrder.discountValue : 0, [Validators.required]],
      pillType: [this.salesOrder.pillType !== null ? this.salesOrder.pillType : 0, [Validators.required]],
      whatPaid: [this.salesOrder.whatPaid !== null ? this.salesOrder.whatPaid : 0, [Validators.required]],
      whatRemain: [this.salesOrder.whatRemain !== null ? this.salesOrder.whatRemain : 0, [Validators.required]],
      taxPercent: [this.salesOrder.taxPercent !== null ? this.salesOrder.taxPercent : 0, [Validators.required]],
      notes: [this.salesOrder.notes],
    });

    this.discountValue = this.salesOrder.discountValue;
    this.whatPaid = this.salesOrder.whatPaid;
    this.whatRemain = this.salesOrder.whatRemain;
  }



  onDiscountTypeChange(event: MatSelectChange) {
    this.discountType = Number(event.value);

    this.ondiscountValueChange(null);

  }

  ondiscountValueChange(event) {
    if (this.discountType === 1) {
      this.discountValue = this.salesOrder.totalCost * (this.invoiceForm.value.discountPercent / 100);

    } else if (this.discountType === 2) {
      this.discountValue = this.invoiceForm.value.discountValue;
    } else {
      this.discountValue = 0;
    }

    this.whatPaid = this.invoiceForm.value.whatPaid;
    this.whatRemain = this.salesOrder.totalCost - this.discountValue - this.whatPaid;

    this.invoiceForm.patchValue(
      {
        whatPaid: this.whatPaid,
        whatRemain: this.whatRemain,
        discountValue: this.discountValue
      }
    );
  }

  onPillTypeChange(event: MatSelectChange) {
    this.pillType = Number(event.value);
    if (this.pillType === 1) {
      this.invoiceForm.patchValue(
        {
          whatPaid: this.invoceTotal,
          whatRemain: 0,
          discountValue: this.discountValue
        }
      );
    } else if (this.pillType === 2) {
      this.invoiceForm.patchValue(
        {
          whatPaid: 0,
          whatRemain: this.invoceTotal,
          discountValue: this.discountValue
        }
      );
    }
  }

  whatPaidChange(event) {
    this.whatPaid = Number(event.target.value);
    this.whatRemain = this.salesOrder.totalCost - this.discountValue - this.whatPaid;

    this.invoiceForm.patchValue(
      {
        whatPaid: this.whatPaid,
        whatRemain: this.whatRemain,
        discountValue: this.discountValue
      }
    );
  }




}
