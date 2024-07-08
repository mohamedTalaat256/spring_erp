import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormMode } from 'src/app/constants/constants';
import { MatDialog } from '@angular/material/dialog';
import { Observable, take } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatSelectChange } from '@angular/material/select';
import { AppResponse } from 'src/app/model/app_response.model';
import { ActivatedRoute } from '@angular/router';
import { SupplierOrdersReturnDetailsFormDialogComponent } from '../supplier-orders-return-details-form-dialog/supplier-orders-return-details-form-dialog.component';
import { SupplierOrderReturnService } from 'src/app/service/supplierOrderReturn.service';
import { SupplierOrderReturnDetailsService } from 'src/app/service/supplierOrderReturnDetails.service';
import { SupplierOrderReturn, emptySupplierOrderReturn } from 'src/app/model/supplierOrderReturn';

@Component({
  selector: 'app-supplier-orders-return-details',
  templateUrl: './supplier-orders-return-details.component.html',
  styleUrls: ['./supplier-orders-return-details.component.scss']
})
export class SupplierOrdersReturnDetailsComponent implements OnInit {



  discountType: number = 0;
  discountValue: number = 0;

  pillType: number = 0;
  whatPaid: number = 0;
  whatRemain: number = 0;
  invoiceForm: FormGroup;


  supplierOrderReturn: SupplierOrderReturn = emptySupplierOrderReturn;

  invoceTotal: number = 0;
  displayedColumns: string[] = ['id', 'unit', 'orderItem', 'price', 'amount', 'total', 'actions'];


