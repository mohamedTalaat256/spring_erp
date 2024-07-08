import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormMode } from 'src/app/constants/constants';
import { MatDialog } from '@angular/material/dialog';
import { Observable, take } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatSelectChange } from '@angular/material/select';
import { SuppliersOrderItemDetailsFormDialogComponent } from '../suppliers-order-item-details-form-dialog/suppliers-order-item-details-form-dialog.component';
import { AppResponse } from 'src/app/model/app_response.model';
import { SupplierOrderService } from 'src/app/service/supplierOrder.service';
import { ActivatedRoute } from '@angular/router';
import { SupplierOrderDetailsService } from 'src/app/service/supplierOrderDetails.service';



@Component({
  selector: 'app-supplier-order-details',
  templateUrl: './supplier-order-details.component.html',
  styleUrls: ['./supplier-order-details.component.scss']
})
export class SupplierOrderDetailsComponent implements OnInit {


  discountType: number = 0;
  discountValue: number = 0;

  pillType: number = 0;
  whatPaid: number = 0;
  whatRemain: number = 0;
  invoiceForm: FormGroup;


  supplierOrder: any;

  invoceTotal: number = 0;
  displayedColumns: string[] = ['id', 'unit', 'orderItem', 'price', 'amount', 'total', 'actions'];


  supplierOrderDetailsItems: any[] = [];
  dataSource = new MatTableDataSource<any>(this.supplierOrderDetailsItems);
  orderId: number;


  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private supplierOrderService: SupplierOrderService,
    private supplierOrderDetailsService: SupplierOrderDetailsService,
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

        this.supplierOrderService.upprove(this.invoiceForm.value).subscribe({
          next: (response: AppResponse) => {
            if (response.ok) {
              Swal.fire({
                icon: "success",
                title: response.message,
                showConfirmButton: true
              });

              this.supplierOrderDetailsItems = response.data.supplierOrderDetailsItems;
              this.dataSource = new MatTableDataSource<any>(this.supplierOrderDetailsItems);

              this.supplierOrder = response.data;
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

  getSupplierOrderDetails(id: number) {
    this.supplierOrderService.findById(id).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.supplierOrderDetailsItems = response.data.supplierOrderDetailsItems;
          this.dataSource = new MatTableDataSource<any>(this.supplierOrderDetailsItems);

          this.supplierOrder = response.data;
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
      orderId: [this.supplierOrder.id,],
      discountType: [this.supplierOrder.discountType, [Validators.required]],
      discountPercent: [this.supplierOrder.discountPercent, [Validators.required]],
      discountValue: [this.supplierOrder.discountValue, [Validators.required]],
      pillType: [this.supplierOrder.pillType !== null ? this.supplierOrder.pillType : 0, [Validators.required]],
      whatPaid: [this.supplierOrder.whatPaid !== null ? this.supplierOrder.whatPaid : 0, [Validators.required]],
      whatRemain: [this.supplierOrder.whatRemain !== null ? this.supplierOrder.whatRemain : 0, [Validators.required]],
      notes: [this.supplierOrder.notes],
    });
    this.discountValue = this.supplierOrder.discountValue;
    this.whatPaid = this.supplierOrder.whatPaid;
    this.whatRemain = this.supplierOrder.whatRemain;

  }

  openAddInvItemDialog() {
    const data = {
      title: 'اضافة صنف الي الفاتورة',
      formMode: FormMode.CREATE,
      orderId: this.orderId
    };
    const dialogRef = this.dialog.open(SuppliersOrderItemDetailsFormDialogComponent, {
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

        this.supplierOrder = result;
        this.supplierOrderDetailsItems = this.supplierOrder.supplierOrderDetailsItems;
        this.dataSource = new MatTableDataSource<any>(this.supplierOrderDetailsItems);
      }
    });
  }

  openEditInvItemDialog(orderItem) {

    const data = {
      title: 'تعديل صنف في الفاتورة',
      formMode: FormMode.EDIT,
      orderItem: orderItem,
      orderId: this.orderId
    };
    const dialogRef = this.dialog.open(SuppliersOrderItemDetailsFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {


      if (result) {
        this.supplierOrderDetailsItems = result;
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

        this.supplierOrderDetailsService.delete(invItem.id).subscribe(
          {
            next: (response: any) => {

              if (response.ok) {

                Swal.fire({
                  icon: "success",
                  title: response.message,
                  showConfirmButton: false,
                  timer: 1500
                });
                this.supplierOrder = response.data;
                this.supplierOrderDetailsItems = this.supplierOrder.supplierOrderDetailsItems;
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
    this.supplierOrderDetailsItems = this.supplierOrderDetailsItems.filter(i => i.id !== invItem.invItem);
  }


  onDiscountTypeChange(event: MatSelectChange) {
    this.discountType = Number(event.value);

    this.ondiscountValueChange(null);

  }

  ondiscountValueChange(event) {
    if (this.discountType === 1) {
      this.discountValue = this.supplierOrder.totalCost * (this.invoiceForm.value.discountPercent / 100);

    } else if (this.discountType === 2) {
      this.discountValue = this.invoiceForm.value.discountValue;
    } else {
      this.discountValue = 0;
    }

    this.whatPaid = this.invoiceForm.value.whatPaid;
    this.whatRemain = this.supplierOrder.totalCost - this.discountValue - this.whatPaid;

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
    this.whatRemain = this.supplierOrder.totalCost - this.discountValue - this.whatPaid;

    this.invoiceForm.patchValue(
      {
        whatPaid: this.whatPaid,
        whatRemain: this.whatRemain
      }
    );
  }
}
