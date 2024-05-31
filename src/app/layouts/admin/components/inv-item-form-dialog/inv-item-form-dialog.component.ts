import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CATEGORIES, CLIENTS, INV_ITEMS, INV_ITEM_UNIT, SALES_ITEM_TYPES, STORES } from '../data/data';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode } from 'src/app/constants/constants';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-inv-item-form-dialog',
  templateUrl: './inv-item-form-dialog.component.html',
  styleUrls: ['./inv-item-form-dialog.component.scss']
})
export class InvItemFormDialogComponent {


  stores= STORES;
  salesItemTypes= SALES_ITEM_TYPES;
  categories= CATEGORIES;
  invItems:any[]= INV_ITEMS;

  invItemsUnits:any[] = INV_ITEM_UNIT;
  invoiceDetailsForm: FormGroup;
  title:string;



  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<InvItemFormDialogComponent>
  ){


    if(this.data.formMode === FormMode.CREATE){
      this.invoiceDetailsForm =  this.fb.group({
        productCategoryId: [null, [Validators.required]],
        unitId:            [null, [Validators.required]],
        invItemId:         [null, [Validators.required]],
        amount:            [null, [Validators.required, Validators.min(1)]],
        price:             [null, [Validators.required, Validators.min(1)]],
      });
    }else{
      this.invoiceDetailsForm =  this.fb.group({
        productCategoryId: [this.data.invItem.productCategoryId, [Validators.required]],
        unitId:            [this.data.invItem.unitId, [Validators.required]],
        invItemId:         [this.data.invItem.invItemId, [Validators.required]],
        amount:            [this.data.invItem.amount, [Validators.required, Validators.min(1)]],
        price:             [this.data.invItem.price, [Validators.required, Validators.min(1)]],
      });
    }


    
    
    this.title = this.data.title;
  }


  filteredIems: Observable<any[]>;

  ngOnInit() {
    this.filteredIems = this.invoiceDetailsForm.controls['invItemId'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.invItems.slice();
      }),
    );
  }

  displayFn(item: any): string {
    
    return item && item.name ? item.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.invItems.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  onInvItemChange(itemId){ 

    const price = this.invItems.filter(i=> i.id ===itemId )[0].price;
    this.invoiceDetailsForm.patchValue({
      price: price
    });
  }

  onSubmit(){

    this.dialogRef.close(this.invoiceDetailsForm.value);
  }
}
