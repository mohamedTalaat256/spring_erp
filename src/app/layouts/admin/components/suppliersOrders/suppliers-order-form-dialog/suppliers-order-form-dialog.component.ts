import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode, ITEM_TYPES } from 'src/app/constants/constants';
import { Observable, map, startWith, take } from 'rxjs';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
import { MatSelectChange } from '@angular/material/select';
import { supplierOrderFormControl } from '../../../form-controls/supplier-order-form';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SupplierOrderService } from 'src/app/service/supplierOrder.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-suppliers-order-form-dialog',
  templateUrl: './suppliers-order-form-dialog.component.html',
  styleUrls: ['./suppliers-order-form-dialog.component.scss']
})
export class SuppliersOrderFormDialogComponent {

  supplierFormControl = new FormControl<string | any>('',[Validators.required]);
  storeFormControl = new FormControl<string | any>('',[Validators.required]);


  suppliers: any[] = [];
  filteredSuppliers: Observable<any[]>;
  filteredStores: Observable<any[]>;

  stores: any[] = [];

  supplierOrderForm: FormGroup;
  title: string;

  showParentAccounts: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SuppliersOrderFormDialogComponent>,
    private supplierOrderFormControl: supplierOrderFormControl,
    private supplierOrderService: SupplierOrderService,private router: Router
    

  ) {


    if (this.data.formMode === FormMode.CREATE) {
      this.supplierOrderForm = this.supplierOrderFormControl.createForm();
    } else {
      this.supplierOrderForm = this.supplierOrderFormControl.setForm(this.data.supplierOrder);
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

    this.router.navigate(['/admin/supplierOrderDetails']);
    
  this.dialogRef.close( );
/*     this.supplierOrderService
      .save({ 
        order_date:     this.supplierOrderForm.value.orderDate,
        DOC_NO:         this.supplierOrderForm.value.docNo,
        suuplier_code:  this.supplierOrderForm.value.supplierCode,
        pill_type:      this.supplierOrderForm.value.pillType,
        store_id:       this.supplierOrderForm.value.storeId,
        notes:         this.supplierOrderForm.value.notes,
      })
      .pipe(take(1))
      .subscribe({
        next: (response: AppResponse) => {

          this.router.navigate(['/user']);

          if(response.ok){

            //this.dialogRef.close(response.data);
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
      }); */
  }

 


  setFilters() {
    this.filteredSuppliers = this.supplierFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._supplierFilter(name as string) : this.suppliers.slice();
      }),
    );
    this.filteredStores = this.storeFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._storeFilter(name as string) : this.stores.slice();
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

  storeDisplayFn(store: any): string {
    return store && store.name ? store.name : '';
  }

  private _storeFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.stores.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  selectedStore(event: MatAutocompleteSelectedEvent){
    
    this.supplierOrderForm.patchValue({
      storeId: event.option.value.id
    },{onlySelf:true, emitEvent: true});

  }

  selectedSupllier(event: MatAutocompleteSelectedEvent){
    
    this.supplierOrderForm.patchValue({
      supplierCode: event.option.value.suuplier_code
    },{onlySelf:true, emitEvent: true});

  }
  

}