  supplierOrderDetailsItems: any[] = [];
  dataSource = new MatTableDataSource<any>(this.supplierOrderDetailsItems);
  orderId: number;


  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private supplierOrderReturnService: SupplierOrderReturnService,
    private supplierOrderReturnDetailsService: SupplierOrderReturnDetailsService,
    private route: ActivatedRoute,

  ) {
    this.invoiceForm = this.fb.group({
      orderId: [0,],
      discountType: [0, [Validators.required]],
      discountPercent: [0, [Validators.required]],
      discountValue: [0, [Validators.required]],
      pillType: [null, [Validators.required]],
      whatPaid: [null, [Validators.required]],
      whatRemain: [null, [Validators.required]],
      notes: [null],
    });
  }

  filteredClients: Observable<any[]>;


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = params['id'];
      this.getSupplierOrderDetails(params['id']);

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

    this.supplierOrderReturnService.upprove(this.invoiceForm.value).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: response.message,
            showConfirmButton: true
          });

          this.supplierOrderReturn = response.data;
          this.setInvoiceFrom();
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

  }});




  }

  getSupplierOrderDetails(id: number) {



        this.supplierOrderReturnService.findById(id).subscribe({
          next: (response: AppResponse) => {
            if (response.ok) {
              this.supplierOrderDetailsItems = response.data.supplierOrderDetailsItems;
              this.dataSource = new MatTableDataSource<any>(this.supplierOrderDetailsItems);

              this.supplierOrderReturn = response.data;
              this.setInvoiceFrom();
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

  setInvoiceFrom() {
    this.invoiceForm = this.fb.group({
      orderId: [this.supplierOrderReturn.id,],
      discountType: [this.supplierOrderReturn.discountType !== null ? this.supplierOrderReturn.discountType : 0, [Validators.required]],
      discountPercent: [this.supplierOrderReturn.discountPercent !== null ? this.supplierOrderReturn.discountPercent : 0, [Validators.required]],
      discountValue: [this.supplierOrderReturn.discountValue !== null ? this.supplierOrderReturn.discountValue : 0, [Validators.required]],
      pillType: [this.supplierOrderReturn.pillType !== null ? this.supplierOrderReturn.pillType : 0, [Validators.required]],
      whatPaid: [this.supplierOrderReturn.whatPaid !== null ? this.supplierOrderReturn.whatPaid : 0, [Validators.required]],
      whatRemain: [this.supplierOrderReturn.whatRemain !== null ? this.supplierOrderReturn.whatRemain : 0, [Validators.required]],
      notes: [this.supplierOrderReturn.notes],
    });

    this.discountValue = this.supplierOrderReturn.discountValue;
    this.whatPaid = this.supplierOrderReturn.whatPaid;
    this.whatRemain = this.supplierOrderReturn.whatRemain;
  }

  openAddInvItemDialog() {
    const data = {
      title: 'اضافة صنف الي الفاتورة',
      formMode: FormMode.CREATE,
      orderId: this.orderId,
      storeId: this.supplierOrderReturn.store.id
    };
    const dialogRef = this.dialog.open(SupplierOrdersReturnDetailsFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {

      if (result &&result !== null) {
        let index = this.supplierOrderDetailsItems.find(i => i.invItemCard.id === result.invItemId);
        if (index) {
          Swal.fire({
            icon: "error",
            title: "الصنف موجود بالفعل بالفاتورة, يمكنك التعديل عليه",
            showConfirmButton: true,

          });
          return;
        }

        console.log(result);
        this.supplierOrderReturn = result;

        this.supplierOrderDetailsItems = this.supplierOrderReturn.supplierOrderDetailsItems;
        this.dataSource = new MatTableDataSource<any>(this.supplierOrderDetailsItems);

      }
    });
  }

  openEditInvItemDialog(orderItem) {

    const data = {
      title: 'تعديل صنف في الفاتورة',
      formMode: FormMode.EDIT,
      orderItem: orderItem,
      orderId: this.orderId,
      storeId: this.supplierOrderReturn.store.id
    };
    const dialogRef = this.dialog.open(SupplierOrdersReturnDetailsFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {


      if (result) {
        this.supplierOrderReturn = result;
        this.supplierOrderDetailsItems = result.supplierOrderDetailsItems;
        this.dataSource = new MatTableDataSource<any>(this.supplierOrderDetailsItems);

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

        this.supplierOrderReturnDetailsService.delete(invItem.id).subscribe(
          {
            next: (response: any) => {

              if (response.ok) {

                Swal.fire({
                  icon: "success",
                  title: response.message,
                  showConfirmButton: false,
                  timer: 1500
                });
                this.supplierOrderReturn = response.data;
                this.supplierOrderDetailsItems = this.supplierOrderReturn.supplierOrderDetailsItems;
                this.dataSource = new MatTableDataSource<any>(this.supplierOrderDetailsItems);
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
  }


  onDiscountTypeChange(event: MatSelectChange) {
    this.discountType = Number(event.value);

    this.ondiscountValueChange(null);

  }

  ondiscountValueChange(event) {
    if (this.discountType === 1) {
      this.discountValue = this.supplierOrderReturn.totalCost * (this.invoiceForm.value.discountPercent / 100);

    } else if (this.discountType === 2) {
      this.discountValue = this.invoiceForm.value.discountValue;
    } else {
      this.discountValue = 0;
    }

    this.whatPaid = this.invoiceForm.value.whatPaid;
    this.whatRemain = this.supplierOrderReturn.totalCost - this.discountValue - this.whatPaid;

    this.invoiceForm.patchValue(
      {
        whatPaid: this.whatPaid,
        whatRemain: this.whatRemain
      }
    );
  }

  onPillTypeChange(event: MatSelectChange) {
    this.pillType = Number(event.value);
    if (this.pillType === 1) {
      this.invoiceForm.patchValue(
        {
          whatPaid: this.invoceTotal,
          whatRemain: 0
        }
      );
    } else if (this.pillType === 2) {
      this.invoiceForm.patchValue(
        {
          whatPaid: 0,
          whatRemain: this.invoceTotal
        }
      );
    }
  }

  whatPaidChange(event) {
    this.whatPaid = Number(event.target.value);
    this.whatRemain = this.supplierOrderReturn.totalCost - this.discountValue - this.whatPaid;

    this.invoiceForm.patchValue(
      {
        whatPaid: this.whatPaid,
        whatRemain: this.whatRemain
      }
    );
  }



}
