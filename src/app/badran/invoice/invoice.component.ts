import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CATEGORIES, CLIENTS, INV_ITEMS, INV_ITEM_UNIT, SALES_ITEM_TYPES, STORES } from '../data/data';
import { FormMode } from 'src/app/constants/constants';
import { InvItemFormDialogComponent } from '../inv-item-form-dialog/inv-item-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, startWith, take } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatSelectChange } from '@angular/material/select';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';




@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})


export class InvoiceComponent implements OnInit {
  clientNumberControl = new FormControl<string | any>('');
  clients= CLIENTS;
  stores= STORES;
  salesItemTypes= SALES_ITEM_TYPES;
  categories= CATEGORIES;

  discountType:number=0;
  discountValue:number=0;
  
  pillType:number=0;
  whatPaid: number=0;
  whatRemain: number=0;
  invoiceForm: FormGroup;

  invoceTotal:number =0;

  invItems=[];

  displayedColumns: string[] = ['id', 'unit', 'inItem', 'price', 'amount', 'total', 'actions'];
  dataSource = new MatTableDataSource<any>(this.invItems);


  constructor(private fb: FormBuilder,
    public dialog: MatDialog
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

  ngOnInit() {
    this.filteredClients = this.clientNumberControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.clients.slice();
      }),
    );
  }

  displayFn(client: any): string {
    return client && client.name ? client.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.clients.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.invoiceForm.patchValue({
      clientNumber: event.option.value
    });
  }
  onSubmit(){

  }

  openAddInvItemDialog() { 

    const data = {
      title: 'اضافة صنف الي الفاتورة',
      formMode: FormMode.CREATE
    };
    const dialogRef = this.dialog.open(InvItemFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    }); 

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
 
      
      
      if(result){
        let index = this.invItems.find(i=> i.invItemId=== result.invItemId);
        if(index){
          Swal.fire({ 
            icon: "error",
            title: "الصنف موجود بالفعل بالفاتورة, يمكنك التعديل عليه",
            showConfirmButton: true,
          
          });
          return;
        }
        console.log(result);

        result.name = INV_ITEMS.filter(i=> i.id=== result.invItemId.id)[0].name;
        result.unitName = INV_ITEM_UNIT.filter(i=> i.id=== result.unitId)[0].name;
        this.invItems.push(result);
        this.dataSource = new MatTableDataSource<any>(this.invItems);

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
    const dialogRef = this.dialog.open(InvItemFormDialogComponent, {
      width: '400px',
      height: 'auto',
      data: data
    }); 

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
 
      
      if(result){

        result.name = INV_ITEMS.filter(i=> i.id=== result.invItemId)[0].name;
        this.invItems.push(result);
        this.dataSource = new MatTableDataSource<any>(this.invItems);

      }
    });
  }


  deleteInvItem(invItem){
    this.invItems = this.invItems.filter(i=> i.invItemId !== invItem.invItem);
  }

  calculateInvoiceItemTotal(){
    let total = 0;
    this.invItems.forEach(i=> total+= (i.price * i.amount));
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
