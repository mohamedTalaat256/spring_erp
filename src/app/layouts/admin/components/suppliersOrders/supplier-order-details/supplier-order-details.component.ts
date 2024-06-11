import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormMode } from 'src/app/constants/constants';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, startWith, take } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatSelectChange } from '@angular/material/select';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SuppliersOrderItemDetailsFormDialogComponent } from '../suppliers-order-item-details-form-dialog/suppliers-order-item-details-form-dialog.component';
import { InvItemService } from 'src/app/service/invItem.service';
import { AppResponse } from 'src/app/model/app_response.model';
import { InvItem } from 'src/app/model/invItem';
import { SupplierOrderService } from 'src/app/service/supplierOrder.service';
import { InvUom } from 'src/app/model/invUom';



@Component({
  selector: 'app-supplier-order-details',
  templateUrl: './supplier-order-details.component.html',
  styleUrls: ['./supplier-order-details.component.scss']
})
export class SupplierOrderDetailsComponent implements OnInit {
  
  

 
  discountType:number=0;
  discountValue:number=0;
  
  pillType:number=0;
  whatPaid: number=0;
  whatRemain: number=0;
  invoiceForm: FormGroup;

  invoceTotal:number =0;
  displayedColumns: string[] = ['id', 'unit', 'orderItem', 'price', 'amount', 'total', 'actions'];


  supplierOrderDetailsItems: any []=[];
  dataSource = new MatTableDataSource<any>(this.supplierOrderDetailsItems);



  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private supplierOrderService: SupplierOrderService,
   
  ){
    this.invoiceForm = this.fb.group({
      clientNumber:    [null, [Validators.required]],
      date:            [null, [Validators.required]],
      store:           [null, [Validators.required]],
      salesItemType:   [null, [Validators.required]],
      discountType:    [0, [Validators.required]],
      discountPercent: [0, [Validators.required]],
      discountValue:   [0, [Validators.required]],
      pillType:        [null, [Validators.required]],
      whatPaid:        [null, [Validators.required]],
      whatRemain:      [null, [Validators.required]],
      note:            [null],
    });
  }
 
  filteredClients: Observable<any[]>;

 
  ngOnInit(): void {
    this.getSupplierOrderDetails();
  }

 
 
  onSubmit(){



  }

  getSupplierOrderDetails(){
    this.supplierOrderService.findById(1).subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.supplierOrderDetailsItems = response.data.supplierOrderDetails.supplierOrderDetailsItems; 
          this.dataSource = new MatTableDataSource<any>(this.supplierOrderDetailsItems);
 
        
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
      formMode: FormMode.CREATE
    };
    const dialogRef = this.dialog.open(SuppliersOrderItemDetailsFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    }); 

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
 
      if(result){
        let index = this.supplierOrderDetailsItems.find(i=> i.invItemCard.id=== result.invItemId);
        if(index){
          Swal.fire({ 
            icon: "error",
            title: "الصنف موجود بالفعل بالفاتورة, يمكنك التعديل عليه",
            showConfirmButton: true,
          
          });
          return;
        }
        console.log(result);

       
        this.supplierOrderDetailsItems.push(result);
        this.dataSource = new MatTableDataSource<any>(this.supplierOrderDetailsItems);

        this.calculateInvoiceItemTotal();

      }
    });
  }

  openEditInvItemDialog(invItem) { 

    const data = {
      title: 'تعديل صنف في الفاتورة',
      formMode: FormMode.EDIT,
      invItem:invItem
    };
    const dialogRef = this.dialog.open(SuppliersOrderItemDetailsFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    }); 

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
 
      
      if(result){
 
        this.supplierOrderDetailsItems.push(result);
        this.dataSource = new MatTableDataSource<any>(this.supplierOrderDetailsItems);

      }
    });
  }


  deleteInvItem(invItem){
    this.supplierOrderDetailsItems = this.supplierOrderDetailsItems.filter(i=> i.id !== invItem.invItem);
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
