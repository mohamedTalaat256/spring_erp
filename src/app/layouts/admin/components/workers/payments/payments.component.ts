import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { FormMode } from 'src/app/constants/constants';
import Swal from 'sweetalert2';
import { AppResponse } from 'src/app/model/app_response.model';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor(public dialog: MatDialog, private paymentService: PaymentService){}

  payments:any[]=[];

  displayedColumns: string[] = ['id', 'worker', 'payment', 'paymentDate', 'amount', 'description',  'actions'];
  dataSource = new MatTableDataSource<any>(this.payments);

  ngOnInit(): void {
    this.findAll();
  }


  findAll(){
    this.paymentService.findAll().subscribe({
      next:(response: AppResponse)=>{
        if(response.ok){
           this.payments= response.data.payments;
           this.dataSource = new MatTableDataSource<any>(this.payments);
        }
      },
      error:(error: Error)=>{
        Swal.fire({
          icon: "error",
          title: error.message,
          showConfirmButton: true
        });
      }

    });
  }



  openAddPaymentDialog() {

    const data = {
      title: 'اضافة يومية جديد',
      formMode: FormMode.CREATE
    };
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if(result){
        this.payments.push(result);
        this.dataSource = new MatTableDataSource<any>(this.payments);
      }
    });
  }


  openEditPaymentDialog(payment: any){
    const data = {
      title: 'تعديل اليومية',
      formMode: FormMode.EDIT,
      payment: payment,
    };
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      if(result){
        this.showUpdatedItem(result);
        this.dataSource = new MatTableDataSource<any>(this.payments);
      }
    });
  }


  showUpdatedItem(newItem){
    let indexToUpdate = this.payments.findIndex(item => item.id === newItem.id);
    this.payments[indexToUpdate] = newItem;
   this.payments = Object.assign([], this.payments);
  }
}
