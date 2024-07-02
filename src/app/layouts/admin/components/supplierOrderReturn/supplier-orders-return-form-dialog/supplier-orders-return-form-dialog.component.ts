import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode, ITEM_TYPES } from 'src/app/constants/constants';
import { Observable, map, startWith, take } from 'rxjs';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SupplierOrderService } from 'src/app/service/supplierOrder.service';
import { Router } from '@angular/router';
import { SupplierOrderReturnFormControl } from '../../../form-controls/supplier-order-return-form';
import { SupplierOrderReturnService } from 'src/app/service/supplierOrderReturn.service';

@Component({
  selector: 'app-supplier-orders-return-form-dialog',
  templateUrl: './supplier-orders-return-form-dialog.component.html',
  styleUrls: ['./supplier-orders-return-form-dialog.component.scss']
})
export class SupplierOrdersReturnFormDialogComponent {
  supplierFormControl = new FormControl<string | any>('',[Validators.required]);
  storeFormControl = new FormControl<string | any>('',[Validators.required]);


  suppliers: any[] = [];
  filteredSuppliers: Observable<any[]>;
  filteredStores: Observable<any[]>;

  stores: any[] = [];

  supplierOrderReturnForm: FormGroup;
  title: string;

  showParentAccounts: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SupplierOrdersReturnFormDialogComponent >,
    private supplierOrderReturnFormControl: SupplierOrderReturnFormControl,
    private supplierOrderReturnService: SupplierOrderReturnService,private router: Router


  ) {


    if (this.data.formMode === FormMode.CREATE) {
      this.supplierOrderReturnForm = this.supplierOrderReturnFormControl.createForm();
    } else {
      this.supplierOrderReturnForm = this.supplierOrderReturnFormControl.setForm(this.data.supplierOrder);

      this.supplierFormControl.setValue( {
        id: this.data.supplierOrder.supplier.id,
        name: this.data.supplierOrder.supplier.name
      });
      this.supplierOrderReturnForm.patchValue({
        supplier: this.data.supplierOrder.supplier.id
      });
    }

    this.suppliers = this.data.suppliers;
    this.stores = this.data.stores;

    this.title = this.data.title;
  }


  filteredIems: Observable<any[]>;

  ngOnInit() {
    this.setFilters();

  }


  onSubmit() {

    console.log(this.supplierOrderReturnForm.value);

    this.supplierOrderReturnService
      .save(this.supplierOrderReturnForm.value, this.data.formMode)
      .pipe(take(1))
      .subscribe({
        next: (response: AppResponse) => {
          if(response.ok){

            this.router.navigate(['/admin/supplierOrderReturnDetails/'+response.data.id]);
            this.dialogRef.close();
            Swal.fire({
              icon: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 1500,
            });
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
    this.filteredSuppliers = this.supplierFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._supplierFilter(name as string) : this.suppliers.slice();
      }),
    );


  }

  supplierDisplayFn(supplier: any): string {
    return supplier && supplier.name ? supplier.name : '';
  }

  private _supplierFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.suppliers.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  selectedSupllier(event: MatAutocompleteSelectedEvent){

    this.supplierOrderReturnForm.patchValue({
      supplier: event.option.value.id
    },{onlySelf:true, emitEvent: true});

  }

}
