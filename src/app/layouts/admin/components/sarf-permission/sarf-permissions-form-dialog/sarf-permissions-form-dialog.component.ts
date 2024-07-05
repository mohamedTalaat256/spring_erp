import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormMode } from 'src/app/constants/constants';
import { Observable, map, startWith, take } from 'rxjs';
import { AppResponse } from 'src/app/model/app_response.model';
import Swal from 'sweetalert2';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/service/sale.service';
import { SarfPermissionFormControl } from '../../../form-controls/sarfPermission-form';
import { SarfPermissionService } from 'src/app/service/sarfPermission.service';

@Component({
  selector: 'app-sarf-permissions-form-dialog',
  templateUrl: './sarf-permissions-form-dialog.component.html',
  styleUrls: ['./sarf-permissions-form-dialog.component.scss']
})
export class SarfPermissionsFormDialogComponent {
  customerFormControl = new FormControl<string | any>('',[Validators.required]);


  customers: any[] = [];
  filteredSuppliers: Observable<any[]>;
  filteredStores: Observable<any[]>;


  stores: any[] = [];

  permissionForm: FormGroup;
  title: string;

  showParentAccounts: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SarfPermissionsFormDialogComponent>,
    private sarfPermissionFormControl: SarfPermissionFormControl,
    private router: Router,
    private sarfPermissionService: SarfPermissionService


  ) {


    if (this.data.formMode === FormMode.CREATE) {
      this.permissionForm = this.sarfPermissionFormControl.createForm();
    } else {
      this.permissionForm = this.sarfPermissionFormControl.setForm(this.data.permission);


        this.customerFormControl.setValue( {
          id: this.data.permission.customer.id,
          name: this.data.permission.customer.name
        });
        this.permissionForm.patchValue({
          customer: this.data.permission.customer.id
        });

     }

    this.customers = this.data.customers;
    this.title = this.data.title;
  }


  ngOnInit() {
    this.setFilters();

  }


  onSubmit() {

    console.log(this.permissionForm.value);

    this.sarfPermissionService
      .save(this.permissionForm.value, this.data.formMode)
      .pipe(take(1))
      .subscribe({
        next: (response: AppResponse) => {
          if(response.ok){

            this.router.navigate(['/admin/sarfPermissionDetails/'+response.data.id]);
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

    this.permissionForm.patchValue({
      customer: event.option.value.id
    },{onlySelf:true, emitEvent: true});

  }


}
