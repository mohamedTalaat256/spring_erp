import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode, ITEM_TYPES } from 'src/app/constants/constants';
import { Observable, map, startWith, take } from 'rxjs';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
import { MatSelectChange } from '@angular/material/select';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { salesFormControl } from '../../../form-controls/sales-form';
import { SalesService } from 'src/app/service/sale.service';

@Component({
  selector: 'app-sale-form-dialog',
  templateUrl: './sale-form-dialog.component.html',
  styleUrls: ['./sale-form-dialog.component.scss']
})
export class SaleFormDialogComponent {

  customerFormControl = new FormControl<string | any>('',[Validators.required]);


  customers: any[] = [];
  filteredSuppliers: Observable<any[]>;
  filteredStores: Observable<any[]>;

  stores: any[] = [];

  saleForm: FormGroup;
  title: string;

  showParentAccounts: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SaleFormDialogComponent>,
    private saleFormControl: salesFormControl,
    private router: Router,
    private salesService: SalesService


  ) {


    if (this.data.formMode === FormMode.CREATE) {
      this.saleForm = this.saleFormControl.createForm();
    } else {
      this.saleForm = this.saleFormControl.setForm(this.data.salesOrder);
    }

    this.customers = this.data.customers;

    this.title = this.data.title;
  }


  filteredIems: Observable<any[]>;

  ngOnInit() {
    this.setFilters();

  }


  onSubmit() {

    console.log(this.saleForm.value);

    this.salesService
      .save(this.saleForm.value)
      .pipe(take(1))
      .subscribe({
        next: (response: AppResponse) => {
          if(response.ok){

            this.router.navigate(['/admin/salseDetails/'+response.data.id]);
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
    this.filteredSuppliers = this.customerFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._customerFilter(name as string) : this.customers.slice();
      }),
    );

  }

  customerDisplayFn(customer: any): string {
    return customer && customer.name ? customer.name : '';
  }

  private _customerFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.customers.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  storeDisplayFn(store: any): string {
    return store && store.name ? store.name : '';
  }

  selectedSupllier(event: MatAutocompleteSelectedEvent){

    this.saleForm.patchValue({
      customer: event.option.value.id
    },{onlySelf:true, emitEvent: true});

  }


}
