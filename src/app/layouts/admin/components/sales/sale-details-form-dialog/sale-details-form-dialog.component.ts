import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode } from 'src/app/constants/constants';
import { Observable, map, startWith, take } from 'rxjs';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
  import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
  import { InvItem, emptyItem } from 'src/app/model/invItem';
import { SupplierOrderDetailsItemForm } from '../../../form-controls/supplierOrderDetailsItem-form';
import { InvItemService } from 'src/app/service/invItem.service';
 import { InvUom } from 'src/app/model/invUom';
import { SupplierOrderDetailsService } from 'src/app/service/supplierOrderDetails.service';
import { Store } from 'src/app/model/store';


@Component({
  selector: 'app-sale-details-form-dialog',
  templateUrl: './sale-details-form-dialog.component.html',
  styleUrls: ['./sale-details-form-dialog.component.scss']
})
export class SaleDetailsFormDialogComponent {

  invItemFormControl = new FormControl<string | any>('', [Validators.required]);

  invItems: InvItem[] = [];
  stores: Store[] = [];
  selectedItem: InvItem=emptyItem;
  uom: InvUom;
  filteredInvItems: Observable<any[]>;
  newInvItemForm: FormGroup;
  title: string;
  orderId: number;


  constructor(
    private supplierOrderDetailsItemForm: SupplierOrderDetailsItemForm,
    private invItemService: InvItemService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SaleDetailsFormDialogComponent>,
    private supplierOrderDetails: SupplierOrderDetailsService
  ) {


    if (this.data.formMode === FormMode.CREATE) {
      this.newInvItemForm = this.supplierOrderDetailsItemForm.createForm();

    } else {
      this.newInvItemForm = this.supplierOrderDetailsItemForm.setForm(this.data.orderItem);
      this.invItemFormControl.setValue( {
        id: this.data.orderItem.invItemCard.id,
        name: this.data.orderItem.invItemCard.name
      });

      this.selectedItem = this.data.orderItem;

    }
    this.title = this.data.title;
    this.orderId = this.data.orderId;

    this.newInvItemForm.patchValue({
      orderId: Number(this.orderId)
    });
  }

  ngOnInit(): void {
    this.getAllData();
    this.setFilters();


  }

  getAllData() {
    this.invItemService.findAll().subscribe({
      next: (response: AppResponse) => {
        if (response.ok) {
          this.invItems = response.data.invItems;
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


  onSubmit() {

    this.supplierOrderDetails
      .save(this.newInvItemForm.value, this.data.formMode)
      .pipe(take(1))
      .subscribe({
        next: (response: AppResponse) => {
          if(response.ok){

            Swal.fire({
              icon: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 1500,
            });
          this.dialogRef.close(response.data);
          }
        },
        error: (error: AppResponse) => {
          Swal.fire({
            icon: 'error',
            title: error.message,
            showConfirmButton: false,
          });
        },
      });
  }


  setFilters() {
    this.filteredInvItems = this.invItemFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._invItemFilter(name as string) : this.invItems.slice();
      }),
    );
  }

  invItemDisplayFn(invItem: any): string {
    return invItem && invItem.name ? invItem.name : '';
  }

  private _invItemFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.invItems.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  selectedInvItem(event: MatAutocompleteSelectedEvent) {

    this.newInvItemForm.patchValue({
      invItemCard: event.option.value.id
    }, { onlySelf: true, emitEvent: true });


    this.setSelectedItem(event.option.value.id);

  }


  setSelectedItem(id:number) {

    this.selectedItem = this.invItems.filter( i=> i.id === id)[0];
    this.newInvItemForm.patchValue({
      unitPrice: this.selectedItem.price
    });
    console.log(this.selectedItem);

  }


  onStoreChange(event){

  }

}
