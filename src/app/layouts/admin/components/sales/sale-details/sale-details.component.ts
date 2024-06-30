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
import { SaleDetailsFormDialogComponent } from '../sale-details-form-dialog/sale-details-form-dialog.component';
import { SalesService } from 'src/app/service/sale.service';
import { SalesOrderDetailsService } from 'src/app/service/salesOrderDetails.service';
import { emptySalesOrder } from 'src/app/model/sales-order.model';
@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.scss']
})
export class SaleDetailsComponent {



  discountType:number=0;
  discountValue:number=0;

  pillType:number=0;
  whatPaid: number=0;
  whatRemain: number=0;
  invoiceForm: FormGroup;

  avialableBalance: number =0;

  salesOrder: any = emptySalesOrder;

  invoceTotal:number =0;
  displayedColumns: string[] = ['id', 'store', 'orderItem', 'unit',  'price', 'amount', 'total', 'actions'];


  salesInvoiceDetails: any []=[];
  dataSource = new MatTableDataSource<any>(this.salesInvoiceDetails);
  id: number;


  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private salesService: SalesService,
    private salesOrderDetailsService: SalesOrderDetailsService,
    private route: ActivatedRoute,

  ){
    this.invoiceForm = this.fb.group({
      id:         [0,  ],
      discountType:    [0, [Validators.required]],
      discountPercent: [0, [Validators.required]],
      discountValue:   [0, [Validators.required]],
      pillType:        [null, [Validators.required]],
      whatPaid:        [null, [Validators.required]],
      whatRemain:      [null, [Validators.required]],
      taxPercent:      [null, [Validators.required]],
      notes:           [null],
    });
  }

  filteredClients: Observable<any[]>;


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getSalesOrderDetails(params['id']);

    });
  }



  onSubmit(){
    console.log(this.invoiceForm.value);


    this.salesService.approve(this.invoiceForm.value).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: response.message,
            showConfirmButton: true
          });
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

  getSalesOrderDetails(id: number){
    this.salesService.findById(id).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.salesInvoiceDetails = response.data.salesInvoiceDetails;
          this.dataSource = new MatTableDataSource<any>(this.salesInvoiceDetails);

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

  setInvoice(){
    this.invoiceForm = this.fb.group({
      id:          [this.salesOrder.id,  ],
      discountType:    [this.salesOrder.discountType, [Validators.required]],
      discountPercent: [this.salesOrder.discountPercent, [Validators.required]],
      discountValue:   [this.salesOrder.discountValue, [Validators.required]],
      pillType:        [this.salesOrder.pillType, [Validators.required]],
      whatPaid:        [this.salesOrder.whatPaid, [Validators.required]],
      whatRemain:      [this.salesOrder.whatRemain, [Validators.required]],
      taxPercent:  [this.salesOrder.taxPercent, [Validators.required]],
      notes:            [this.salesOrder.notes],
    });
  }

  openAddInvItemDialog() {
    const data = {
      title: 'اضافة صنف الي الفاتورة',
      formMode: FormMode.CREATE,
      orderId: this.id
    };
    const dialogRef = this.dialog.open(SaleDetailsFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {

      if(result){
        let index = this.salesInvoiceDetails.find(i=> i.invItemCard.id=== result.invItemId);
        if(index){
          Swal.fire({
            icon: "error",
            title: "الصنف موجود بالفعل بالفاتورة, يمكنك التعديل عليه",
            showConfirmButton: true,

          });
          return;
        }
        this.salesOrder= result;
        this.salesInvoiceDetails = this.salesOrder.salesInvoiceDetails;
        this.dataSource = new MatTableDataSource<any>(this.salesInvoiceDetails);
        this.setInvoice();

        this.calculateInvoiceItemTotal();

      }
    });
  }

  openEditInvItemDialog(orderItem) {

    const data = {
      title: 'تعديل صنف في الفاتورة',
      formMode: FormMode.EDIT,
      orderItem:orderItem,
      orderId: this.id
    };
    const dialogRef = this.dialog.open(SaleDetailsFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {


      if(result){
        this.salesInvoiceDetails= result;
        this.dataSource = new MatTableDataSource<any>(this.salesInvoiceDetails);

      }
    });
  }


  deleteInvItem(invItem){

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

        this.salesOrderDetailsService.delete(invItem.id).subscribe(
          {
            next:(response: any)=>{

              if(response.ok){
               // this.salesInvoiceDetails.removeAt(index);

               this.salesOrder = response.data;

               this.salesInvoiceDetails = response.data.salesInvoiceDetails;
               this.dataSource = new MatTableDataSource<any>(this.salesInvoiceDetails);

                Swal.fire({
                  icon: "success",
                  title: response.message,
                  showConfirmButton: false,
                  timer: 1500
                });
                this.salesInvoiceDetails = response.data;

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
        Swal.fire('تم الحذف', '', 'success')
      }}
      );
    this.salesInvoiceDetails = this.salesInvoiceDetails.filter(i=> i.id !== invItem.invItem);
  }

  calculateInvoiceItemTotal(){
    let total = 0;
  //  this.invItems.forEach(i=> total+= (i.price * i.amount));
    this.invoceTotal = total;
    this.pillType = 1;
    this.invoiceForm.patchValue({
      pillType: total
    });
  }

  onDiscountTypeChange(event:MatSelectChange){
    this.discountType = Number(event.value);
  }

  ondiscountValueChange(){
    if(this.discountType ===1){
      this.discountValue =   this.invoceTotal * (this.invoiceForm.value.discountPercent / 100);

    }else if(this.discountType ===2){
      this.discountValue =  this.invoiceForm.value.discountValue ;
    }else{
      this.discountValue =0;
    }
  }

  onPillTypeChange(event:MatSelectChange){
    this.pillType = Number(event.value);
    if(this.pillType === 1){
      this.invoiceForm.patchValue(
        {
          whatPaid: this.invoceTotal,
          whatRemain: 0
        }
      );
    }else if(this.pillType === 2){
      this.invoiceForm.patchValue(
        {
          whatPaid: 0,
          whatRemain: this.invoceTotal
        }
      );
    }
  }



}
