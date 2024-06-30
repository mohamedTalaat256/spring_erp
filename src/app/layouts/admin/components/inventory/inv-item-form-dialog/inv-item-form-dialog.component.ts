import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SALES_ITEM_TYPES, STORES } from '../../data/data';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode, ITEM_TYPES } from 'src/app/constants/constants';
import { Observable } from 'rxjs';
import { InvItemService } from 'src/app/service/invItem.service';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
import { MatSelectChange } from '@angular/material/select';
import { InvItemForm } from '../../../form-controls/inv-item-form';

@Component({
  selector: 'app-inv-item-form-dialog',
  templateUrl: './inv-item-form-dialog.component.html',
  styleUrls: ['./inv-item-form-dialog.component.scss']
})
export class InvItemFormDialogComponent {


  stores= STORES;
  salesItemTypes= SALES_ITEM_TYPES;

  ITEM_TYPES= ITEM_TYPES;

  invItemForm: FormGroup;
  title:string;


  parentUomName: string='';
  childUomName: string='';


  invItems:any[]= [];
  invUomsChild:any[]=[];
  invUomsParent:any[]=[];
  invItemsCategories:any[]=[];


  doesHasRetailUnit: boolean =false;
  showPricesFeilds: boolean =false;

  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<InvItemFormDialogComponent>,
    private invItemService: InvItemService,
    private invItemFormControl: InvItemForm
  ){


    if(this.data.formMode === FormMode.CREATE){
      this.invItemForm =  this.invItemFormControl.createForm();
    }else{
      this.invItemForm =  this.invItemForm =  this.invItemFormControl.setForm(this.data.invItem);
    }

    console.log(this.data.createData);

    this.invUomsChild = this.data.createData.invUomsChild;
    this.invUomsParent = this.data.createData.invUomsParent;
    this.invItemsCategories = this.data.createData.invItemsCategories;
    this.invItems = this.data.createData.invItems;

    this.title = this.data.title;
  }


  filteredIems: Observable<any[]>;

  ngOnInit() {


    /* this.filteredIems = this.invItemForm.controls['parentInvItemCard'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.invItems.slice();
      }),
    ); */
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
    this.invItemForm.patchValue({
      price: price
    });
  }

  onSubmit(){

    console.log(this.invItemForm.value);

    this.invItemService.save(this.invItemForm, this.data.formMode).subscribe({
      next:(response: AppResponse)=>{
        if(response.ok){
          Swal.fire({
            icon: "success",
            title: response.message,
            showConfirmButton: true,
            timer: 1500
          });
          this.dialogRef.close(response.data);
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

  doesHasRetailUnitChange(event:MatSelectChange){
    this.doesHasRetailUnit = event.value;

    console.log(this.doesHasRetailUnit);

    if(this.doesHasRetailUnit){


      this.invItemForm.controls['retailUom'].setValidators([Validators.required]);
      this.invItemForm.controls['retailUomQuntToParent'].setValidators([Validators.required]);
      this.invItemForm.controls['priceRetail'].setValidators([Validators.required]);
      this.invItemForm.controls['nosGomlaPriceRetail'].setValidators([Validators.required]);
      this.invItemForm.controls['gomlaPriceRetail'].setValidators([Validators.required]);
      this.invItemForm.controls['costPriceRetail'].setValidators([Validators.required]);
      this.invItemForm.updateValueAndValidity();
      this.invItemForm.markAllAsTouched();

    }else{
      this.invItemForm.get('retailUom').removeValidators([Validators.required]);
      this.invItemForm.get('retailUomQuntToParent').removeValidators([Validators.required]);
      this.invItemForm.get('priceRetail').removeValidators([Validators.required]);
      this.invItemForm.get('nosGomlaPriceRetail').removeValidators([Validators.required]);
      this.invItemForm.get('gomlaPriceRetail').removeValidators([Validators.required]);
      this.invItemForm.get('costPriceRetail').removeValidators([Validators.required]);
      this.invItemForm.updateValueAndValidity();

    }

  }

  retailUomQuntToParentChange(event:MatSelectChange){
    this.showPricesFeilds = event.value;
  }


  uomChange(event:MatSelectChange){
    this.parentUomName = this.invUomsParent.filter( i=> i.id === event.value)[0].name;
  }

  retialUomChange(event:MatSelectChange){
    this.childUomName = this.invUomsChild.filter( i=> i.id === event.value)[0].name;
  }
}
